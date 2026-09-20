# 🌐 GlobalPulse AI — Enterprise AI World News Intelligence Platform

[![CI/CD](https://github.com/dheen/globalpulse-ai/actions/workflows/ci.yml/badge.svg)](https://github.com/dheen/globalpulse-ai/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat&logo=python)](https://python.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An enterprise-grade, security-hardened World News Intelligence Platform with a **Python (FastAPI + SQLAlchemy Async Engine)** backend and a **Next.js 14+ (React 18 + TypeScript + Tailwind CSS)** frontend across **19 dedicated pages + Global Animated Loading UI**.

---

## 🌟 Key Capabilities

- **25+ Accredited Tier-1 News Wire Ingestion**: Real-time parallel ingestion from Reuters, AP, BBC, Financial Times, Bloomberg, MIT Tech Review, Nature, CNA, and more.
- **5-Tier Defensible Fact-Checking Taxonomy**: Rigorous editorial verdict taxonomy (`VERIFIED`, `PARTIALLY_VERIFIED`, `UNVERIFIED`, `CONTRADICTED`, `INSUFFICIENT_EVIDENCE`).
- **60-Second Executive World Digest**: Daily synthesized intelligence briefing with audio readiness.
- **Multi-Anchor Radio Podcast Studio**: Structured audio scripts with chapter timestamps and voice synthesizer streaming.
- **Cross-Bureau Perspective Matrix**: Multi-dimensional media bias analysis, framing comparison, and regional blindspot detection.
- **Live Wire Terminal**: Bloomberg/Reuters style real-time chronological stream with urgent alert indicators.
- **Interactive Story Timeline**: Chronological event sequencing with milestone markers.
- **Executive Dossier Builder**: One-click intelligence export to PDF and Markdown.
- **Weekly Current Affairs IQ Quiz**: Interactive 5-question weekly news challenge.
- **Contextual Ask-AI Assistant**: Grounded Q&A chatbot for any news article.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Python 3.10+** (Python 3.11 recommended)
- **Node.js 18+** (Node v20+ recommended)
- **Git**

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/globalpulse-ai.git
cd globalpulse-ai
```

### 3. Install Dependencies
- **Frontend**:
  ```bash
  cd frontend
  npm install
  cd ..
  ```
- **Backend**:
  ```bash
  cd backend
  pip install -r requirements.txt
  cd ..
  ```

### 4. Start Development Platform (Single Command)
```bash
npm run dev
# or
python run.py
```

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Backend REST API**: [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 📁 System Directory Layout

```
├── .github/
│   ├── workflows/ci.yml              # GitHub Actions CI/CD Pipeline
│   ├── ISSUE_TEMPLATE/               # Bug Report & Feature Request templates
│   └── PULL_REQUEST_TEMPLATE.md      # PR guidelines
├── backend/                          # 📁 Python FastAPI Backend (Port 8000)
│   ├── app/
│   │   ├── config.py                 # 25+ Trusted Feeds, JWT settings, DB configs
│   │   ├── db/                       # SQLAlchemy Async persistence layer
│   │   ├── repositories/             # Data Access Objects (Articles, Users, Bookmarks)
│   │   ├── security/                 # SSRF Validator, Token-Bucket Rate Limiter, RBAC
│   │   ├── routers/                  # Granular REST Routers (/auth, /news, /search, /ai...)
│   │   ├── services/                 # AI Engines, Normalizers, Fact-Checker, Podcasts
│   │   └── utils/                    # Cache helper & text sanitizers
│   ├── main.py                       # FastAPI entry point with telemetry middleware
│   └── requirements.txt              # Backend dependencies
│
├── frontend/                         # 📁 Next.js React Frontend (Port 3000)
│   ├── src/
│   │   ├── app/                      # 19 Dedicated App Router Pages + loading.tsx
│   │   ├── components/               # Glassmorphic UI, Navigation, AI & News widgets
│   │   └── lib/                      # API Client, Auth Store, Bookmark Store
│   ├── package.json
│   └── tailwind.config.ts
│
├── run.py                            # Universal Orchestrator with telemetry streams
├── start.bat                         # Windows starter script
├── CONTRIBUTING.md                   # Contribution guidelines
├── LICENSE                           # MIT License
└── README.md                         # Project documentation
```

---

## 🛡️ Security & Reliability

- **SSRF Protection**: Blocks loopback (`127.0.0.1`, `localhost`), metadata IP (`169.254.169.254`), and private subnets.
- **Token-Bucket Rate Limiting**: Per-IP, per-user, and guest quotas with standard HTTP 429 retry headers.
- **Role-Based Access Control**: Strict Admin / User / Guest permissions.
- **Zero-Crash Resilience**: Built-in verified offline fallback datasets guarantee uninterrupted user experience.

---

## 🤝 Contributing

Contributions are welcome! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on branch management, PR standards, and local testing.

---

## 📜 License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more details.
