"""
GlobalPulse AI - Article Database Repository
"""

import time
from typing import List, Optional, Dict, Any
from sqlalchemy import select, update, delete, desc
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.article_model import ArticleDB, StoryClusterDB, NewsSourceDB
from app.models.news_models import Article, ArticleSource

def db_to_pydantic(row: ArticleDB) -> Article:
    """Maps SQLAlchemy ArticleDB row to Pydantic Article model."""
    tag_list = [t.strip() for t in row.tags.split(",") if t.strip()] if row.tags else []
    return Article(
        id=row.id,
        title=row.title,
        summary=row.summary,
        content=row.content or row.summary,
        link=row.canonical_url,
        source=ArticleSource(
            id=row.source_id,
            name=row.source_name,
            trust_score=row.source_trust_score,
            bias=row.source_bias,
            country=row.source_country,
            url=row.source_homepage,
            is_verified=True
        ),
        published_at=row.published_at_raw or "Recent update",
        category=row.category,
        region=row.region or "global",
        image_url=row.image_url,
        reading_time=row.reading_time or 3,
        is_breaking=row.is_breaking,
        is_featured=row.is_featured,
        impact_level=row.impact_level or "Standard",
        sentiment_score=row.sentiment_score or 0.0,
        sentiment_label=row.sentiment_label or "Neutral",
        fact_check_score=row.fact_check_score or 95,
        tags=tag_list
    )

class ArticleRepository:
    @staticmethod
    async def upsert_article(session: AsyncSession, article: Article, cluster_id: Optional[str] = None) -> ArticleDB:
        """Upserts article record into persistent database."""
        stmt = select(ArticleDB).where(ArticleDB.id == article.id)
        result = await session.execute(stmt)
        existing = result.scalar_one_or_none()

        tags_str = ",".join(article.tags)

        if existing:
            existing.title = article.title
            existing.summary = article.summary
            existing.content = article.content
            existing.image_url = article.image_url
            existing.impact_level = article.impact_level
            existing.is_breaking = article.is_breaking
            existing.is_featured = article.is_featured
            existing.sentiment_score = article.sentiment_score
            existing.sentiment_label = article.sentiment_label
            existing.fact_check_score = article.fact_check_score
            existing.tags = tags_str
            if cluster_id:
                existing.cluster_id = cluster_id
            await session.commit()
            return existing
        else:
            db_art = ArticleDB(
                id=article.id,
                cluster_id=cluster_id,
                canonical_url=article.link,
                title=article.title,
                summary=article.summary,
                content=article.content,
                content_status="rss_summary",
                source_id=article.source.id,
                source_name=article.source.name,
                source_trust_score=article.source.trust_score,
                source_bias=article.source.bias,
                source_country=article.source.country,
                source_homepage=article.source.url or "",
                category=article.category,
                region=article.region,
                image_url=article.image_url,
                reading_time=article.reading_time,
                is_breaking=article.is_breaking,
                is_featured=article.is_featured,
                impact_level=article.impact_level,
                sentiment_score=article.sentiment_score,
                sentiment_label=article.sentiment_label,
                fact_check_score=article.fact_check_score,
                tags=tags_str,
                published_at_raw=article.published_at,
                created_at=int(time.time())
            )
            session.add(db_art)
            await session.commit()
            return db_art

    @staticmethod
    async def get_articles(
        session: AsyncSession,
        category: Optional[str] = None,
        source: Optional[str] = None,
        region: Optional[str] = None,
        search: Optional[str] = None,
        wires_only: bool = False,
        limit: int = 50,
        offset: int = 0
    ) -> List[Article]:
        """Queries persistent articles with filters."""
        stmt = select(ArticleDB).order_by(desc(ArticleDB.created_at))

        if category and category.lower() != "all":
            stmt = stmt.where(ArticleDB.category == category.lower())
        if source and source.lower() != "all":
            stmt = stmt.where(ArticleDB.source_id == source)
        if region and region.lower() != "all":
            stmt = stmt.where(ArticleDB.region == region.lower())
        if wires_only:
            stmt = stmt.where(ArticleDB.source_id.in_(["reuters-world", "ap-top", "bbc-world", "npr-world", "dw-world"]))
        if search and search.strip():
            term = f"%{search.strip()}%"
            stmt = stmt.where((ArticleDB.title.ilike(term)) | (ArticleDB.summary.ilike(term)) | (ArticleDB.tags.ilike(term)))

        stmt = stmt.limit(limit).offset(offset)
        result = await session.execute(stmt)
        rows = result.scalars().all()
        return [db_to_pydantic(r) for r in rows]

    @staticmethod
    async def get_by_id(session: AsyncSession, article_id: str) -> Optional[Article]:
        """Finds article by ID."""
        stmt = select(ArticleDB).where(ArticleDB.id == article_id)
        result = await session.execute(stmt)
        row = result.scalar_one_or_none()
        return db_to_pydantic(row) if row else None
