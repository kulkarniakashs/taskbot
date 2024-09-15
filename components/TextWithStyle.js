import React from 'react';

const TextWithStyles = ({ text }) => {
  const parseText = (text) => {
    // Split text by newlines for paragraphs or headings
    return text.split('\n').map((line, index) => {
      // Handle headings
      if (line.startsWith('###')) {
        return (
          <h3 key={index} className="text-lg font-bold mb-2">
            {line.replace('###', '').trim()}
          </h3>
        );
      }
      else if (line.startsWith('##')) {
        return (
          <h3 key={index} className="text-lg font-bold mb-2">
            {line.replace('##', '').trim()}
          </h3>
        );
      }
      // Handle bold text
      else if (line.includes('**')) {
        const parts = line.split('**');

        return (
          <p key={index} className="mb-2">
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        );
      }
      // Handle list items
      else if (line.startsWith('-')) {
        return (
          <ul key={index} className="list-disc ml-5">
            <li>{line.replace('-', '').trim()}</li>
          </ul>
        );
      }
      // Default paragraph
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });
  };

  return <div>{parseText(text)}</div>;
};
export default TextWithStyles