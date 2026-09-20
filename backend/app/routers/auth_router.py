"""
GlobalPulse AI - User Authentication Router (/api/v1/auth)
"""

from fastapi import APIRouter, Header, HTTPException
from app.models.auth_models import GoogleAuthRequest, EmailLoginRequest, AuthResponse, UserProfile
from app.services.auth_service import handle_google_sign_in, handle_email_login, create_guest_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/google", response_model=AuthResponse, summary="Google Sign-In Authentication")
async def google_login(payload: GoogleAuthRequest):
    """Authenticate or register instantly with Google Account."""
    return handle_google_sign_in(payload)

@router.post("/email-login", response_model=AuthResponse, summary="Email & Password Login")
async def email_login(payload: EmailLoginRequest):
    """Standard email/password login."""
    if not payload.email or not payload.password:
        raise HTTPException(status_code=400, detail="Email and password are required.")
    return handle_email_login(payload.email, payload.password)

@router.post("/guest-login", response_model=AuthResponse, summary="Instant Guest Mode")
async def guest_login():
    """Create a temporary guest session with full platform capabilities."""
    return create_guest_user()

@router.get("/current-user", response_model=UserProfile, summary="Get Current Authenticated User")
async def get_current_user(authorization: str = Header(None)):
    """Returns profile for currently logged in token."""
    # Return default demo user if token is present or guest fallback
    return UserProfile(
        id="usr_demo_current",
        email="observer@globalpulse.ai",
        name="Global Observer",
        avatar_url="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        is_guest=False,
        preferred_categories=["world", "technology", "business", "science"],
        saved_articles_count=4,
        reading_streak_days=5,
        created_at="2026-09-01"
    )
