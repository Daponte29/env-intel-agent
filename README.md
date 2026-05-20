# EnviroLens

EnviroLens is a full-stack agentic platform designed to make environmental compliance accessible and actionable. Actively under development, the platform replaces traditional conversational AI with a structured form-to-report pipeline. An intelligent agent reasons across multi-source environmental risk data—including water, air quality, soil, and regulatory policy—to generate auditable, county-level risk reports with human-in-the-loop review gates for high-stakes projects.


---

##  Use Cases

* **Primary User (Construction Developer):** Enters project details (type, location, size, cost) via a web form and receives a comprehensive, structured environmental risk report before breaking ground. There is no chatbot—just clean input and actionable, structured output.
* **Secondary User (Environmental Insurance Underwriter):** Evaluates construction applications using the platform's defensible risk scores to justify premium adjustments, leveraging the same underlying data and agentic reasoning with adjusted framing.


---

##  Key Features

* **Real-Data Reasoning:** The agent dynamically reasons across real-time data sources; it does not rely on hardcoded logic or static LLM knowledge.
* **Modular Data Ingestion:** The architecture is designed to accept data modules plug-and-play. **Water risk** is the first active module, with Air, Soil, and Regulatory Policy pipelines planned.
* **Auditable Confidence Scores:** Every generated report includes a confidence score based on data freshness, full source attribution, and a verifiable audit trail.
* **Human-in-the-Loop (HIL) Review Gates:** High-stakes reports (e.g., risk scores 8+, protected zones, large-scale projects) are automatically routed through LangGraph to a human review queue for manual sign-off before delivery.


---

##  Tech Stack & Architecture

The platform leverages a modern, event-driven agentic stack containerized with Docker:

* **Frontend:** React 18, TypeScript, Vite (Project form, Risk report display, Reviewer dashboard)
* **Backend:** FastAPI (Web server, form handlers) + APScheduler (Data collection triggers)
* **Database:** PostgreSQL (Single source of truth for all data)
* **AI & Agent Layer:**
  * **LangGraph:** Agent loop, branching, human review gates
  * **LangChain:** Prompt formatting, structured output parsing
  * **Claude / GPT-4o:** Core LLM reasoning across data endpoints
* **Tooling:** FastMCP (Custom MCP server exposing all data tools to the agent)
* **Data Sources (Water Module):**
  * EPA Waters API (watersheds, wetlands)
  * EPA ECHO API (violation history)
  * FEMA Flood Map API (flood zone classifications)
  * USGS Water Services (stream flow, water quality)
  * NOAA API (rainfall trends)
  * DuckDuckGo Search (web confirmation layer)


---

##  Local Setup

**Prerequisites:** Docker Desktop

```bash
git clone <repo-url>
cd env-intel-agent
```

Copy and configure your environment variables:

```bash
cp .env.example .env
# Add required API keys to .env
```

Start the platform via GitHub CI or locally:

```bash
docker compose up --build
```

* **UI:** `http://localhost:3000`
* **API Docs:** `http://localhost:8000/docs`
* **Health Check:** `http://localhost:8000/health`


---

##  Testing

```bash
# Run backend tests inside the container
docker compose exec backend pytest tests/ -v
```


