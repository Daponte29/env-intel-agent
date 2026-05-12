import uuid
from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch


# Patch build_agent before main.py runs it at import time
with patch("agent.build_agent", return_value=MagicMock()):
    from main import app

client = TestClient(app)


def make_session_id() -> str:
    return str(uuid.uuid4())


def test_chat_missing_messages_returns_400():
    response = client.post("/chat", json={
        "session_id": make_session_id(),
        "messages": [],
    })
    assert response.status_code == 400


def test_chat_returns_reply_and_tags(mocker):
    mocker.patch(
        "agent.run_agent",
        return_value=("Wildfires are worsening due to drought. [event] [science]", ["event", "science"]),
    )
    response = client.post("/chat", json={
        "session_id": make_session_id(),
        "messages": [{"role": "user", "content": "Why are wildfires getting worse?"}],
    })
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data
    assert "tags" in data
    assert "event" in data["tags"]


def test_chat_agent_error_returns_500(mocker):
    mocker.patch("agent.run_agent", side_effect=Exception("Search failed"))
    response = client.post("/chat", json={
        "session_id": make_session_id(),
        "messages": [{"role": "user", "content": "Test question"}],
    })
    assert response.status_code == 500
