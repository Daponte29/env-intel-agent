import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv

from db import engine, get_db, Base
import models
import memory
import agent as agent_module
from schemas import ChatRequest, ChatResponse, HeadlinesResponse

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Environmental Intelligence Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent_executor = agent_module.build_agent()


@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/headlines", response_model=HeadlinesResponse)
def get_headlines():
    try:
        data = agent_module.fetch_national_headlines()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest, db: Session = Depends(get_db)):
    if not request.messages:
        raise HTTPException(status_code=400, detail="messages cannot be empty")

    session = memory.get_or_create_session(db, request.session_id)

    user_message = request.messages[-1].content
    history = [{"role": m.role, "content": m.content} for m in request.messages[:-1]]

    memory.save_message(db, str(session.id), "user", user_message)

    try:
        reply, tags = agent_module.run_agent(user_message, history, agent_executor)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    asst_msg = memory.save_message(db, str(session.id), "assistant", reply)
    memory.save_tags(db, asst_msg.id, tags)

    return ChatResponse(reply=reply, tags=tags, session_id=str(session.id))


@app.get("/sessions/{session_id}/messages")
def get_messages(session_id: str, db: Session = Depends(get_db)):
    return memory.get_session_messages(db, session_id)
