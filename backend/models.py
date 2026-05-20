import uuid # 
from sqlalchemy import Column, String, Text, Integer, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db import Base


class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    messages = relationship("Message", back_populates="session")


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(UUID(as_uuid=True), ForeignKey("chat_sessions.id"))
    role = Column(String(10))
    content = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    session = relationship("ChatSession", back_populates="messages")
    tags = relationship("TopicTag", back_populates="message")


class TopicTag(Base):
    __tablename__ = "topic_tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    message_id = Column(Integer, ForeignKey("messages.id"))
    tag = Column(String(20))

    message = relationship("Message", back_populates="tags")


class CO2Reading(Base):
    __tablename__ = "co2_readings"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date = Column(DateTime(timezone=True))
    ppm = Column(String(50))  # Usually a float or string decimal
    source = Column(String(100))
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class EPAWaterViolation(Base):
    __tablename__ = "epa_water_violations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    county_name = Column(String(100))
    facility_name = Column(String(255))
    source_id = Column(String(100), unique=True)
    street = Column(String(255))
    city = Column(String(100))
    state = Column(String(20))
    penalties = Column(Integer)  # Total penalties figure
    created_at = Column(DateTime(timezone=True), server_default=func.now())

