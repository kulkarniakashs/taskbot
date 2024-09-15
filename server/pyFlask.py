from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
from spacy.lang.en.stop_words import STOP_WORDS
from heapq import nlargest

app = Flask(__name__)
CORS(app)  # Enable CORS
nlp = spacy.load('en_core_web_sm')

# Build a List of Stopwords
stopwords = list(STOP_WORDS)

def summarize_text(text):
    docx = nlp(text)

    # Calculate frequencies of each word that are not stopwords
    word_freq = {}
    for word in docx:
        if word.text.lower() not in stopwords:
            if word.text.lower() not in word_freq:
                word_freq[word.text.lower()] = 1
            else:
                word_freq[word.text.lower()] += 1

    # Normalize word frequencies
    max_freq = max(word_freq.values())
    for word in word_freq:
        word_freq[word] = word_freq[word] / max_freq

    # Sentence Tokens
    sentence_list = [sentence for sentence in docx.sents]

    # Calculate Sentence Scores
    sentence_scores = {}
    for sentence in sentence_list:
        for word in sentence:
            if word.text.lower() in word_freq.keys():
                if len(sentence.text.split(' ')) < 30:
                    if sentence not in sentence_scores:
                        sentence_scores[sentence] = word_freq[word.text.lower()]
                    else:
                        sentence_scores[sentence] += word_freq[word.text.lower()]

    # Find Top N sentences
    sum_sentences = nlargest(10, sentence_scores, key=sentence_scores.get)

    # Convert sentences to strings
    final_sentences = [w.text for w in sum_sentences]
    summary = ' '.join(final_sentences)

    return summary

@app.route('/summarize', methods=['POST'])
def summarize():
    text = request.form.get('text', '')
    
    if 'file' in request.files:
        file = request.files['file']
        if file and file.filename.endswith('.txt'):
            text = file.read().decode('utf-8')

    if not text:
        return jsonify({'error': 'No text or file provided'}), 400

    summary = summarize_text(text)
    return jsonify({'summary': summary}), 200

if __name__ == '__main__':
    app.run(debug=True)