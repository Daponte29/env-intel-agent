# EnviroLens

An agentic environmental intelligence chatbot that connects real-world events, climate science, and policy in a single sourced answer. Ask about wildfires, CO2 levels, or climate legislation — the agent searches for current information and reasons across all three layers to give you a comprehensive response.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Backend | FastAPI (Python 3.12) |
| AI Agent | LangChain + Claude (Anthropic) |
| Search Tool | Tavily API |
| Database | PostgreSQL + pgvector |
| Dev Environment | Docker Compose |

---

## Architecture

```
React Frontend (TypeScript)
        ↓  POST /chat
FastAPI Backend
        ↓
LangChain AgentExecutor
    ├── Claude claude-haiku-4-5 (reasoning)
    └── Tavily Search (live web data)
        ↓
PostgreSQL (chat_sessions, messages, topic_tags)
```

---

## Local Setup

**Prerequisites:** Docker Desktop, Git

```bash
git clone <repo-url>
cd env-intel-agent
```

Copy and fill in your API keys:
```bash
cp .env.example .env
# Add ANTHROPIC_API_KEY and TAVILY_API_KEY to .env
```

Start everything:
```bash
docker compose up --build
```

- UI → http://localhost:3000
- API docs → http://localhost:8000/docs
- Health check → http://localhost:8000/health

---

## Running Tests

```bash
docker compose exec backend pytest tests/ -v
```

---

## Example Queries

- *"What are the most recent wildfires burning in the US?"*
- *"What are current CO2 levels and what does the science say?"*
- *"What new climate legislation passed in the EU this year?"*
- *"How are Amazon deforestation rates connected to global temperature rise?"*

---

## v2 Roadmap

- Custom MCP server wrapping NOAA, EPA, and Global Carbon Project APIs
- pgvector RAG pipeline over IPCC reports and EPA rulings
- Trending topics panel from aggregated query tags
- Event timeline view: event → science → legislation arc
