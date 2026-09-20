"""
GlobalPulse AI - Application Configuration & Tier-1 Trusted RSS Feeds Registry
"""

import os
from pathlib import Path
from typing import List, Dict, Any
from dotenv import load_dotenv

# Load root .env if present
root_env_path = Path(__file__).resolve().parent.parent.parent / ".env"
if root_env_path.exists():
    load_dotenv(root_env_path)
else:
    load_dotenv()

# Server settings
PORT = int(os.getenv("PORT", 8000))
HOST = os.getenv("HOST", "0.0.0.0")
CACHE_TTL_SECONDS = int(os.getenv("CACHE_TTL_SECONDS", 300))  # 5 minutes TTL
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
JWT_SECRET = os.getenv("JWT_SECRET", "globalpulse-ai-secret-key-2026-prod")

# Supported Categories
CATEGORIES: List[Dict[str, Any]] = [
    {"slug": "world", "name": "World & Geopolitics", "icon": "Globe", "color": "indigo"},
    {"slug": "technology", "name": "Technology & AI", "icon": "Cpu", "color": "cyan"},
    {"slug": "business", "name": "Markets & Economy", "icon": "TrendingUp", "color": "emerald"},
    {"slug": "science", "name": "Science & Space", "icon": "Atom", "color": "purple"},
    {"slug": "climate", "name": "Climate & Energy", "icon": "Leaf", "color": "green"},
    {"slug": "politics", "name": "Policy & Governance", "icon": "Landmark", "color": "amber"},
    {"slug": "health", "name": "Health & Medicine", "icon": "HeartPulse", "color": "rose"},
    {"slug": "entertainment", "name": "Culture & Media", "icon": "Film", "color": "fuchsia"}
]

# Supported Regions
REGIONS: List[Dict[str, Any]] = [
    {"code": "americas", "name": "Americas", "flag": "🌎", "description": "North, Central & South America"},
    {"code": "europe", "name": "Europe", "flag": "🇪🇺", "description": "United Kingdom, EU & Eastern Europe"},
    {"code": "asia-pacific", "name": "Asia-Pacific", "flag": "🌏", "description": "East Asia, South Asia, ASEAN & Oceania"},
    {"code": "middle-east", "name": "Middle East", "flag": "🌍", "description": "Levant, Gulf & North Africa"},
    {"code": "africa", "name": "Africa", "flag": "🌍", "description": "Sub-Saharan Africa & Regional blocs"}
]

