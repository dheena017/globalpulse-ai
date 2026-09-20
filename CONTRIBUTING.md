# Contributing to GlobalPulse AI

Thank you for your interest in contributing to **GlobalPulse AI**! We welcome contributions from developers, designers, data scientists, and journalists worldwide.

---

## 🛠️ Development Setup

1. **Fork and Clone the Repository**:
   ```bash
   git clone https://github.com/dheena017/globalpulse-ai.git
   cd globalpulse-ai
   ```

2. **Install Dependencies**:
   - Backend:
     ```bash
     cd backend
     pip install -r requirements.txt
     cd ..
     ```
   - Frontend:
     ```bash
     cd frontend
     npm install
     cd ..
     ```

3. **Start Development Environment**:
   ```bash
   npm run dev
   # or
   python run.py
   ```

---

## 🌿 Branching Strategy

- `main` / `master` — Production-ready branch.
- `feat/feature-name` — New features and enhancements.
- `fix/bug-name` — Bug fixes.
- `docs/doc-update` — Documentation updates.

---

## 🧪 Testing Before Submitting

Ensure all tests and builds pass before opening a Pull Request:
- Verify Backend:
  ```bash
  python -c "import sys; sys.path.insert(0, 'backend'); import main; print('Backend OK')"
  ```
- Verify Frontend Build:
  ```bash
  cd frontend && npm run build
  ```

---

## 📝 Code of Conduct
Please be respectful, collaborative, and constructive when reviewing code and opening issues.
