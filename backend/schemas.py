from pydantic import BaseModel
from typing import List, Literal
from datetime import datetime


class Headline(BaseModel):
    id: int
    location: str
    text: str
    status: Literal['red', 'yellow', 'green']

class HeadlinesResponse(BaseModel):
    headlines: List[Headline]

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


class EPAWaterViolationBase(BaseModel):
    county_name: str
    facility_name: str
    source_id: str
    street: str
    city: str
    state: str
    penalties: int


class EPAWaterViolationCreate(EPAWaterViolationBase):
    pass


class EPAWaterViolationOut(EPAWaterViolationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