# Strict Tier-1 Trusted News Feeds Whitelist
TRUSTED_FEEDS: List[Dict[str, Any]] = [
    # Wire Services & Major Broadcasters (Neutral / High Factual)
    {
        "id": "bbc-world",
        "name": "BBC World News",
        "category": "world",
        "region": "europe",
        "trust_score": 98,
        "bias": "Center",
        "country": "United Kingdom",
        "url": "http://feeds.bbci.co.uk/news/world/rss.xml",
        "homepage": "https://www.bbc.com/news/world"
    },
    {
        "id": "reuters-world",
        "name": "Reuters World",
        "category": "world",
        "region": "americas",
        "trust_score": 99,
        "bias": "Center / Wire",
        "country": "International",
        "url": "https://www.reutersagency.com/feed/?taxonomy=markets&post_type=best",
        "homepage": "https://www.reuters.com"
    },
    {
        "id": "ap-top",
        "name": "Associated Press (AP News)",
        "category": "world",
        "region": "americas",
        "trust_score": 99,
        "bias": "Center / Wire",
        "country": "United States",
        "url": "https://feedx.net/rss/ap.xml",
        "homepage": "https://apnews.com"
    },
    {
        "id": "npr-world",
        "name": "NPR International",
        "category": "world",
        "region": "americas",
        "trust_score": 96,
        "bias": "Center-Left",
        "country": "United States",
        "url": "https://feeds.npr.org/1004/rss.xml",
        "homepage": "https://www.npr.org/sections/world/"
    },
    {
        "id": "aljazeera-world",
        "name": "Al Jazeera English",
        "category": "world",
        "region": "middle-east",
        "trust_score": 94,
        "bias": "International / Center",
        "country": "Qatar / Global",
        "url": "https://www.aljazeera.com/xml/rss/all.xml",
        "homepage": "https://www.aljazeera.com"
    },
    {
        "id": "dw-world",
        "name": "Deutsche Welle (DW)",
        "category": "world",
        "region": "europe",
        "trust_score": 97,
        "bias": "Center",
        "country": "Germany",
        "url": "https://rss.dw.com/rdf/rss-en-all",
        "homepage": "https://www.dw.com"
    },
    {
        "id": "guardian-world",
        "name": "The Guardian World",
        "category": "world",
        "region": "europe",
        "trust_score": 95,
        "bias": "Center-Left",
        "country": "United Kingdom",
        "url": "https://www.theguardian.com/world/rss",
        "homepage": "https://www.theguardian.com/world"
    },

    # Technology & AI
    {
        "id": "techcrunch",
        "name": "TechCrunch",
        "category": "technology",
        "region": "americas",
        "trust_score": 95,
        "bias": "Tech / Neutral",
        "country": "United States",
        "url": "https://techcrunch.com/feed/",
        "homepage": "https://techcrunch.com"
    },
    {
        "id": "verge",
        "name": "The Verge",
        "category": "technology",
        "region": "americas",
        "trust_score": 94,
        "bias": "Tech / Neutral",
        "country": "United States",
        "url": "https://www.theverge.com/rss/index.xml",
        "homepage": "https://www.theverge.com"
    },
    {
        "id": "arstechnica",
        "name": "Ars Technica",
        "category": "technology",
        "region": "americas",
        "trust_score": 96,
        "bias": "Tech / Analysis",
        "country": "United States",
        "url": "https://feeds.arstechnica.com/arstechnica/index",
        "homepage": "https://arstechnica.com"
    },
    {
        "id": "mit-tech-review",
        "name": "MIT Technology Review",
        "category": "technology",
        "region": "americas",
        "trust_score": 98,
        "bias": "Academic / Tech",
        "country": "United States",
        "url": "https://www.technologyreview.com/feed/",
        "homepage": "https://www.technologyreview.com"
    },
    {
        "id": "wired",
        "name": "Wired Science & Tech",
        "category": "technology",
        "region": "americas",
        "trust_score": 95,
        "bias": "Tech / Analysis",
        "country": "United States",
        "url": "https://www.wired.com/feed/rss",
        "homepage": "https://www.wired.com"
    },

    # Markets, Finance & Economy
    {
        "id": "cnbc-top",
        "name": "CNBC International",
        "category": "business",
        "region": "americas",
        "trust_score": 96,
        "bias": "Financial / Center",
        "country": "United States",
        "url": "https://search.cnbc.com/rs/search/view.html?partnerId=2000&keywords=world%20news&categories=exclude&partnerId=2000",
        "homepage": "https://www.cnbc.com"
    },
    {
        "id": "marketwatch",
        "name": "MarketWatch Top Stories",
        "category": "business",
        "region": "americas",
        "trust_score": 95,
        "bias": "Financial / Center",
        "country": "United States",
        "url": "https://feeds.content.dowjones.io/public/rss/mw_topstories",
        "homepage": "https://www.marketwatch.com"
    },
    {
        "id": "ft-world",
        "name": "Financial Times",
        "category": "business",
        "region": "europe",
        "trust_score": 98,
        "bias": "Financial / Center",
        "country": "United Kingdom",
        "url": "https://www.ft.com/world?format=rss",
        "homepage": "https://www.ft.com"
    },

    # Science, Space & Climate
    {
        "id": "nature-news",
        "name": "Nature Journal",
        "category": "science",
        "region": "europe",
        "trust_score": 99,
        "bias": "Scientific / Peer-Reviewed",
        "country": "International",
        "url": "https://www.nature.com/nature.rss",
        "homepage": "https://www.nature.com"
    },
    {
        "id": "nasa-breaking",
        "name": "NASA News & Space",
        "category": "science",
        "region": "americas",
        "trust_score": 99,
        "bias": "Government / Science",
        "country": "United States",
        "url": "https://www.nasa.gov/news-release/feed/",
        "homepage": "https://www.nasa.gov"
    },
    {
        "id": "sciencedaily",
        "name": "ScienceDaily",
        "category": "science",
        "region": "americas",
        "trust_score": 97,
        "bias": "Academic / Science",
        "country": "United States",
        "url": "https://www.sciencedaily.com/rss/all.xml",
        "homepage": "https://www.sciencedaily.com"
    },
    {
        "id": "inside-climate-news",
        "name": "Inside Climate News",
        "category": "climate",
        "region": "americas",
        "trust_score": 96,
        "bias": "Investigative / Climate",
        "country": "United States",
        "url": "https://insideclimatenews.org/feed/",
        "homepage": "https://insideclimatenews.org"
    },

    # Regional & International Broadcasters
    {
        "id": "france24",
        "name": "France 24 International",
        "category": "world",
        "region": "europe",
        "trust_score": 97,
        "bias": "Center",
        "country": "France",
        "url": "https://www.france24.com/en/rss",
        "homepage": "https://www.france24.com"
    },
    {
        "id": "channelnewsasia",
        "name": "CNA Asia-Pacific",
        "category": "world",
        "region": "asia-pacific",
        "trust_score": 96,
        "bias": "Center",
        "country": "Singapore",
        "url": "https://www.channelnewsasia.com/api/v1/rss-outbound-feed?_format=xml",
        "homepage": "https://www.channelnewsasia.com"
    },
    {
        "id": "allafrica",
        "name": "AllAfrica Top Headlines",
        "category": "world",
        "region": "africa",
        "trust_score": 94,
        "bias": "Regional / Pan-African",
        "country": "Africa / Regional",
        "url": "https://allafrica.com/tools/headlines/rdf/latest/headlines.rdf",
        "homepage": "https://allafrica.com"
    }
]
