"""
GlobalPulse AI - In-Memory High-Performance TTL Cache Helper
"""

import time
from typing import Any, Optional, Dict

class SimpleTTLCache:
    def __init__(self, default_ttl_seconds: int = 300):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self.default_ttl = default_ttl_seconds

    def get(self, key: str) -> Optional[Any]:
        entry = self._cache.get(key)
        if not entry:
            return None
        if time.time() > entry["expires_at"]:
            del self._cache[key]
            return None
        return entry["value"]

    def set(self, key: str, value: Any, ttl_seconds: Optional[int] = None) -> None:
        ttl = ttl_seconds if ttl_seconds is not None else self.default_ttl
        self._cache[key] = {
            "value": value,
            "expires_at": time.time() + ttl,
            "created_at": time.time()
        }

    def delete(self, key: str) -> None:
        if key in self._cache:
            del self._cache[key]

    def clear(self) -> None:
        self._cache.clear()

    def stats(self) -> Dict[str, Any]:
        valid_items = sum(1 for e in self._cache.values() if time.time() <= e["expires_at"])
        return {
            "total_keys": len(self._cache),
            "valid_keys": valid_items,
            "default_ttl_seconds": self.default_ttl
        }

# Global singleton cache instance
global_cache = SimpleTTLCache(default_ttl_seconds=300)
