import os
import re
from dotenv import load_dotenv
from langchain_anthropic import ChatAnthropic
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage

load_dotenv()

SYSTEM_PROMPT = """You are an environmental intelligence assistant. Your job is to help users \
understand the interconnected relationship between real-world environmental events, the science \
explaining them, and the laws and policies responding to them.

When answering:
- Always search for the most recent and relevant information before responding
- Connect events to their scientific context (e.g. link a wildfire to CO2 data, drought trends, or temperature anomalies)
- Reference relevant legislation or international agreements where applicable
- Cite specific statistics where possible (CO2 ppm, temperature rise figures, acres burned, etc.)
- Cite your sources clearly
- At the end of your response, on a new line, classify it by including one or more of these exact tags: [event] [science] [law] [statistic]
- Keep answers factual, clear, and accessible to a general audience
- If a question is unrelated to environmental topics, politely redirect the user"""

VALID_TAGS = {"event", "science", "law", "statistic"}


def build_agent() -> AgentExecutor:
    llm = ChatAnthropic(
        model="claude-haiku-4-5-20251001",
        anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"),
        max_tokens=1024,
    )

    search = TavilySearchResults(
        max_results=3,
        tavily_api_key=os.getenv("TAVILY_API_KEY"),
    )
    tools = [search]

    prompt = ChatPromptTemplate.from_messages([
        ("system", SYSTEM_PROMPT),
        MessagesPlaceholder("chat_history"),
        ("human", "{input}"),
        MessagesPlaceholder("agent_scratchpad"),
    ])

    agent = create_tool_calling_agent(llm, tools, prompt)
    return AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=False,
        max_iterations=3,
        handle_tool_errors=True,
    )


def parse_tags(response: str) -> list[str]:
    found = re.findall(r'\[(\w+)\]', response.lower())
    return [t for t in found if t in VALID_TAGS]


def run_agent(user_message: str, history: list[dict], executor: AgentExecutor) -> tuple[str, list[str]]:
    chat_history = []
    for msg in history:
        if msg["role"] == "user":
            chat_history.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "assistant":
            chat_history.append(AIMessage(content=msg["content"]))

    result = executor.invoke({
        "input": user_message,
        "chat_history": chat_history,
    })

    output = result["output"]
    # Newer langchain-anthropic versions return a list of content blocks
    if isinstance(output, list):
        output = " ".join(
            block.get("text", "") if isinstance(block, dict) else str(block)
            for block in output
        )
    tags = parse_tags(output)
    return output, tags
