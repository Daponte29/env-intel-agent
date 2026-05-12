from pydantic import BaseModel
from typing import List


class MessageIn(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    session_id: str
    messages: List[MessageIn]


class ChatResponse(BaseModel):
    reply: str
    tags: List[str]
    session_id: str


class MessageOut(BaseModel):
    role: str
    content: str
    tags: List[str] = []

    class Config:
        from_attributes = True
