"""
GlobalPulse AI - AI Intelligence Router (/api/v1/ai)
"""

from typing import Optional, List
from fastapi import APIRouter, Query, HTTPException, Body
from app.models.ai_models import (
    SummaryRequest, SummaryResponse,
    SentimentRequest, SentimentResponse,
    FactCheckResponse, BiasAnalysisResponse,
    PerspectiveCompareResponse, BlindspotResponse,
    StoryTimelineResponse, ChatRequest, ChatResponse,
    DailyBriefingResponse
)
from app.services.ai_summarizer import summarize_article
from app.services.fact_checker import verify_article_facts
from app.services.sentiment_analyzer import analyze_sentiment, analyze_bias
from app.services.perspective_compare import compare_perspectives, detect_blindspots
from app.services.timeline_generator import generate_story_timeline
from app.services.news_chat import answer_news_question
from app.services.news_fetcher import get_all_news, get_article_by_id

router = APIRouter(prefix="/ai", tags=["AI Intelligence"])

@router.get("/daily-world-briefing", response_model=DailyBriefingResponse, summary="Get 60s Daily Executive Briefing")
async def get_daily_world_briefing():
    """Synthesizes top 5 global developments into an executive daily digest."""
    articles = await get_all_news()
    top_5 = articles[:5] if articles else []

    developments = []
    for a in top_5:
        developments.append({
            "id": a.id,
            "title": a.title,
            "category": a.category,
            "source": a.source.name,
            "takeaway": a.summary[:150] + "...",
            "impact": a.impact_level
        })

    return DailyBriefingResponse(
        title="Global Executive Intelligence Digest",
        date="Live World Synthesis",
        audio_ready=True,
        top_developments=developments,
        global_mood="Constructive & Forward-Moving",
        executive_quote="Global macro indicators reflect disciplined technological investment and strategic diplomatic realignment across international corridors."
    )

@router.post("/generate-summary", response_model=SummaryResponse, summary="Generate AI Bullet Summary & TL;DR")
async def generate_summary(payload: SummaryRequest):
    """Generates 3 bullet points, executive takeaway, and deep context."""
    title = payload.title or ""
    content = payload.content or ""
    
    if payload.article_id:
        art = await get_article_by_id(payload.article_id)
        if art:
            title = title or art.title
            content = content or art.content or art.summary

    if not content:
        raise HTTPException(status_code=400, detail="Content or valid article_id is required.")

    return await summarize_article(title=title, text=content, mode=payload.mode)

@router.post("/analyze-sentiment", response_model=SentimentResponse, summary="Analyze Sentiment & Emotional Tone")
async def get_sentiment(payload: SentimentRequest):
    """Calculates polarity score (-1.0 to +1.0) and emotional tone."""
    return analyze_sentiment(payload.text, payload.title or "")

@router.post("/analyze-bias", response_model=BiasAnalysisResponse, summary="Analyze Editorial Bias & Framing")
async def get_bias(text: str = Body(..., embed=True), source_name: str = Body("Reuters", embed=True)):
    """Evaluates editorial stance and sensationalism rating."""
    return analyze_bias(text, source_name)

@router.post("/fact-check-score", response_model=FactCheckResponse, summary="Deep Claim Verification & Truth Score")
async def get_fact_check_score(
    article_id: Optional[str] = Body(None),
    title: str = Body(""),
    content: str = Body(""),
    source_name: str = Body("Reuters")
):
    """Extracts factual claims and produces 0–100% confidence score."""
    if article_id:
        art = await get_article_by_id(article_id)
        if art:
            title = title or art.title
            content = content or art.content or art.summary
            source_name = source_name or art.source.name

    return verify_article_facts(article_id, title, content, source_name)

@router.post("/compare-sources", response_model=PerspectiveCompareResponse, summary="Multi-Source Perspective Comparison")
async def get_perspective_comparison(topic: str = Body(...), article_title: str = Body("")):
    """Compares reporting angles across Reuters, BBC, and Al Jazeera."""
    return compare_perspectives(topic, article_title)

@router.post("/blindspot-radar", response_model=BlindspotResponse, summary="Detect Media Blindspots & Echo Chambers")
async def get_blindspot_radar(topic: str = Body(...)):
    """Detects regional underreporting and unbalanced news framing."""
    return detect_blindspots(topic)

@router.post("/story-timeline", response_model=StoryTimelineResponse, summary="Generate Event Timeline Milestones")
async def get_story_timeline(topic: str = Body(...), article_title: str = Body("")):
    """Generates chronological progression of a major developing event."""
    return generate_story_timeline(topic, article_title)

@router.post("/ask-question", response_model=ChatResponse, summary="Interactive 'Ask AI' News Assistant")
async def ask_question(payload: ChatRequest):
    """Answers conversational questions about any news article or world topic."""
    title = payload.article_title or ""
    context = payload.article_context or ""
    
    if payload.article_id and not context:
        art = await get_article_by_id(payload.article_id)
        if art:
            title = title or art.title
            context = context or art.content or art.summary

    return await answer_news_question(
        message=payload.message,
        article_title=title,
        article_context=context,
        history=payload.history
    )
