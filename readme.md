
# AI Portfolio 🧠✨

A modern AI-powered portfolio web app built using **React + Vite** for the frontend and **FastAPI** for the backend. It includes interactive resume viewing, project showcasing, and an AI assistant that can talk about your professional journey.

---

## 🗂️ Project Structure

```text
ai-portfolio/
├── frontend/   # React + Vite + Tailwind CSS
└── backend/    # FastAPI-based Python backend
```


---

## ✨ Features

- 🎤 **"Talk to AI" Assistant** — Ask questions and get intelligent responses about your professional profile.
- 📄 **Dynamic Resume Viewer** — Users can view and download your resume.
- 💼 **Project Portfolio** — Showcases your projects with descriptions and tech stacks.
- ⚡ **Lightning-fast Frontend** — Vite provides instant feedback during development.
- 🚀 **FastAPI Backend** — High-performance Python backend serving RESTful APIs and AI services.

---

## 🛠 Tech Stack

**Frontend:**
- React
- Vite
- Tailwind CSS

**Backend:**
- Python
- FastAPI
- Uvicorn (ASGI server)
- OpenAI API or other AI integrations (optional)
- SQLite / PostgreSQL (optional depending on data persistence)

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/shashib16/ai-portfolio.git
cd ai-portfolio
```

### 🔧 Frontend Setup

    cd frontend
    npm install
    npm run dev
    Access the frontend at: http://localhost:5173

### 🧠 Backend Setup
    Make sure Python 3.8+ is installed.

```bash    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    pip install -r requirements.txt
    uvicorn main:app --reload 
```

    FastAPI server will run on: http://localhost:8000


### 📣 AI Assistant Behavior
    The AI assistant prompts:

    “Would you like to know about Shashi's professional journey?”

    It is designed to respond to voice/text prompts and provide personalized responses using AI APIs gemini.


### 🙌 Contribution
    Contributions, issues and feature requests are welcome!
    Feel free to fork the repo and submit a pull request.

.

### 👤 Author
Shashi
GitHub: [@shashib16](https://github.com/shashib16)

