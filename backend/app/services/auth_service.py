"""
GlobalPulse AI - Authentication, Google Sign-In & Session Manager
"""

import time
import jwt
import hashlib
from typing import Optional
from app.config import JWT_SECRET
from app.models.auth_models import UserProfile, AuthResponse, GoogleAuthRequest

def generate_user_jwt(user: UserProfile) -> str:
    """Creates a signed JWT token."""
    payload = {
        "sub": user.id,
        "email": user.email,
        "name": user.name,
        "is_guest": user.is_guest,
        "iat": int(time.time()),
        "exp": int(time.time()) + (86400 * 30)  # 30 days valid
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def create_guest_user() -> AuthResponse:
    """Generates an instant Guest session with full platform access."""
    guest_id = f"guest_{hashlib.md5(str(time.time()).encode()).hexdigest()[:8]}"
    user = UserProfile(
        id=guest_id,
        email=f"{guest_id}@globalpulse.ai",
        name="Global Observer (Guest)",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        is_guest=True,
        preferred_categories=["world", "technology", "business", "science"],
        saved_articles_count=0,
        reading_streak_days=1,
        created_at=time.strftime("%Y-%m-%d")
    )
    token = generate_user_jwt(user)
    return AuthResponse(token=token, user=user, message="Welcome, Guest Explorer!")

def handle_google_sign_in(req: GoogleAuthRequest) -> AuthResponse:
    """Processes Google OAuth sign-in payload."""
    email = req.email or "google.user@example.com"
    name = req.name or email.split("@")[0].title()
    avatar = req.picture or "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    user_id = f"g_{hashlib.md5(email.encode()).hexdigest()[:10]}"

    user = UserProfile(
        id=user_id,
        email=email,
        name=name,
        avatar_url=avatar,
        is_guest=False,
        preferred_categories=["world", "technology", "business", "science", "climate"],
        saved_articles_count=3,
        reading_streak_days=3,
        created_at=time.strftime("%Y-%m-%d")
    )
    token = generate_user_jwt(user)
    return AuthResponse(token=token, user=user, message=f"Welcome back, {name}!")

def handle_email_login(email: str, password: str) -> AuthResponse:
    """Processes email and password login."""
    name = email.split("@")[0].replace(".", " ").title()
    user_id = f"u_{hashlib.md5(email.encode()).hexdigest()[:10]}"
    user = UserProfile(
        id=user_id,
        email=email,
        name=name,
        avatar_url="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        is_guest=False,
        preferred_categories=["world", "technology", "business"],
        saved_articles_count=2,
        reading_streak_days=2,
        created_at=time.strftime("%Y-%m-%d")
    )
    token = generate_user_jwt(user)
    return AuthResponse(token=token, user=user, message=f"Signed in as {name}")
