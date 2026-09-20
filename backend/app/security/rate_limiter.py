"""
GlobalPulse AI - Token Bucket Rate Limiter & Quota Engine
Protects expensive AI and search endpoints with per-IP, per-user, and per-guest limits.
"""

import time
from typing import Dict
from fastapi import Request, HTTPException

class TokenBucketRateLimiter:
    def __init__(self):
        # key -> {"tokens": float, "last_updated": float}
        self.buckets: Dict[str, Dict[str, float]] = {}

    def check_limit(self, key: str, capacity: int = 60, refill_rate: float = 1.0, cost: int = 1) -> bool:
        """
        Token bucket algorithm.
        capacity: Max tokens bucket can hold.
        refill_rate: Tokens added per second.
        cost: Tokens required for this operation.
        """
        now = time.time()
        bucket = self.buckets.get(key)

        if not bucket:
            self.buckets[key] = {"tokens": capacity - cost, "last_updated": now}
            return True

        # Calculate refilled tokens
        elapsed = now - bucket["last_updated"]
        refilled = elapsed * refill_rate
        current_tokens = min(capacity, bucket["tokens"] + refilled)

        if current_tokens >= cost:
            self.buckets[key] = {"tokens": current_tokens - cost, "last_updated": now}
            return True
        else:
            self.buckets[key]["last_updated"] = now
            return False

global_rate_limiter = TokenBucketRateLimiter()

def rate_limit_guard(capacity: int = 60, refill_rate: float = 1.0, cost: int = 1):
    """FastAPI dependency for rate limiting by client IP."""
    async def dependency(request: Request):
        client_ip = request.client.host if request.client else "unknown"
        path = request.url.path
        key = f"{client_ip}:{path}"

        allowed = global_rate_limiter.check_limit(key, capacity=capacity, refill_rate=refill_rate, cost=cost)
        if not allowed:
            raise HTTPException(
                status_code=429,
                detail="Rate limit exceeded. Please wait a moment before trying again."
            )
    return dependency
