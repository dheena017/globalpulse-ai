"""
GlobalPulse AI - Audio & Podcast Data Models
"""

from typing import List, Optional
from pydantic import BaseModel

class AudioChapter(BaseModel):
    id: str
    timestamp_seconds: int
    timestamp_display: str
    title: str
    category: str
    anchor_name: str # Elena Vance, Alex Chen, Marcus Sterling
    script_segment: str

class PodcastScriptResponse(BaseModel):
    id: str
    title: str
    date: str
    duration_estimated_minutes: int
    host_intro: str
    chapters: List[AudioChapter]
    host_outro: str
    full_audio_script: str
