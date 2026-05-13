from pydantic import BaseModel
from typing import List
from datetime import datetime


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


class CO2ReadingBase(BaseModel):
    date: datetime
    ppm: float
    source: str


class CO2ReadingCreate(CO2ReadingBase):
    pass


class CO2ReadingOut(CO2ReadingBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
