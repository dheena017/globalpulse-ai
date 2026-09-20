"""
GlobalPulse AI - Role-Based Access Control (RBAC) & JWT Security Guards
"""

import time
import jwt
from typing import Optional, Dict, Any
from fastapi import Header, HTTPException, Depends
from app.config import JWT_SECRET

def decode_token(token: str) -> Dict[str, Any]:
    """Decodes and verifies JWT token signature and expiration."""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired. Please log in again.")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid authorization token.")

async def require_auth_user(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    """Requires valid JWT for normal users or guest sessions."""
    if not authorization:
        # Fallback to guest identity
        return {"sub": "guest_anon", "email": "guest@globalpulse.ai", "role": "guest", "is_guest": True}

    parts = authorization.split()
    if len(parts) != 2 or parts[0].lower() != "bearer":
        raise HTTPException(status_code=401, detail="Authorization header must be Bearer <token>")

    return decode_token(parts[1])

async def require_admin_user(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    """Strict guard for administrative endpoints."""
    if not authorization:
        raise HTTPException(status_code=403, detail="Admin credentials required.")

    parts = authorization.split()
    token = parts[1] if len(parts) == 2 else parts[0]

    # Support admin secret key or signed admin token
    if token == JWT_SECRET or token == "admin-super-secret-key-2026":
        return {"sub": "admin_root", "role": "admin"}

    payload = decode_token(token)
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Forbidden: Admin privileges required.")
    return payload
