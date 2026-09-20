"""
GlobalPulse AI - AI Intelligence & NLP Data Models
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class SummaryRequest(BaseModel):
    article_id: Optional[str] = None
    title: Optional[str] = None
    content: Optional[str] = None
    mode: str = "bullets" # bullets, executive, detailed

class SummaryResponse(BaseModel):
    article_id: Optional[str] = None
    three_key_bullets: List[str]
    executive_takeaway: str
    deep_context: Optional[str] = None
    reading_time_seconds: int = 45
    generated_by: str = "GlobalPulse AI Engine"

class SentimentRequest(BaseModel):
    text: str
    title: Optional[str] = ""

class SentimentResponse(BaseModel):
    polarity_score: float = Field(..., ge=-1.0, le=1.0)
    subjectivity_score: float = Field(..., ge=0.0, le=1.0)
    sentiment_label: str # Positive, Neutral, Negative, Cautious, Alarming
    emotional_tone: str # Optimistic, Factual, Critical, Analytical, Urgent
    confidence: float = 0.95

class ClaimVerification(BaseModel):
    claim: str
    verdict: str # Verified, Corroborated, Developing, Context Required
    confidence: int # 0-100
    corroborating_sources: List[str]
    notes: str

class FactCheckResponse(BaseModel):
    article_id: Optional[str] = None
    overall_truth_score: int # 0-100
    credibility_rating: str # Highly Reliable, Verified Factual, Developing Story
    claims: List[ClaimVerification]
    primary_sources_cited: List[str]
    unverified_elements_count: int = 0

class BiasAnalysisResponse(BaseModel):
    editorial_stance: str # Center, Center-Left, Center-Right, Neutral-Wire
    sensationalism_rating: str # Low (Fact-Focused), Moderate, High
    framing_perspective: str
    loaded_language_score: int # 0-100

class PerspectiveItem(BaseModel):
    source_name: str
    source_bias: str
    framing_angle: str
    key_emphasis: str
    quote_highlight: Optional[str] = None

class PerspectiveCompareResponse(BaseModel):
    topic: str
    consensus_facts: List[str]
    divergent_points: List[str]
    perspectives: List[PerspectiveItem]

class BlindspotResponse(BaseModel):
    topic: str
    heavily_covered_by: List[str]
    underreported_by: List[str]
    missing_context: str
    recommendation: str

class TimelineMilestone(BaseModel):
    date: str
    time: Optional[str] = None
    title: str
    summary: str
    source_name: str
    importance: str # Critical, Major, Development

class StoryTimelineResponse(BaseModel):
    story_title: str
    timeframe: str
    milestones: List[TimelineMilestone]

class ChatMessage(BaseModel):
    role: str # user, assistant, system
    content: str

class ChatRequest(BaseModel):
    message: str
    article_id: Optional[str] = None
    article_title: Optional[str] = None
    article_context: Optional[str] = None
    history: List[ChatMessage] = []

class ChatResponse(BaseModel):
    reply: str
    sources_cited: List[str] = []
    follow_up_suggestions: List[str] = []

class DailyBriefingResponse(BaseModel):
    title: str
    date: str
    audio_ready: bool = True
    top_developments: List[Dict[str, Any]]
    global_mood: str
    executive_quote: str
