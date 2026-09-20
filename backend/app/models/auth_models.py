"""
GlobalPulse AI - User Authentication & Session Data Models
"""

from typing import Optional, List
from pydantic import BaseModel, EmailStr

class GoogleAuthRequest(BaseModel):
    credential: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None
    picture: Optional[str] = None
    google_id: Optional[str] = None

class EmailLoginRequest(BaseModel):
    email: str
    password: str

class UserProfile(BaseModel):
    id: str
    email: str
    name: str
    avatar_url: Optional[str] = None
    is_guest: bool = False
    preferred_categories: List[str] = ["world", "technology", "business"]
    saved_articles_count: int = 0
    reading_streak_days: int = 1
    created_at: str

class AuthResponse(BaseModel):
    token: str
    user: UserProfile
    message: str = "Authentication successful"
