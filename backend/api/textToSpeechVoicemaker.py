from fastapi import FastAPI, Response, Query
import requests
import json
import uuid
import os
from fastapi.responses import StreamingResponse
from io import BytesIO
app = FastAPI()

VOICEMAKER_API_KEY = os.getenv("VOICEMAKER_API_KEY")
VOICEMAKER_API_URL = os.getenv("VOICEMAKER_API_URL")
AUDIO_SAVE_DIR = "audio_files"
# Ensure audio directory exists
os.makedirs(AUDIO_SAVE_DIR, exist_ok=True)

def text_to_speech(text: str = Query(..., min_length=1)):
    headers = {
        "Authorization": f"Bearer {VOICEMAKER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "Engine": "neural",
        "LanguageCode": "en-IN",
        "VoiceId": "ai2-Robert",
        "Text": text,
        "OutputFormat": "mp3",
        "SampleRate": "48000",
        "Effect": "default",
        "MasterSpeed": "0",
        "MasterVolume": "0",
        "MasterPitch": "0"
    }

    response = requests.post(VOICEMAKER_API_URL, headers=headers, data=json.dumps(payload))
    data = response.json()

    if not data.get("success"):
        return {"error": data.get("message", "Unknown error from Voicemaker")}

    audio_url = data["path"]
    audio_response = requests.get(audio_url)


    return StreamingResponse(BytesIO(audio_response.content), media_type="audio/mpeg")

