"""
GlobalPulse AI - User and Auth Database Models
"""

import time
from sqlalchemy import Column, String, Boolean, Integer, DateTime, Text
from app.db.database import Base

class UserDB(Base):
    __tablename__ = "users"

    id = Column(String(64), primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=True)
    avatar_url = Column(String(512), nullable=True)
    role = Column(String(32), default="user", nullable=False)  # admin, user, guest
    is_guest = Column(Boolean, default=False, nullable=False)
    preferred_categories = Column(Text, default="world,technology,business,science")
    created_at = Column(Integer, default=lambda: int(time.time()))
    last_login_at = Column(Integer, default=lambda: int(time.time()))

class UserApiKeyDB(Base):
    __tablename__ = "user_api_keys"

    id = Column(String(64), primary_key=True, index=True)
    user_id = Column(String(64), index=True, nullable=False)
    provider = Column(String(32), nullable=False)  # gemini, openai
    encrypted_key = Column(Text, nullable=False)
    created_at = Column(Integer, default=lambda: int(time.time()))
