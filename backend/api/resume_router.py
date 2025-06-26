from fastapi import APIRouter, HTTPException
from api.pdf_reader import pdf_reader
import google.generativeai as genai
import os

router = APIRouter()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

@router.get("/resume/{section}")
async def get_resume_section(section: str):
    """Get specific resume section optimized for TTS"""
    try:
        # Get resume content
        resume_content = pdf_reader.extract_text()
        
        # Define section prompts
        section_prompts = {
            "summary": "Create a 30-second elevator pitch about Shashi in first person, suitable for speech",
            "experience": "Describe Shashi's work experience in a conversational way, speaking as Shashi",
            "skills": "List Shashi's technical skills in a natural speaking format, as if Shashi is talking",
            "projects": "Describe Shashi's key projects and achievements for voice narration, first person",
            "education": "Explain Shashi's educational background conversationally, as Shashi speaking",
            "contact": "Provide Shashi's contact information in a speech-friendly format"
        }
        
        if section not in section_prompts:
            available_sections = ", ".join(section_prompts.keys())
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid section. Available sections: {available_sections}"
            )
        
        # Generate TTS-optimized content
        prompt = f"""
Based on this resume content, {section_prompts[section]}:

{resume_content}

Requirements:
- Speak as Shashi in first person
- Make it natural for text-to-speech
- Keep it conversational and engaging
- No special characters or formatting
- Maximum 150 words for good listening experience
"""
        
        response = model.generate_content(prompt, generation_config={"temperature": 0.3})
        content = response.text.strip()
        
        return {
            "success": True,
            "data": {
                "section": section,
                "content": content,
                "tts_ready": True,
                "word_count": len(content.split())
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error generating section content: {e}")
        raise HTTPException(status_code=500, detail="Error generating section content")

@router.get("/resume/raw/{section}")
async def get_raw_resume_section(section: str):
    """Get raw resume section from PDF"""
    try:
        sections = pdf_reader.extract_sections()
        
        if section not in sections:
            available_sections = ", ".join(sections.keys())
            raise HTTPException(
                status_code=400,
                detail=f"Section not found. Available sections: {available_sections}"
            )
        
        return {
            "success": True,
            "data": {
                "section": section,
                "content": sections[section],
                "raw": True
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error getting raw section: {e}")
        raise HTTPException(status_code=500, detail="Error reading resume section")

# ============================================================================
# api/projects_router.py - Projects API
from fastapi import APIRouter
from typing import Optional

router = APIRouter()

@router.get("/projects")
async def get_projects(type: Optional[str] = None, featured: Optional[bool] = None):
    """Get projects from resume and additional data"""
    try:
        # You can combine PDF-extracted projects with hardcoded ones
        projects = [
            {
                "id": 1,
                "title": "AI-Portfolio",
                "description": "Interactive AI-powered portfolio using Gemini API",
                "tech": ["React", "Gemini API", "FastAPI", "Python"],
                "featured": True,
                "type": "personal",
                "github": "https://github.com/shashib16/ai-portfolio"
            },
            {
                "id": 2,
                "title": "Knowledge Graph Validation System",
                "description": "Reduced validation time by 30% using React, AWS Lambda, DynamoDB",
                "tech": ["React", "AWS Lambda", "DynamoDB", "TypeScript"],
                "featured": True,
                "type": "professional",
                "company": "Drishya AI"
            },
            {
                "id": 3,
                "title": "Document Caching System",
                "description": "Improved load time by 92% using IndexedDB caching",
                "tech": ["JavaScript", "IndexedDB", "React"],
                "featured": True,
                "type": "professional",
                "company": "Drishya AI"
            }
        ]
        
        # Filter projects
        filtered_projects = projects
        if type:
            filtered_projects = [p for p in filtered_projects if p.get('type') == type]
        if featured is not None:
            filtered_projects = [p for p in filtered_projects if p.get('featured') == featured]
        
        return {
            "success": True,
            "data": filtered_projects,
            "count": len(filtered_projects)
        }
        
    except Exception as e:
        print(f"Error getting projects: {e}")
        return {
            "success": False,
            "message": "Error fetching projects",
            "data": []
        }
