"""
GlobalPulse AI - System Health & Cache Refresh Router (/api/v1/system)
"""

from fastapi import APIRouter, Depends
from app.utils.cache_helper import global_cache
from app.services.news_fetcher import get_all_news
from app.config import TRUSTED_FEEDS
from app.security.rbac import require_admin_user

router = APIRouter(prefix="/system", tags=["System & Health"])

@router.get("/health-check", summary="Get Server Health & RSS Status")
async def health_check():
    """System uptime, cache statistics, and registered feed counts."""
    stats = global_cache.stats()
    return {
        "status": "healthy",
        "service": "GlobalPulse AI Enterprise API",
        "version": "2.0.0",
        "persistence": "Async SQLite / PostgreSQL via SQLAlchemy",
        "trusted_feeds_registered": len(TRUSTED_FEEDS),
        "cache": stats
    }

@router.post("/refresh-all-feeds", summary="Force Refresh All Live Feeds (Admin Only)")
async def refresh_all_feeds(admin_ctx: dict = Depends(require_admin_user)):
    """Admin-only protected endpoint to force parallel re-fetch across all 25+ RSS feeds."""
    articles = await get_all_news(force_refresh=True)
    return {
        "status": "success",
        "message": f"Successfully reloaded {len(articles)} live articles from all trusted sources.",
        "article_count": len(articles),
        "triggered_by": admin_ctx.get("sub", "admin")
    }
