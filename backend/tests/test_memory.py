import uuid
import pytest
from sqlalchemy.orm import sessionmaker

from db import Base, engine
import memory


@pytest.fixture
def db():
    # Use real Postgres with rollback so each test leaves no data behind
    Base.metadata.create_all(bind=engine)
    connection = engine.connect()
    transaction = connection.begin()
    Session = sessionmaker(bind=connection)
    session = Session()
    yield session
    session.close()
    transaction.rollback()
    connection.close()


def test_get_or_create_session_creates_new(db):
    session_id = str(uuid.uuid4())
    session = memory.get_or_create_session(db, session_id)
    assert str(session.id) == session_id


def test_get_or_create_session_returns_existing(db):
    session_id = str(uuid.uuid4())
    s1 = memory.get_or_create_session(db, session_id)
    s2 = memory.get_or_create_session(db, session_id)
    assert s1.id == s2.id


def test_save_message_stores_role_and_content(db):
    session_id = str(uuid.uuid4())
    memory.get_or_create_session(db, session_id)
    msg = memory.save_message(db, session_id, "user", "Hello world")
    assert msg.role == "user"
    assert msg.content == "Hello world"


def test_save_tags_and_retrieve(db):
    session_id = str(uuid.uuid4())
    memory.get_or_create_session(db, session_id)
    msg = memory.save_message(db, session_id, "assistant", "Response [event]")
    memory.save_tags(db, msg.id, ["event", "science"])
    messages = memory.get_session_messages(db, session_id)
    assert messages[0]["tags"] == ["event", "science"]


def test_get_session_messages_in_order(db):
    session_id = str(uuid.uuid4())
    memory.get_or_create_session(db, session_id)
    memory.save_message(db, session_id, "user", "First")
    memory.save_message(db, session_id, "assistant", "Second")
    messages = memory.get_session_messages(db, session_id)
    assert len(messages) == 2
    assert messages[0]["role"] == "user"
    assert messages[1]["role"] == "assistant"
