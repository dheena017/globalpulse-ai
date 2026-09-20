"""
GlobalPulse AI - Custom Topic Radar Database Models
"""

import time
from sqlalchemy import Column, String, Integer, Text
from app.db.database import Base

class TopicRadarDB(Base):
    __tablename__ = "topic_radars"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), index=True, nullable=False)
    keyword = Column(String(255), nullable=False)
    alert_frequency = Column(String(32), default="realtime")  # realtime, daily
    created_at = Column(Integer, default=lambda: int(time.time()))
