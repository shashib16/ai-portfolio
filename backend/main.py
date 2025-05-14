from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import talk
from api import ask
app = FastAPI()  # <- this must exist

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*",'http://localhost:5173/'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(talk.router, prefix="/api", tags=["api"])
app.include_router(ask.router, prefix="/api", tags=["api"])
print('hello world')