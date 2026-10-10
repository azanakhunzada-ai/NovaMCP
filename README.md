# NovaMCP — Futuristic AI Agent Platform

A local-first full-stack starter platform with a modern React/Vite dashboard and a FastAPI backend.
It is a polished starter/MVP, not a production-secure deployment and not a verified copy of the linked video's exact fourth recommendation.

## Features
- Futuristic dark dashboard with overview metrics, activity feed, agent cards, and quick actions
- FastAPI health and dashboard endpoints
- CORS configured for the local Vite frontend
- Simple local demo data so the UI works without API credentials
- Clear separation between frontend and backend

## Requirements
- Node.js 20+ (newer versions should usually work)
- Python 3.11+

## Run on Windows (PowerShell)

### 1. Backend
From this folder:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r backend\requirements.txt
uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

If PowerShell blocks activation, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` in that terminal, then activate again.

Backend docs: http://127.0.0.1:8000/docs

### 2. Frontend (open a second terminal)
```powershell
cd frontend
npm install
npm run dev
```

Open the URL Vite prints, normally http://localhost:5173.

## Project structure
```text
NovaMCP-AI-Platform/
  backend/
    main.py
    requirements.txt
  frontend/
    index.html
    package.json
    vite.config.js
    src/
      main.jsx
      App.jsx
      styles.css
```

## Notes
- The dashboard currently uses demo data and a live backend health check.
- No API keys or tokens are required for this starter.
- Do not paste secrets into source code or commit `.env` files.
- Add real MCP tools, authentication, persistent storage, and authorization before using it with sensitive data.
