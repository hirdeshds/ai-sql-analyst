from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.app.agent.analyst import analyst_agent_runtime
from backend.app.database.schema_viewer import get_interactive_schema

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    session_id: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def process_analyst_chat(payload: ChatRequest):
    """Dispatches user prompt request strings straight into the active memory-managed agent pipeline layer."""
    try:
        config = {"configurable": {"session_id": payload.session_id}}
        result = analyst_agent_runtime.invoke(
            {"input": payload.message}, 
            config=config
        )
        return ChatResponse(response=result["output"])
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/schema")
def fetch_database_schema_tree():
    """Exposes structured schemas containing exact table data attributes to generate sidebars or interactive view trees."""
    try:
        return get_interactive_schema()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not read metadata map: {str(e)}")