from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class Message(BaseModel):
    message: str

@router.post("/talk")
async def talk_to_ai(msg: Message):
    print("Received from frontend:", msg.message)

    response = (
        "Hello, nice to see you! 👋\n"
        "I'm Shashis portfolio AI. Let me know how I can help with Shashi's resume."
    )

    return {"reply": response}
