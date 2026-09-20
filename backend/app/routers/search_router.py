"""
GlobalPulse AI - Search & Semantic Discovery Router (/api/v1/search)
"""

from typing import Optional, List
from fastapi import APIRouter, Query, Body, Depends
from app.models.news_models import Article, NewsResponse
from app.services.news_fetcher import get_all_news
from app.services.semantic_search import semantic_search_articles
from app.security.rate_limiter import rate_limit_guard

router = APIRouter(prefix="/search", tags=["Search & Discovery"])

@router.get("", response_model=NewsResponse, summary="Filtered Keyword Search")
async def keyword_search(
    q: str = Query(..., description="Search keyword"),
    category: Optional[str] = Query(None),
    limit: int = Query(20, ge=1, le=50)
):
    """Executes keyword search across articles."""
    articles = await get_all_news()
    matched = semantic_search_articles(q, articles)

    if category and category.lower() != "all":
        matched = [a for a in matched if a.category.lower() == category.lower()]

    paginated = matched[:limit]
    return NewsResponse(
        articles=paginated,
        total=len(matched),
        page=1,
        limit=limit,
        has_more=len(matched) > limit
    )

@router.post("/semantic", response_model=List[Article], summary="Natural Language Semantic Question Matcher", dependencies=[Depends(rate_limit_guard(capacity=30, refill_rate=0.5, cost=1))])
async def semantic_search(
    query: str = Body(..., embed=True),
    limit: int = Body(10)
):
    """Answers conversational questions by matching against relevant articles."""
    articles = await get_all_news()
    matched = semantic_search_articles(query, articles)
    return matched[:limit]

@router.get("/suggestions", response_model=List[str], summary="Autocomplete Search Suggestions")
async def get_suggestions(q: Optional[str] = Query(None)):
    """Provides trending entity and keyword auto-suggestions."""
    popular = [
        "Clean Fusion Energy",
        "Optical Neural Processors",
        "Central Bank Digital Settlement",
        "James Webb Space Discoveries",
        "Semiconductor Supply Chains",
        "Global Climate Accords",
        "G20 Macroeconomic Forecasts"
    ]
    if q and q.strip():
        return [p for p in popular if q.lower() in p.lower()]
    return popular[:5]
