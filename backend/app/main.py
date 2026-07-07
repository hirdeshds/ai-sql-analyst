import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.api.router import api_router

app = FastAPI(
    title="AI SQL Analyst Agent Workspace Backend",
    version="1.0.0",
    description="Production engine runtime running multi-agent tools to dynamically generate, validate, and chart SQL calculations."
)

# Enable connection permissions for decoupled web interfaces (React / NextJS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"status": "online", "engine": "AI SQL Analyst Core v1.0.0"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)