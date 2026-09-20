"""
GlobalPulse AI - News and Source Data Models
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ArticleSource(BaseModel):
    id: str
    name: str
    trust_score: int = Field(default=95, ge=0, le=100)
    bias: str = "Center"
    country: str = "International"
    url: Optional[str] = None
    is_verified: bool = True

class Article(BaseModel):
    id: str
    title: str
    summary: str
    content: Optional[str] = None
    link: str
    source: ArticleSource
    published_at: str
    category: str
    region: str = "global"
    image_url: Optional[str] = None
    reading_time: int = 3
    is_breaking: bool = False
    is_featured: bool = False
    impact_level: str = "Standard"  # Critical, High, Moderate, Standard
    sentiment_score: float = 0.0    # -1.0 to +1.0
    sentiment_label: str = "Neutral" # Positive, Neutral, Negative
    fact_check_score: int = 95
    tags: List[str] = []

class NewsResponse(BaseModel):
    articles: List[Article]
    total: int
    page: int
    limit: int
    has_more: bool

class CategoryInfo(BaseModel):
    slug: str
    name: str
    icon: str
    color: str
    article_count: int = 0

class SourceInfo(BaseModel):
    id: str
    name: str
    category: str
    region: str
    trust_score: int
    bias: str
    country: str
    homepage: str
    status: str = "healthy" # healthy, slow, degraded
    latency_ms: int = 120
    article_count: int = 0

class RegionInfo(BaseModel):
    code: str
    name: str
    flag: str
    description: str
    sentiment_summary: str = "Neutral / Stable"
    article_count: int = 0
    top_articles: List[Article] = []
