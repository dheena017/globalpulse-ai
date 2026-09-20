"""
GlobalPulse AI - Bookmark & Reading History Database Repository
"""

import time
import hashlib
from typing import List
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.bookmark_model import BookmarkDB, ReadingHistoryDB
from app.db.models.article_model import ArticleDB
from app.repositories.article_repository import db_to_pydantic
from app.models.news_models import Article

class BookmarkRepository:
    @staticmethod
    async def toggle_bookmark(session: AsyncSession, user_id: str, article_id: str) -> bool:
        stmt = select(BookmarkDB).where(BookmarkDB.user_id == user_id, BookmarkDB.article_id == article_id)
        result = await session.execute(stmt)
        existing = result.scalar_one_or_none()

        if existing:
            await session.delete(existing)
            await session.commit()
            return False
        else:
            bid = f"bm_{hashlib.md5(f'{user_id}_{article_id}'.encode()).hexdigest()[:12]}"
            new_bm = BookmarkDB(id=bid, user_id=user_id, article_id=article_id, created_at=int(time.time()))
            session.add(new_bm)
            await session.commit()
            return True

    @staticmethod
    async def get_user_bookmarks(session: AsyncSession, user_id: str) -> List[Article]:
        stmt = (
            select(ArticleDB)
            .join(BookmarkDB, ArticleDB.id == BookmarkDB.article_id)
            .where(BookmarkDB.user_id == user_id)
            .order_by(BookmarkDB.created_at.desc())
        )
        result = await session.execute(stmt)
        rows = result.scalars().all()
        return [db_to_pydantic(r) for r in rows]

    @staticmethod
    async def record_history(session: AsyncSession, user_id: str, article_id: str):
        hid = f"hist_{hashlib.md5(f'{user_id}_{article_id}_{time.time()}'.encode()).hexdigest()[:12]}"
        entry = ReadingHistoryDB(id=hid, user_id=user_id, article_id=article_id, viewed_at=int(time.time()))
        session.add(entry)
        await session.commit()
