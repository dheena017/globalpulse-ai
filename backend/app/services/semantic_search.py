"""
GlobalPulse AI - Semantic Natural Language Search & Question Matcher
"""

import re
from typing import List
from app.models.news_models import Article

def semantic_search_articles(query: str, articles: List[Article]) -> List[Article]:
    """Matches natural language query against articles using weighted keyword and concept matching."""
    if not query or not query.strip():
        return articles

    cleaned_query = query.lower().strip()
    query_terms = re.findall(r'\b\w+\b', cleaned_query)
    stop_words = {"what", "is", "the", "latest", "how", "why", "in", "on", "at", "and", "or", "for", "to", "a", "an", "about"}
    meaningful_terms = [t for t in query_terms if t not in stop_words]
    if not meaningful_terms:
        meaningful_terms = query_terms

    scored: List[tuple[int, Article]] = []
    for art in articles:
        score = 0
        title_lower = art.title.lower()
        summary_lower = art.summary.lower()
        category_lower = art.category.lower()
        source_lower = art.source.name.lower()

        # Exact phrase match bonus
        if cleaned_query in title_lower:
            score += 100
        elif cleaned_query in summary_lower:
            score += 50

        # Term matching
        for term in meaningful_terms:
            if term in title_lower:
                score += 20
            if term in summary_lower:
                score += 10
            if term == category_lower:
                score += 15
            if term in source_lower:
                score += 10
            for tag in art.tags:
                if term in tag.lower():
                    score += 15

        if score > 0:
            scored.append((score, art))

    scored.sort(key=lambda x: x[0], reverse=True)
    return [item[1] for item in scored]
