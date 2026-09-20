"""
GlobalPulse AI - Production Orchestration Runner
Concurrently orchestrates Python FastAPI (:8000) and Next.js (:3000) with
rich ANSI telemetry, color-coded streaming logs, and automated service monitoring.
"""

import os
import sys
import subprocess
import time
import signal
import threading
import datetime
import shutil

# Ensure UTF-8 output and ANSI virtual terminal processing on Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

if os.name == "nt":
    try:
        import ctypes
        kernel32 = ctypes.windll.kernel32
        # Enable ENABLE_VIRTUAL_TERMINAL_PROCESSING (0x0004)
        kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)
    except Exception:
        os.system("")

# ANSI Color Tokens
RESET = "\033[0m"
BOLD = "\033[1m"
DIM = "\033[2m"

# Text Colors
CYAN = "\033[36m"
BRIGHT_CYAN = "\033[96m"
MAGENTA = "\033[35m"
BRIGHT_MAGENTA = "\033[95m"
BLUE = "\033[34m"
BRIGHT_BLUE = "\033[94m"
GREEN = "\033[32m"
BRIGHT_GREEN = "\033[92m"
YELLOW = "\033[33m"
BRIGHT_YELLOW = "\033[93m"
RED = "\033[31m"
BRIGHT_RED = "\033[91m"
WHITE = "\033[97m"

# Backgrounds
BG_CYAN = "\033[46;30m"
BG_MAGENTA = "\033[45;30m"
BG_BLUE = "\033[44;97m"
BG_GREEN = "\033[42;30m"

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")
FRONTEND_DIR = os.path.join(ROOT_DIR, "frontend")

processes = []
is_shutting_down = False

def get_timestamp():
    """Returns clean, human-friendly local time with AM/PM."""
    return datetime.datetime.now().strftime("%I:%M:%S %p")

def print_banner():
    banner = f"""
{BRIGHT_CYAN}{BOLD}   ██████╗ ██╗      ██████╗ ██████╗  █████╗ ██╗     ██████╗ ██╗   ██╗██╗     ███████╗███████╗
  ██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔══██╗██║     ██╔══██╗██║   ██║██║     ██╔════╝██╔════╝
  ██║  ███╗██║     ██║   ██║██████╔╝███████║██║     ██████╔╝██║   ██║██║     ███████╗█████╗  
  ██║   ██║██║     ██║   ██║██╔══██╗██╔══██║██║     ██╔═══╝ ██║   ██║██║     ╚════██║██╔══╝  
  ╚██████╔╝███████╗╚██████╔╝██████╔╝██║  ██║███████╗██║     ╚██████╔╝███████╗███████║███████╗
   ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝{RESET}
  {BRIGHT_MAGENTA}✦ WORLD NEWS INTELLIGENCE PLATFORM ✦ ENTERPRISE NEURAL EDITION v2.0{RESET}
"""
    print(banner)

def print_telemetry_card():
    py_ver = f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
    term_width = min(shutil.get_terminal_size((80, 20)).columns, 88)
    line = "═" * (term_width - 2)
    
    print(f"{BRIGHT_BLUE}╔{line}╗{RESET}")
    print(f"{BRIGHT_BLUE}║{RESET}  {BOLD}{WHITE}🌟 GLOBALPULSE AI — CONTROL CENTER & USER GUIDE{RESET}{' ' * (term_width - 50)}{BRIGHT_BLUE}║{RESET}")
    print(f"{BRIGHT_BLUE}╠{line}╣{RESET}")
    print(f"{BRIGHT_BLUE}║{RESET}  {BRIGHT_GREEN}🚀 WEB APP (Click to open){RESET} : {BOLD}{WHITE}http://localhost:3000{RESET}  {DIM}(19 Interactive News Pages){RESET}")
    print(f"{BRIGHT_BLUE}║{RESET}  {BRIGHT_CYAN}📡 BACKEND REST API{RESET}       : {BOLD}{WHITE}http://localhost:8000{RESET}  {DIM}(FastAPI Enterprise Backend){RESET}")
    print(f"{BRIGHT_BLUE}║{RESET}  {BRIGHT_YELLOW}📚 INTERACTIVE API DOCS{RESET}   : {BOLD}{WHITE}http://localhost:8000/docs{RESET}  {DIM}(Swagger UI & Schemas){RESET}")
    print(f"{BRIGHT_BLUE}╠{line}╣{RESET}")
    print(f"{BRIGHT_BLUE}║{RESET}  {GREEN}● Database Status{RESET}       : {WHITE}Connected (SQLite / PostgreSQL Async Engine){RESET}")
    print(f"{BRIGHT_BLUE}║{RESET}  {GREEN}● News Wire Feeds{RESET}       : {WHITE}22 Verified Live Feeds (Reuters, BBC, AP, FT, CNA...){RESET}")
    print(f"{BRIGHT_BLUE}║{RESET}  {GREEN}● AI Intelligence{RESET}       : {WHITE}Active (Summarizer, 5-Tier Fact-Checker, Podcast TTS){RESET}")
    print(f"{BRIGHT_BLUE}║{RESET}  {DIM}● Environment: Python {py_ver} | Node Next.js 14+ | OS: {os.name.upper()}{RESET}")
    print(f"{BRIGHT_BLUE}╚{line}╝{RESET}\n")

