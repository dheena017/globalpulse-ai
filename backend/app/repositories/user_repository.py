"""
GlobalPulse AI - User Database Repository
"""

import time
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.user_model import UserDB
from app.models.auth_models import UserProfile

class UserRepository:
    @staticmethod
    async def get_by_id(session: AsyncSession, user_id: str) -> Optional[UserProfile]:
        stmt = select(UserDB).where(UserDB.id == user_id)
        result = await session.execute(stmt)
        u = result.scalar_one_or_none()
        if not u:
            return None
        cats = [c.strip() for c in u.preferred_categories.split(",") if c.strip()]
        return UserProfile(
            id=u.id,
            email=u.email,
            name=u.name,
            avatar_url=u.avatar_url,
            is_guest=u.is_guest,
            preferred_categories=cats,
            saved_articles_count=0,
            reading_streak_days=1,
            created_at=time.strftime("%Y-%m-%d", time.localtime(u.created_at))
        )

    @staticmethod
    async def get_by_email(session: AsyncSession, email: str) -> Optional[UserProfile]:
        stmt = select(UserDB).where(UserDB.email == email)
        result = await session.execute(stmt)
        u = result.scalar_one_or_none()
        if not u:
            return None
        cats = [c.strip() for c in u.preferred_categories.split(",") if c.strip()]
        return UserProfile(
            id=u.id,
            email=u.email,
            name=u.name,
            avatar_url=u.avatar_url,
            is_guest=u.is_guest,
            preferred_categories=cats,
            saved_articles_count=0,
            reading_streak_days=1,
            created_at=time.strftime("%Y-%m-%d", time.localtime(u.created_at))
        )

    @staticmethod
    async def upsert_user(session: AsyncSession, user: UserProfile, role: str = "user") -> UserDB:
        stmt = select(UserDB).where(UserDB.id == user.id)
        result = await session.execute(stmt)
        existing = result.scalar_one_or_none()

        cats_str = ",".join(user.preferred_categories)

        if existing:
            existing.name = user.name
            existing.avatar_url = user.avatar_url
            existing.preferred_categories = cats_str
            existing.last_login_at = int(time.time())
            await session.commit()
            return existing
        else:
            db_u = UserDB(
                id=user.id,
                email=user.email,
                name=user.name,
                avatar_url=user.avatar_url,
                role=role,
                is_guest=user.is_guest,
                preferred_categories=cats_str,
                created_at=int(time.time()),
                last_login_at=int(time.time())
            )
            session.add(db_u)
            await session.commit()
            return db_u
