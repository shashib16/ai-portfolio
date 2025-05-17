export  function speakText(text: string){
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}
async function askProfessional(text: string, isProcessingAIRequest: boolean) {
  console.log({text, isProcessingAIRequest})
  const currentController = new AbortController();
  if(isProcessingAIRequest) {
    currentController.abort();
    console.log("Aborting previous request");
    // window.speechSynthesis.cancel();
  }

  const response = await fetch("https://ai-portfolio-drrt.onrender.com/api/ask", {
    method: "POST",
    signal: currentController.signal,
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