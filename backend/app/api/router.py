from fastapi import APIRouter
from backend.app.api.endpoints import router as analytics_router

api_router = APIRouter()
api_router.include_router(analytics_router, prefix="/analyst", tags=["SQL Analyst Dashboard"])