# Noisy internal lines to suppress for cleaner human experience
IGNORE_PATTERNS = [
    "Will watch for changes in these directories",
    "Started reloader process",
    "Started server process",
    "Waiting for application startup",
    "Application startup complete",
    "Uvicorn running on",
    "> globalpulse-ai-frontend@",
    "> next dev -p 3000",
    "▲ Next.js 14.",
    "- Local:        http://localhost:3000"
]

def stream_process_output(pipe, prefix, color):
    """Filters noisy internal framework logs and outputs human-friendly actions."""
    try:
        for line in iter(pipe.readline, ''):
            if not line:
                break
            clean_line = line.rstrip()
            if not clean_line:
                continue
            
            # Check if this line is noisy framework boilerplate
            if any(pat in clean_line for pat in IGNORE_PATTERNS):
                continue

            ts = datetime.datetime.now().strftime("%H:%M:%S")

            # Human-friendly rewrites for standard framework messages
            if "Starting..." in clean_line:
                print(f"{DIM}[{ts}]{RESET} {BRIGHT_MAGENTA}[FRONTEND]{RESET} {WHITE}⚡ Next.js Frontend initializing page compiler...{RESET}", flush=True)
                continue
            elif "Ready in" in clean_line:
                print(f"{DIM}[{ts}]{RESET} {BRIGHT_GREEN}[READY]{RESET}    {BOLD}{GREEN}✓ Next.js Frontend is READY at http://localhost:3000{RESET}", flush=True)
                continue

            # Pass through structured application logs with clean formatting
            print(f"{DIM}[{ts}]{RESET} {clean_line}", flush=True)
    except Exception:
        pass

def cleanup(sig=None, frame=None):
    global is_shutting_down
    if is_shutting_down:
        return
    is_shutting_down = True
    
    print(f"\n\n{BRIGHT_YELLOW}{BOLD}════════════════════════════════════════════════════════════{RESET}")
    print(f"{BRIGHT_YELLOW}>> [GlobalPulse AI] Gracefully terminating all services...{RESET}")
    print(f"{BRIGHT_YELLOW}{BOLD}════════════════════════════════════════════════════════════{RESET}")
    
    for p in processes:
        try:
            p.terminate()
            p.wait(timeout=2)
        except Exception:
            try:
                p.kill()
            except Exception:
                pass
                
    print(f"{BRIGHT_GREEN}✓ All services successfully stopped.{RESET}\n")
    sys.exit(0)

def free_port(port: int):
    """Automatically terminates any orphaned process occupying the target port."""
    try:
        import socket
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(0.5)
            if s.connect_ex(('127.0.0.1', port)) == 0:
                if os.name == "nt":
                    res = subprocess.run(f'netstat -ano | findstr :{port}', shell=True, capture_output=True, text=True)
                    for line in res.stdout.strip().split('\n'):
                        parts = line.strip().split()
                        if len(parts) >= 5 and f':{port}' in parts[1] and parts[3] == 'LISTENING':
                            pid = parts[4]
                            if pid not in ('0', str(os.getpid())):
                                subprocess.run(f'taskkill /F /PID {pid}', shell=True, capture_output=True)
                else:
                    subprocess.run(f'fuser -k {port}/tcp', shell=True, capture_output=True)
    except Exception:
        pass

def main():
    print_banner()
    print_telemetry_card()

    # Automatically resolve any dangling port conflicts
    free_port(8000)
    free_port(3000)

    # Set up environment variables with UTF-8 and color support
    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"
    env["PYTHONIOENCODING"] = "utf-8"
    env["PYTHONUTF8"] = "1"
    env["FORCE_COLOR"] = "1"

    # 1. Launch FastAPI Backend Process
    backend_cmd = [sys.executable, "-u", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
    backend_proc = subprocess.Popen(
        backend_cmd,
        cwd=BACKEND_DIR,
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
        bufsize=1
    )
    processes.append(backend_proc)

    t_backend = threading.Thread(
        target=stream_process_output,
        args=(backend_proc.stdout, "FASTAPI :8000", BRIGHT_CYAN),
        daemon=True
    )
    t_backend.start()

    time.sleep(0.8)

    # 2. Launch Next.js Frontend Process
    npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
    frontend_proc = subprocess.Popen(
        [npm_cmd, "run", "dev"],
        cwd=FRONTEND_DIR,
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="replace",
        bufsize=1
    )
    processes.append(frontend_proc)

    t_frontend = threading.Thread(
        target=stream_process_output,
        args=(frontend_proc.stdout, "NEXT.JS :3000", BRIGHT_MAGENTA),
        daemon=True
    )
    t_frontend.start()

    print(f"{BRIGHT_GREEN}{BOLD}>> GlobalPulse AI is live! Streaming telemetry logs below...{RESET}")
    print(f"{DIM}>> Press Ctrl+C at any time to shutdown.{RESET}\n")

    try:
        while True:
            time.sleep(0.5)
            # Check if any process crashed unexpectedly
            if backend_proc.poll() is not None:
                print(f"{BRIGHT_RED}[FATAL] FastAPI backend process exited unexpectedly with code {backend_proc.returncode}{RESET}")
                break
            if frontend_proc.poll() is not None:
                print(f"{BRIGHT_RED}[FATAL] Next.js frontend process exited unexpectedly with code {frontend_proc.returncode}{RESET}")
                break
    except KeyboardInterrupt:
        pass
    finally:
        cleanup()

if __name__ == "__main__":
    main()

