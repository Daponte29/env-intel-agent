from fastapi.testclient import TestClient
from unittest.mock import MagicMock, patch


# Patch build_agent before main.py imports and calls it at module level
with patch("agent.build_agent", return_value=MagicMock()):
    from main import app

client = TestClient(app)


def test_health_returns_ok():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
