"""
GlobalPulse AI - Backend Server Entry Point
High-performance asynchronous Python FastAPI server powering real-time news intelligence
with rich telemetry, formatted request logging, and operational observability.
"""

import os
import sys
import time
import datetime
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import init_db
from app.config import TRUSTED_FEEDS, CATEGORIES, REGIONS
from app.routers import (
    auth_router,
    news_router,
    search_router,
    ai_router,
    audio_router,
    dossier_router,
    quiz_router,
    system_router
)

# Ensure UTF-8 output and safety on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Terminal ANSI Styling
C_RESET = "\033[0m"
C_BOLD = "\033[1m"
C_DIM = "\033[2m"
C_CYAN = "\033[36m"
C_BRIGHT_CYAN = "\033[96m"
C_MAGENTA = "\033[35m"
C_BRIGHT_MAGENTA = "\033[95m"
C_GREEN = "\033[32m"
C_BRIGHT_GREEN = "\033[92m"
C_YELLOW = "\033[33m"
C_BRIGHT_YELLOW = "\033[93m"
C_RED = "\033[31m"
C_BRIGHT_RED = "\033[91m"
C_WHITE = "\033[97m"

def safe_print(text: str):
    """Safely prints text on any Windows or Unix terminal regardless of encoding."""
    try:
        print(text, flush=True)
    except UnicodeEncodeError:
        print(text.encode("ascii", errors="replace").decode("ascii"), flush=True)

