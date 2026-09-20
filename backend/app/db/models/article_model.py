"""
GlobalPulse AI - Article, Story Cluster & News Source Database Models
"""

import time
from sqlalchemy import Column, String, Integer, Float, Boolean, Text, Index
from app.db.database import Base

class NewsSourceDB(Base):
    __tablename__ = "news_sources"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(64), nullable=False)
    region = Column(String(64), default="global")
    trust_score = Column(Integer, default=95)
    bias = Column(String(64), default="Center")
    country = Column(String(128), default="International")
    rss_url = Column(String(512), nullable=False)
    homepage = Column(String(512), nullable=False)
    status = Column(String(32), default="healthy")  # healthy, slow, error
    latency_ms = Column(Integer, default=100)
    failure_count = Column(Integer, default=0)
    last_success_at = Column(Integer, default=0)
    last_failure_at = Column(Integer, default=0)

class StoryClusterDB(Base):
    __tablename__ = "story_clusters"

    id = Column(String(64), primary_key=True, index=True)
    title = Column(String(512), nullable=False)
    topic = Column(String(255), index=True, nullable=False)
    category = Column(String(64), index=True, nullable=False)
    consensus_summary = Column(Text, nullable=True)
    article_count = Column(Integer, default=1)
    updated_at = Column(Integer, default=lambda: int(time.time()), index=True)

class ArticleDB(Base):
    __tablename__ = "articles"

    id = Column(String(64), primary_key=True, index=True)
    cluster_id = Column(String(64), index=True, nullable=True)
    canonical_url = Column(String(1024), unique=True, index=True, nullable=False)
    title = Column(String(512), nullable=False)
    summary = Column(Text, nullable=False)
    content = Column(Text, nullable=True)
    content_status = Column(String(32), default="rss_summary")  # rss_summary, extracted, paywalled, unavailable
    
    source_id = Column(String(64), index=True, nullable=False)
    source_name = Column(String(255), nullable=False)
    source_trust_score = Column(Integer, default=95)
    source_bias = Column(String(64), default="Center")
    source_country = Column(String(128), default="International")
    source_homepage = Column(String(512), default="")
    
    category = Column(String(64), index=True, nullable=False)
    region = Column(String(64), index=True, default="global")
    image_url = Column(String(1024), nullable=True)
    reading_time = Column(Integer, default=3)
    
    is_breaking = Column(Boolean, default=False, index=True)
    is_featured = Column(Boolean, default=False, index=True)
    impact_level = Column(String(32), default="Standard")
    
    sentiment_score = Column(Float, default=0.0)
    sentiment_label = Column(String(32), default="Neutral")
    fact_check_score = Column(Integer, default=95)
    tags = Column(Text, default="")  # comma separated
    
    published_at_raw = Column(String(128), default="Just now")
    created_at = Column(Integer, default=lambda: int(time.time()), index=True)

    __table_args__ = (
        Index("idx_category_created", "category", "created_at"),
        Index("idx_region_created", "region", "created_at"),
    )
