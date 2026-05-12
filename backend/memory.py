import uuid
from sqlalchemy.orm import Session
from models import ChatSession, Message, TopicTag


def get_or_create_session(db: Session, session_id: str) -> ChatSession:
    session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
    if not session:
        session = ChatSession(id=uuid.UUID(session_id))
        db.add(session)
        db.commit()
        db.refresh(session)
    return session


def save_message(db: Session, session_id: str, role: str, content: str) -> Message:
    msg = Message(session_id=uuid.UUID(session_id), role=role, content=content)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


def save_tags(db: Session, message_id: int, tags: list[str]) -> None:
    for tag in tags:
        db.add(TopicTag(message_id=message_id, tag=tag))
    db.commit()


def get_session_messages(db: Session, session_id: str) -> list[dict]:
    messages = (
        db.query(Message)
        .filter(Message.session_id == session_id)
        .order_by(Message.created_at)
        .all()
    )
    result = []
    for msg in messages:
        result.append({
            "role": msg.role,
            "content": msg.content,
            "tags": [t.tag for t in msg.tags],
        })
    return result
