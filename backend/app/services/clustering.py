"""
GlobalPulse AI - Canonical Deduplication & Story Clustering Engine
Groups related wire dispatches from multiple publishers covering the same global event.
"""

import re
import hashlib
from typing import List, Dict, Any
from app.models.news_models import Article

def compute_similarity_hash(text: str) -> str:
    """Computes a normalized word-frequency cluster hash."""
    words = re.findall(r'\b[a-zA-Z]{4,}\b', text.lower())
    stop_words = {"this", "that", "with", "from", "have", "were", "been", "their", "about", "which", "will", "would"}
    filtered = sorted(list(set([w for w in words if w not in stop_words])))[:8]
    return "-".join(filtered)

def cluster_articles(articles: List[Article]) -> Dict[str, List[Article]]:
    """Clusters articles by topic/entity overlap."""
    clusters: Dict[str, List[Article]] = {}

    for art in articles:
        cluster_key = compute_similarity_hash(f"{art.title} {art.category}")
        if not cluster_key:
            cluster_key = art.category
        if cluster_key not in clusters:
            clusters[cluster_key] = []
        clusters[cluster_key].append(art)

    return clusters
