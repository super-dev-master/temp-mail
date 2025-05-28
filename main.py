from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from email_utils import generate_unique_email, get_inbox_from_redis, validate_email_address, email_exists
import uvicorn
import os

app = FastAPI()

# Enable CORS so React frontend can access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

dist_path = os.path.join(os.path.dirname(__file__), "frontend/dist")
assets_path = os.path.join(dist_path, "assets")

# ✅ Serve static assets
app.mount("/assets", StaticFiles(directory=assets_path), name="assets")

# ✅ Serve React app at /
@app.get("/")
async def serve_root():
    return FileResponse(os.path.join(dist_path, "index.html"))

@app.get("/generate-email")
async def generate_email():
    try:
        email = generate_unique_email()
        return {"email": email, "expires_in": 3600}
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/inbox/{email}")
async def get_inbox(email: str, limit: int = Query(20, ge=1, le=50)):
    email_normalized = validate_email_address(email)
    if not email_normalized:
        raise HTTPException(status_code=400, detail="Invalid email format")

    if not email_exists(email_normalized):
        raise HTTPException(status_code=404, detail="Email not found or expired")

    messages = get_inbox_from_redis(email_normalized, limit=limit)

    return {"email": email_normalized, "messages": messages}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
