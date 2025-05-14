from fastapi import APIRouter
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import pdfplumber
import google.generativeai as genai
from api.textToSpeechVoicemaker import text_to_speech  # Assuming you have this function in a file
from fastapi.responses import StreamingResponse
from io import BytesIO

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

router = APIRouter()

class Question(BaseModel):
    question: str

def load_resume_text(pdf_path="assets/shashi_resume_software_engineer.pdf"):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    full_path = os.path.join(script_dir, "..", pdf_path)
    
    all_text = ""
    with pdfplumber.open(full_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                all_text += text + "\n"
    return all_text.strip()

resume_context = load_resume_text()
print("Resume context loaded successfully.")

@router.post("/ask")
async def ask_question(payload: Question):
    question = payload.question.strip()
    print("Received from frontend:", question)

    # Handle default intro case
    if not question:
        response_text = (
            "Hello, nice to see you! 👋\n"
            "I'm Shashi's portfolio AI. Let me know how I can help with Shashi's resume."
        )
        return {"reply": response_text}  # Return the text response
        # response = text_to_speech(response_text)  # optionally also return TTS
        # return  response

    try:
        chat = model.start_chat(history=[])
        prompt = (
            f"You are a helpful assistant. Based on the resume context below, answer the user's question.\n\n"
            f"Resume:\n{resume_context}\n\n"
            f"Question: {question}"
        )

        response = chat.send_message(prompt, generation_config={"temperature": 0.3})
        reply_text = response.text.strip()

        fallback_answer = (
            "I'm sorry, but I couldn't find the answer to your question in the resume context. "
            "Please ask something else or provide more details."
        )

        final_answer = reply_text if reply_text else fallback_answer
        print("Final answer:", final_answer)
        # return { "reply": final_answer }
        return {"reply": final_answer}  # Return the text response
        # audio_response = text_to_speech(final_answer)
        # print(audio_response)
        # (final_answer)
        # print("Audio response generated successfully.")
        # print("Response:", audio_response)
        # return audio_response  # Return the audio response directly

  # optionally trigger TTS client-side

    except Exception as e:
        print("Error:", e)
        return {"reply": f"Error: {str(e)}"}
