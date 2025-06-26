# api/main.py - Main FastAPI application
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.chat_router import router as chat_router
from api.resume_router import router as resume_router
from api.projects_router import router as projects_router

app = FastAPI(
    title="Shashi's Portfolio API",
    description="AI-powered portfolio backend with PDF resume parsing",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix="/api", tags=["chat"])
app.include_router(resume_router, prefix="/api", tags=["resume"])
app.include_router(projects_router, prefix="/api", tags=["projects"])

@app.get("/")
async def root():
    return {
        "message": "Shashi's Portfolio API is running!",
        "features": ["PDF Resume Reading", "AI Chat", "TTS Ready", "Projects API"],
        "docs": "/docs"
    }

# For Vercel deployment
handler = app