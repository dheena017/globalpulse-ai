"""
GlobalPulse AI - Text Cleaning, HTML Sanitization & Image Extraction
"""

import re
import html
from typing import Optional, List
from bs4 import BeautifulSoup

def clean_html_text(raw_html: str) -> str:
    """Strips HTML tags, scripts, styles, and normalizes whitespace."""
    if not raw_html:
        return ""
    try:
        # Unescape HTML entities first
        decoded = html.unescape(raw_html)
        soup = BeautifulSoup(decoded, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "header", "aside"]):
            tag.decompose()
        text = soup.get_text(separator=" ")
        # Clean extra whitespace
        cleaned = re.sub(r'\s+', ' ', text).strip()
        return cleaned
    except Exception:
        return re.sub(r'<[^>]+>', ' ', raw_html).strip()

def extract_image_url(entry_dict: dict) -> Optional[str]:
    """Extracts thumbnail image from media:content, enclosures, or raw html description."""
    # 1. Check media_content
    if "media_content" in entry_dict and isinstance(entry_dict["media_content"], list):
        for media in entry_dict["media_content"]:
            if isinstance(media, dict) and "url" in media:
                return media["url"]

    # 2. Check media_thumbnail
    if "media_thumbnail" in entry_dict and isinstance(entry_dict["media_thumbnail"], list):
        for thumb in entry_dict["media_thumbnail"]:
            if isinstance(thumb, dict) and "url" in thumb:
                return thumb["url"]

    # 3. Check enclosures
    if "enclosures" in entry_dict and isinstance(entry_dict["enclosures"], list):
        for enc in entry_dict["enclosures"]:
            if isinstance(enc, dict) and "href" in enc and enc.get("type", "").startswith("image/"):
                return enc["href"]

    # 4. Check summary or content for <img> tags
    for field in ["summary", "description", "content"]:
        raw_val = entry_dict.get(field)
        if isinstance(raw_val, list) and len(raw_val) > 0 and isinstance(raw_val[0], dict):
            raw_val = raw_val[0].get("value", "")
        if isinstance(raw_val, str) and "<img" in raw_val:
            try:
                soup = BeautifulSoup(raw_val, "html.parser")
                img = soup.find("img")
                if img and img.get("src"):
                    return img["src"]
            except Exception:
                pass

    return None

def extract_tags(title: str, summary: str, category: str) -> List[str]:
    """Extracts relevant searchable entity/topic tags."""
    text = f"{title} {summary}".lower()
    common_entities = [
        "ai", "artificial intelligence", "semiconductors", "climate", "clean energy",
        "federal reserve", "interest rates", "inflation", "stock market", "united nations",
        "nasa", "spacex", "quantum", "biotech", "electric vehicles", "cybersecurity",
        "european union", "middle east", "asia-pacific", "renewable", "chips", "geopolitics"
    ]
    matched = [e.title() for e in common_entities if e in text]
    if category.title() not in matched:
        matched.insert(0, category.title())
    return matched[:5]
