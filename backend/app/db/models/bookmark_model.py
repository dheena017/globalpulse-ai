"""
GlobalPulse AI - User Bookmarks and Reading History Database Models
"""

import time
from sqlalchemy import Column, String, Integer, UniqueConstraint, Index
from app.db.database import Base

class BookmarkDB(Base):
    __tablename__ = "bookmarks"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), index=True, nullable=False)
    article_id = Column(String(64), index=True, nullable=False)
    created_at = Column(Integer, default=lambda: int(time.time()), index=True)

    __table_args__ = (
        UniqueConstraint("user_id", "article_id", name="uq_user_bookmark"),
    )

class ReadingHistoryDB(Base):
    __tablename__ = "reading_history"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), index=True, nullable=False)
    article_id = Column(String(64), index=True, nullable=False)
    viewed_at = Column(Integer, default=lambda: int(time.time()), index=True)
