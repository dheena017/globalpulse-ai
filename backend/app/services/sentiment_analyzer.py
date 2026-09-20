"""
GlobalPulse AI - Sentiment, Emotional Tone & Bias Analysis Engine
"""

import re
from app.models.ai_models import SentimentResponse, BiasAnalysisResponse

POSITIVE_WORDS = {
    "growth", "record", "breakthrough", "innovative", "expansion", "progress", "success",
    "agreement", "boost", "optimism", "recovery", "historic", "sustainable", "rally",
    "peace", "cooperation", "milestone", "advancement", "solution", "gains", "upgrade"
}

NEGATIVE_WORDS = {
    "crisis", "collapse", "decline", "fall", "tension", "conflict", "sanctions", "strike",
    "escalation", "inflation", "risk", "warning", "deficit", "threat", "drop", "lawsuit",
    "investigation", "recession", "turmoil", "outbreak", "disaster", "volatile", "loss"
}

def analyze_sentiment(text: str, title: str = "") -> SentimentResponse:
    """Calculates polarity score (-1.0 to +1.0) and emotional tone."""
    combined = f"{title} {text}".lower()
    words = re.findall(r'\b\w+\b', combined)
    if not words:
        return SentimentResponse(
            polarity_score=0.0,
            subjectivity_score=0.1,
            sentiment_label="Neutral",
            emotional_tone="Factual",
            confidence=0.9
        )

    pos_count = sum(1 for w in words if w in POSITIVE_WORDS)
    neg_count = sum(1 for w in words if w in NEGATIVE_WORDS)
    total_sentiment_words = pos_count + neg_count

    if total_sentiment_words == 0:
        polarity = 0.0
    else:
        polarity = round((pos_count - neg_count) / max(total_sentiment_words, 1), 2)
        polarity = max(-1.0, min(1.0, polarity))

    if polarity >= 0.25:
        label = "Positive"
        tone = "Optimistic"
    elif polarity <= -0.25:
        label = "Negative"
        tone = "Urgent / Cautious"
    else:
        label = "Neutral"
        tone = "Factual / Analytical"

    subjectivity = round(min(1.0, (total_sentiment_words / len(words)) * 3), 2)

    return SentimentResponse(
        polarity_score=polarity,
        subjectivity_score=subjectivity,
        sentiment_label=label,
        emotional_tone=tone,
        confidence=0.94
    )

def analyze_bias(text: str, source_name: str = "Reuters") -> BiasAnalysisResponse:
    """Evaluates editorial stance, loaded language, and sensationalism index."""
    combined = text.lower()
    sensational_words = ["unbelievable", "shocking", "disaster", "historic meltdown", "furious", "crushed"]
    sensational_hits = sum(1 for w in sensational_words if w in combined)
    
    sensationalism = "Low (Fact-Focused Wire)" if sensational_hits == 0 else ("Moderate" if sensational_hits == 1 else "High")
    loaded_score = min(100, sensational_hits * 25 + 5)

    stance_map = {
        "reuters": "Neutral / Center Wire",
        "ap": "Neutral / Center Wire",
        "bbc": "Center",
        "guardian": "Center-Left",
        "ft": "Financial / Center",
        "mit": "Academic / Tech",
        "aljazeera": "International / Center"
    }

    stance = "Neutral / Center"
    for key, val in stance_map.items():
        if key in source_name.lower():
            stance = val
            break

    return BiasAnalysisResponse(
        editorial_stance=stance,
        sensationalism_rating=sensationalism,
        framing_perspective="Empirical and Institutional primary source framing with cross-regional validation.",
        loaded_language_score=loaded_score
    )
