from datetime import datetime, timezone
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="NovaMCP AI Platform API",
    description="Local-first API for the NovaMCP dashboard starter.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"name": "NovaMCP AI Platform", "status": "online", "docs": "/docs"}

@app.get("/api/health")
def health():
    return {"status": "healthy", "service": "novamcp-api", "timestamp": datetime.now(timezone.utc).isoformat()}

@app.get("/api/dashboard")
def dashboard():
    return {
        "metrics": [
            {"label": "Agents online", "value": "08", "change": "+2 this week"},
            {"label": "Tasks completed", "value": "1,284", "change": "+18.6%"},
            {"label": "Success rate", "value": "98.4%", "change": "+1.2%"},
            {"label": "Time saved", "value": "42.8h", "change": "This month"},
        ],
        "agents": [
            {"name": "Research Navigator", "kind": "Research", "status": "Active", "tasks": 324, "color": "violet"},
            {"name": "Code Sentinel", "kind": "Engineering", "status": "Active", "tasks": 218, "color": "blue"},
            {"name": "Workflow Pilot", "kind": "Automation", "status": "Idle", "tasks": 176, "color": "cyan"},
        ],
        "activity": [
            {"title": "Repository scan completed", "detail": "Code Sentinel · 2 minutes ago", "status": "Success"},
            {"title": "Research brief generated", "detail": "Research Navigator · 14 minutes ago", "status": "Success"},
            {"title": "Workflow waiting for approval", "detail": "Workflow Pilot · 28 minutes ago", "status": "Review"},
        ],
    }
