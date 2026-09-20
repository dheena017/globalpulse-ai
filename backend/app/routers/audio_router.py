"""
GlobalPulse AI - Audio News & Multi-Anchor Podcast Router (/api/v1/audio)
"""

from fastapi import APIRouter
from app.models.audio_models import PodcastScriptResponse
from app.services.podcast_engine import generate_podcast_broadcast_script
from app.services.news_fetcher import get_all_news

router = APIRouter(prefix="/audio", tags=["Audio & Podcast"])

@router.get("/daily-podcast-script", response_model=PodcastScriptResponse, summary="Get Structured Multi-Anchor Voice Script")
async def get_daily_podcast_script():
    """Generates structured voice broadcast script with chapters and anchor transitions."""
    articles = await get_all_news()
    return generate_podcast_broadcast_script(articles)