def log_event(level: str, tag: str, message: str, color: str = C_CYAN):
    ts = datetime.datetime.now().strftime("%I:%M:%S %p")
    safe_print(f"{C_DIM}[{ts}]{C_RESET} {color}{C_BOLD}[{tag}]{C_RESET} {message}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables asynchronously on startup
    log_event("INFO", "DB_INIT", "Initializing persistence layer (Async SQLite/PostgreSQL)...", C_BRIGHT_CYAN)
    try:
        await init_db()
        log_event("INFO", "DB_INIT", f"{C_BRIGHT_GREEN}[OK] Database tables & models synchronized successfully.{C_RESET}", C_BRIGHT_GREEN)
    except Exception as e:
        log_event("ERROR", "DB_INIT", f"{C_BRIGHT_RED}[FAIL] Database initialization error: {e}{C_RESET}", C_BRIGHT_RED)

    # Telemetry report
    log_event("INFO", "REGISTRY", f"{C_WHITE}Loaded {C_BRIGHT_YELLOW}{len(TRUSTED_FEEDS)}{C_WHITE} Tier-1 Trusted RSS Feeds across {C_BRIGHT_CYAN}{len(CATEGORIES)}{C_WHITE} categories & {C_BRIGHT_MAGENTA}{len(REGIONS)}{C_WHITE} global regions.{C_RESET}", C_BRIGHT_CYAN)
    log_event("INFO", "ROUTERS", f"{C_WHITE}Mounted {C_BRIGHT_GREEN}8 Granular REST API Routers{C_WHITE} under prefix {C_CYAN}/api/v1/*{C_RESET}", C_BRIGHT_GREEN)
    log_event("INFO", "SECURITY", f"{C_WHITE}SSRF Validator & Token-Bucket Rate Limiter active on sensitive AI & ingestion endpoints.{C_RESET}", C_BRIGHT_YELLOW)
    
    yield
    log_event("INFO", "SHUTDOWN", "Shutting down database connections & worker threads...", C_BRIGHT_YELLOW)

app = FastAPI(
    title="GlobalPulse AI - World News Intelligence API",
    description="Enterprise-grade REST API aggregating 25+ Tier-1 Trusted Global News Publishers with real-time AI Summaries, Fact-Checking, Bias Analysis, and Multi-Anchor Audio Briefings.",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Explicit CORS policy
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

def humanize_action(method: str, path: str, query: str) -> str:
    """Translates raw API routes into intuitive human-readable explanations."""
    p = path.lower()
    if "/api/v1/news/breaking-news" in p:
        return "🚨 Fetching Breaking News Alerts"
    elif "/api/v1/news/top-headlines" in p:
        return "🌟 Loading Spotlight Top Headlines"
    elif "/api/v1/news/live-wire" in p:
        return "⚡ Streaming Real-Time Wire Feed"
    elif "/api/v1/news/all-categories" in p:
        return "📂 Retrieving News Category Index"
    elif "/api/v1/news/all-sources" in p:
        return "📡 Checking 25+ Accredited Publisher Sources"
    elif "/api/v1/news/world-regions" in p:
        return "🌍 Loading Continental Mood & Regional Map"
    elif "/api/v1/news/article/" in p:
        return "📄 Reading Full Article Details & Citations"
    elif "/api/v1/news" in p:
        category = query.split("category=")[-1].split("&")[0] if "category=" in query else "All"
        return f"📰 Browsing News Feed (Category: {category.title()})"
    elif "/api/v1/ai/daily-world-briefing" in p:
        return "🤖 AI Generating 60-Second Daily World Executive Digest"
    elif "/api/v1/ai/generate-summary" in p:
        return "🧠 AI Synthesizing 3-Bullet Summary & Executive Takeaway"
    elif "/api/v1/ai/fact-check-score" in p:
        return "🔍 AI Fact-Checking Claims (5-Tier Defensible Taxonomy)"
    elif "/api/v1/ai/analyze-bias" in p:
        return "⚖️ AI Evaluating Framing & Media Bias Score"
    elif "/api/v1/ai/compare-sources" in p:
        return "🌐 AI Generating Multi-Source Perspective Matrix"
    elif "/api/v1/ai/blindspot-radar" in p:
        return "🛰️ AI Scanning Regional Coverage Blindspots"
    elif "/api/v1/ai/story-timeline" in p:
        return "⏳ AI Constructing Chronological Event Timeline"
    elif "/api/v1/ai/ask-question" in p:
        return "💬 AI Answering User Question with Grounded Wire Context"
    elif "/api/v1/audio/daily-podcast-script" in p:
        return "🎙️ AI Synthesizing Multi-Anchor Radio Podcast Script"
    elif "/api/v1/audio/stream/" in p:
        return "🔊 Streaming Voice Audio Synthesis Segment"
    elif "/api/v1/search/semantic" in p:
        return "🧠 Semantic Question Matching Search"
    elif "/api/v1/search/suggestions" in p:
        return "💡 Fetching Search Auto-Suggestions"
    elif "/api/v1/search" in p:
        return f"🔎 Searching News Articles"
    elif "/api/v1/quiz" in p:
        return "🎯 Loading Weekly Current Affairs IQ Challenge"
    elif "/api/v1/dossier" in p:
        return "📑 Generating Executive Intelligence Dossier (PDF/MD)"
    elif "/api/v1/system/health-check" in p:
        return "🩺 System Health & Connectivity Check"
    elif "/api/v1/auth" in p:
        return "🔐 User Authentication & Session Verification"
    elif "/docs" in p or "/openapi.json" in p:
        return "📚 Interactive Swagger API Documentation"
    return f"{method} {path}"

# Custom Human-Friendly Request Telemetry Middleware
@app.middleware("http")
async def telemetry_logging_middleware(request: Request, call_next):
    start_time = time.perf_counter()
    method = request.method
    path = request.url.path
    query = request.url.query
    client_host = request.client.host if request.client else "localhost"

    human_description = humanize_action(method, path, query)

    try:
        response: Response = await call_next(request)
        duration_ms = (time.perf_counter() - start_time) * 1000
        status_code = response.status_code

        # Latency coloring
        if duration_ms < 50:
            timing = f"{C_BRIGHT_GREEN}{duration_ms:4.1f}ms{C_RESET}"
        elif duration_ms < 250:
            timing = f"{C_BRIGHT_YELLOW}{duration_ms:4.1f}ms{C_RESET}"
        else:
            timing = f"{C_BRIGHT_RED}{duration_ms:4.1f}ms{C_RESET}"

        # Status badge
        if 200 <= status_code < 300:
            status = f"{C_BRIGHT_GREEN}{status_code} OK{C_RESET}"
        elif 300 <= status_code < 400:
            status = f"{C_BRIGHT_CYAN}{status_code}{C_RESET}"
        elif 400 <= status_code < 500:
            status = f"{C_BRIGHT_YELLOW}{status_code} WARN{C_RESET}"
        else:
            status = f"{C_BRIGHT_RED}{status_code} FAIL{C_RESET}"

        ts = datetime.datetime.now().strftime("%I:%M:%S %p")
        safe_print(f"{C_DIM}[{ts}]{C_RESET} {C_BRIGHT_CYAN}[USER ACTION]{C_RESET} {C_WHITE}{human_description:<56}{C_RESET} -> {status} \033[2m({timing})\033[0m")

        return response
    except Exception as exc:
        duration_ms = (time.perf_counter() - start_time) * 1000
        ts = datetime.datetime.now().strftime("%I:%M:%S %p")
        safe_print(f"{C_DIM}[{ts}]{C_RESET} {C_BRIGHT_RED}[ERROR]{C_RESET} {C_WHITE}{human_description}{C_RESET} -> {C_BRIGHT_RED}500 ERROR ({duration_ms:4.1f}ms): {exc}{C_RESET}")
        raise exc

# Mount all granular API routers under /api/v1 prefix
app.include_router(auth_router.router, prefix="/api/v1")
app.include_router(news_router.router, prefix="/api/v1")
app.include_router(search_router.router, prefix="/api/v1")
app.include_router(ai_router.router, prefix="/api/v1")
app.include_router(audio_router.router, prefix="/api/v1")
app.include_router(dossier_router.router, prefix="/api/v1")
app.include_router(quiz_router.router, prefix="/api/v1")
app.include_router(system_router.router, prefix="/api/v1")

@app.get("/", summary="Root Health Check")
async def root():
    return {
        "message": "Welcome to GlobalPulse AI Enterprise API",
        "version": "2.0.0",
        "docs": "/docs",
        "status": "online",
        "persistence": "SQLAlchemy Async",
        "endpoints": {
            "news": "/api/v1/news",
            "search": "/api/v1/search",
            "breaking": "/api/v1/news/breaking-news",
            "ai_summary": "/api/v1/ai/generate-summary",
            "fact_check": "/api/v1/ai/fact-check-score",
            "audio": "/api/v1/audio/daily-podcast-script",
            "auth": "/api/v1/auth/google",
            "system": "/api/v1/system/health-check"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

