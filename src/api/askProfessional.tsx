export  function speakText(text: string){
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}
async function askProfessional(text: string) {
  const response = await fetch("http://localhost:8000/api/ask", {
    method: "POST",
    headers: {
      // "Accept": "audio/mpeg",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: text
    })
  });
   const output = await response.json();


  if (response.ok) {
    console.log("AI Response:", output);
    const text = output.reply;
    speakText(text);
  } else {
    console.error("Error:", output);
    const errorText = output.error || "An error occurred while processing your request.";
    speakText(errorText);
  }
  return output;

}
export default askProfessional;