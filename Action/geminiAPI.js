export async function geminiAPI(data){
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCVkZ63GBs9_U_TSYZSRnCJIkW0ygVm2yo", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define content type as JSON
        },
        body: JSON.stringify(data)// Convert data object to JSON string
      })
      let response1 = await response.json()
      console.log(response1);
      let botReply = response1['candidates'][0]['content']['parts'][0]['text'];
      console.log(botReply);
      return botReply;
}