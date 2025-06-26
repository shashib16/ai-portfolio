from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, validator
import google.generativeai as genai
import os
from dotenv import load_dotenv
from api.pdf_reader import pdf_reader

load_dotenv()

router = APIRouter()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

class Question(BaseModel):
    question: str
    include_tts: bool = False
    
    @validator('question')
    def validate_question(cls, v):
        if not v or not v.strip():
            raise ValueError('Question cannot be empty')
        if len(v) > 1000:
            raise ValueError('Question too long. Please keep it under 1000 characters.')
        return v.strip()

@router.post("/ask")
async def ask_question(payload: Question):
    """Ask questions about Shashi's resume"""
    try:
        question = payload.question
        print(f"Received question: {question}")
        
        # Handle default/empty question
        if not question or question.lower() in ["hello", "hi", "hey"]:
            response_text = (
                "Hello! Nice to see you! 👋\n"
                "I'm Shashi's portfolio AI assistant. I can answer questions about his experience, "
                "skills, projects, and background. What would you like to know?"
            )
            return {
                "reply": response_text,
                "tts_ready": True,
                "source": "greeting"
            }
        
        # Get resume content from PDF
        resume_context = pdf_reader.extract_text()
        
        # Create AI prompt
        prompt = f"""
You are an AI assistant representing Shashi Bhushan Kumar Tiwari, a Software Engineer from Bangalore, India.
Use the resume content below to answer questions about Shashi's background, skills, and experience.

IMPORTANT INSTRUCTIONS:
1. Answer as if you are Shashi speaking in first person
2. Be conversational and professional
3. Keep responses concise but informative (max 200 words)
4. If asked about experience, mention he has 3+ years of experience
5. If the user says "stop", respond with "Oh, please ask your next question!"
6. Make responses suitable for text-to-speech (natural speech patterns)
7. If question is not resume-related, politely redirect to professional topics

RESUME CONTENT:
{resume_context}

USER QUESTION: {question}

Answer:"""

        # Generate response
        chat = model.start_chat(history=[])
        response = chat.send_message(prompt, generation_config={"temperature": 0.3})
        reply_text = response.text.strip()
        
        # Fallback if no response
        if not reply_text:
            reply_text = (
                "I'm sorry, I couldn't find a specific answer to your question in the resume. "
                "Could you please ask about Shashi's experience, skills, projects, or education?"
            )
        
        print(f"Generated response: {reply_text}")
        
        return {
            "reply": reply_text,
            "tts_ready": True,
            "source": "ai_generated",
            "question_processed": question
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"Error in ask_question: {e}")
        raise HTTPException(
            status_code=500, 
            detail="Sorry, I encountered an error processing your question. Please try again."
        )

@router.get("/resume-content")
async def get_resume_content():
    """Get the full resume content from PDF"""
    try:
        content = pdf_reader.extract_text()
        sections = pdf_reader.extract_sections()
        
        return {
            "success": True,
            "data": {
                "full_content": content,
                "sections": sections,
                "content_length": len(content),
                "source": "pdf_extracted"
            }
        }
    except Exception as e:
        print(f"Error getting resume content: {e}")
        raise HTTPException(status_code=500, detail="Error reading resume content")

@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "Shashi's Portfolio API is running smoothly!"}   