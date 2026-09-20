"""
GlobalPulse AI - Topic Radar Database Repository
"""

import time
import hashlib
from typing import List
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models.radar_model import TopicRadarDB

class RadarRepository:
    @staticmethod
    async def add_radar(session: AsyncSession, user_id: str, keyword: str) -> TopicRadarDB:
        rid = f"rad_{hashlib.md5(f'{user_id}_{keyword.lower()}'.encode()).hexdigest()[:12]}"
        stmt = select(TopicRadarDB).where(TopicRadarDB.id == rid)
        res = await session.execute(stmt)
        existing = res.scalar_one_or_none()
        if existing:
            return existing
        entry = TopicRadarDB(id=rid, user_id=user_id, keyword=keyword.strip(), created_at=int(time.time()))
        session.add(entry)
        await session.commit()
        return entry

    @staticmethod
    async def get_user_radars(session: AsyncSession, user_id: str) -> List[str]:
        stmt = select(TopicRadarDB.keyword).where(TopicRadarDB.user_id == user_id).order_by(TopicRadarDB.created_at.desc())
        res = await session.execute(stmt)
        return list(res.scalars().all())

    @staticmethod
    async def remove_radar(session: AsyncSession, user_id: str, keyword: str):
        stmt = delete(TopicRadarDB).where(TopicRadarDB.user_id == user_id, TopicRadarDB.keyword == keyword.strip())
        await session.execute(stmt)
        await session.commit()
