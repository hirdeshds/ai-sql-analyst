import os
from pathlib import Path
from dotenv import load_dotenv

backend_dir = Path(__file__).resolve().parents[2]
env_path = backend_dir / ".env"
load_dotenv(dotenv_path=env_path)

from langchain_groq import ChatGroq  
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain.agents import create_openai_tools_agent, AgentExecutor
from langchain_core.runnables.history import RunnableWithMessageHistory

from backend.app.database.connection import get_db_connection
from backend.app.agent.prompts import get_analyst_prompt
from backend.app.agent.memory import get_chat_session_history
from backend.app.tools.optimizer import analyze_query_performance
from backend.app.tools.chart_generator import suggest_chart_json

def initialize_analyst_agent():
    db = get_db_connection()
    
    llm = ChatGroq(
        model="llama-3.3-70b-versatile", 
        temperature=0
    )
    
    # Extract structural tools from the standard toolkit
    toolkit = SQLDatabaseToolkit(db=db, llm=llm)
    base_tools = toolkit.get_tools()
    
    # Append custom performance and structural tool blocks
    all_tools = base_tools + [analyze_query_performance, suggest_chart_json]
    
    prompt = get_analyst_prompt()
    
    # Groq supports the OpenAI tools format natively in LangChain
    agent = create_openai_tools_agent(llm, all_tools, prompt)
    
    executor = AgentExecutor(
        agent=agent,
        tools=all_tools,
        verbose=True,
        handle_parsing_errors=True
    )
    
    # Wrap with contextual short-term session tracking history wrappers
    return RunnableWithMessageHistory(
        executor,
        get_chat_session_history,
        input_messages_key="input",
        history_messages_key="history"
    )

# Singleton application runtime target reference
analyst_agent_runtime = initialize_analyst_agent()