"""
GlobalPulse AI - Interactive Weekly News Quiz Router (/api/v1/quiz)
"""

from fastapi import APIRouter
from app.services.quiz_generator import generate_weekly_news_quiz

router = APIRouter(prefix="/quiz", tags=["Current Events Quiz"])

@router.get("/weekly-test", summary="Get Weekly AI Current Events IQ Challenge")
async def get_quiz():
    """Generates an interactive 5-question world news quiz."""
    return generate_weekly_news_quiz()
