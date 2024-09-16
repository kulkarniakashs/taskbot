"use server"
export async function geminiAPI(data){
    // console.log(process.env.GEMINI_API);
    const url =  `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API}`;
    try{
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Define content type as JSON
        },
        body: JSON.stringify(data)// Convert data object to JSON string
      })
      if(!response.ok){
        throw response;
      }
      let response1 = await response.json()
      // console.log(response1);
      let botReply = response1['candidates'][0]['content']['parts'][0]['text'];
      // console.log(botReply);
      return botReply;
    }
    catch(response){ 
      let error = await response.json();
      console.log(error.error.code,error.error.message);
      return `## ${error.error.code} ${error.error.message}`
    }
}