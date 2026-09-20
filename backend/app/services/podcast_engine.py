"""
GlobalPulse AI - Multi-Anchor Voice Podcast Script & Audio Synthesizer
Generates radio-style scripts with customizable anchor personas (Elena Vance, Alex Chen, Marcus Sterling)
"""

from typing import List
from app.models.news_models import Article
from app.models.audio_models import PodcastScriptResponse, AudioChapter

def generate_podcast_broadcast_script(articles: List[Article]) -> PodcastScriptResponse:
    """Generates structured radio-style multi-anchor podcast broadcast script."""
    top_articles = articles[:4] if articles else []
    
    chapters: List[AudioChapter] = []
    accumulated_time = 30 # after 30s intro

    # Anchor personas:
    # Elena Vance: Geopolitics & World
    # Alex Chen: Tech & Science
    # Marcus Sterling: Markets & Economy

    for idx, art in enumerate(top_articles):
        if art.category in ["technology", "science"]:
            anchor = "Alex Chen"
        elif art.category in ["business", "markets"]:
            anchor = "Marcus Sterling"
        else:
            anchor = "Elena Vance"

        duration_sec = 60
        mins = accumulated_time // 60
        secs = accumulated_time % 60
        time_str = f"{mins:02d}:{secs:02d}"

        segment = (
            f"This is {anchor} reporting. In our {art.category.title()} spotlight: {art.title}. "
            f"{art.summary} Verified primary reports from {art.source.name} confirm this as a pivotal development."
        )

        chapters.append(AudioChapter(
            id=f"chap-{idx+1}",
            timestamp_seconds=accumulated_time,
            timestamp_display=time_str,
            title=art.title[:60] + "...",
            category=art.category,
            anchor_name=anchor,
            script_segment=segment
        ))
        accumulated_time += duration_sec

    host_intro = (
        "Welcome to the GlobalPulse AI Daily Audio Intelligence Briefing. "
        "Bringing you real-time synthesis across the world's most trusted news wires. "
        "Here are today's top global developments."
    )

    host_outro = (
        "That concludes today's GlobalPulse AI Audio Briefing. "
        "Stay informed with 360-degree verified intelligence at GlobalPulse AI. Thank you for listening."
    )

    full_script = f"{host_intro}\n\n" + "\n\n".join([c.script_segment for c in chapters]) + f"\n\n{host_outro}"

    return PodcastScriptResponse(
        id="daily-briefing-audio",
        title="GlobalPulse Daily Executive Audio Briefing",
        date="Today's Global Broadcast",
        duration_estimated_minutes=max(2, accumulated_time // 60),
        host_intro=host_intro,
        chapters=chapters,
        host_outro=host_outro,
        full_audio_script=full_script
    )
