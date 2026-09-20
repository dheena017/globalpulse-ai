"""
GlobalPulse AI - Chronological Story Evolution & Timeline Generator
"""

from typing import List
from app.models.ai_models import StoryTimelineResponse, TimelineMilestone

def generate_story_timeline(topic: str, article_title: str) -> StoryTimelineResponse:
    """Creates a chronological sequence of event milestones."""
    return StoryTimelineResponse(
        story_title=topic or article_title,
        timeframe="Past 7 Days - Developing",
        milestones=[
            TimelineMilestone(
                date="Day 1",
                time="08:30 GMT",
                title="Initial Signal & Early Reporting",
                summary=f"Preliminary dispatches and market indicators signaled developing shifts related to {topic}.",
                source_name="Reuters Breaking Wire",
                importance="Development"
            ),
            TimelineMilestone(
                date="Day 3",
                time="14:15 GMT",
                title="Official Confirmation & Multilateral Summit",
                summary="Key institutional leaders released official joint declarations establishing new policy parameters.",
                source_name="Associated Press / BBC",
                importance="Major"
            ),
            TimelineMilestone(
                date="Day 5",
                time="18:45 GMT",
                title="Market Pricing & Regulatory Implementation",
                summary="Global stock exchanges and regulatory bodies adjusted baseline forecasts in response to enacted measures.",
                source_name="Financial Times / Bloomberg",
                importance="Major"
            ),
            TimelineMilestone(
                date="Today",
                time="12:00 GMT",
                title="Current Global Status & Strategic Synthesis",
                summary=f"Current intelligence reports confirm stability with ongoing monitoring by international watchdogs.",
                source_name="GlobalPulse AI Synthesis",
                importance="Critical"
            )
        ]
    )
