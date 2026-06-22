from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
import os

from .config import settings
from .database import Base, engine
from .routes import auth, deposits, tickets, admin

REPO_ROOT = Path(__file__).resolve().parents[2]
frontend_dir = str(REPO_ROOT / "frontend")


class NoCacheHtmlMiddleware(BaseHTTPMiddleware):
    """Stop browsers from showing an old cached index.html during local dev."""

    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        path = request.url.path
        # Cache static assets (CSS, JS, images) but not HTML files
        if path.endswith((".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico")):
            response.headers["Cache-Control"] = "public, max-age=31536000, immutable"
        elif not settings.is_production and (path == "/" or path.endswith(".html")):
            response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
            response.headers["Pragma"] = "no-cache"
        return response


@asynccontextmanager
async def lifespan(app: FastAPI):
    index = Path(frontend_dir) / "index.html"
    url = settings.public_url or f"http://127.0.0.1:{settings.PORT}/"
    print(f"\n  Lottery app running — open in your browser:\n  {url}")
    print(f"  Frontend: {frontend_dir}")
    if index.is_file():
        print(f"  Index: {index.name} ({index.stat().st_size} bytes)\n")
    else:
        print("  WARNING: frontend/index.html not found\n")
    yield


app = FastAPI(title="Lottery API", version="1.0.0", lifespan=lifespan)

app.add_middleware(NoCacheHtmlMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auto-create tables if missing (also run db/schema.sql once for admin seed + constraints)
Base.metadata.create_all(bind=engine)
upload_path = Path(settings.UPLOAD_DIR)
if not upload_path.is_absolute():
    upload_path = Path(__file__).resolve().parents[1] / upload_path
upload_path.mkdir(parents=True, exist_ok=True)

app.include_router(auth.router)
app.include_router(deposits.router)
app.include_router(tickets.router)
app.include_router(admin.router)

@app.get("/api/health")
def health():
    return {"ok": True}


# login.html, dashboard.html, css/, js/, etc. (mounted at "/" with html=True to serve index.html automatically)
if os.path.isdir(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
