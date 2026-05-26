from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

app = FastAPI(title="AstroMitra API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# --------- Models ---------
class ReadingRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    name: str = Field(..., min_length=1, max_length=80)
    date_of_birth: str = Field(..., description="YYYY-MM-DD")
    time_of_birth: Optional[str] = Field(default="", description="HH:MM (24h) or empty")
    place_of_birth: str = Field(..., min_length=1, max_length=120)
    focus_area: str = Field(..., description="career | love | marriage | finance | life_direction")
    question: Optional[str] = Field(default="", max_length=400)


class ReadingResponse(BaseModel):
    id: str
    name: str
    focus_area: str
    sun_sign: Optional[str] = None
    overview: str
    career: str
    love: str
    finance: str
    health: str
    remedies: List[str]
    lucky: dict
    created_at: str


# --------- Helpers ---------
ZODIAC = [
    ("Capricorn", (12, 22), (1, 19)),
    ("Aquarius", (1, 20), (2, 18)),
    ("Pisces", (2, 19), (3, 20)),
    ("Aries", (3, 21), (4, 19)),
    ("Taurus", (4, 20), (5, 20)),
    ("Gemini", (5, 21), (6, 20)),
    ("Cancer", (6, 21), (7, 22)),
    ("Leo", (7, 23), (8, 22)),
    ("Virgo", (8, 23), (9, 22)),
    ("Libra", (9, 23), (10, 22)),
    ("Scorpio", (10, 23), (11, 21)),
    ("Sagittarius", (11, 22), (12, 21)),
]


def compute_sun_sign(dob: str) -> Optional[str]:
    try:
        d = datetime.strptime(dob, "%Y-%m-%d")
        m, day = d.month, d.day
        for name, start, end in ZODIAC:
            sm, sd = start
            em, ed = end
            if sm == em:
                if m == sm and sd <= day <= ed:
                    return name
            else:
                if (m == sm and day >= sd) or (m == em and day <= ed):
                    return name
        return None
    except Exception:
        return None


def build_system_prompt() -> str:
    return (
        "You are AstroMitra, a futuristic AI astrologer that blends ancient Vedic Jyotisha "
        "wisdom with modern psychological insight. You speak with warmth, clarity, and quiet authority — "
        "like a trusted spiritual mentor. Tone: premium, calm, optimistic, never fearful. "
        "Use English with a sprinkle of Sanskrit / Hindi accents (e.g., 'Namaste', 'dharma', 'karma', 'graha', 'nakshatra') "
        "where natural, but keep it accessible. Do NOT include disclaimers about being an AI. "
        "Do NOT predict death, illness severity, or financial doom. "
        "Always return a valid JSON object only — no markdown, no preface, no code fences. "
        "Be specific, personal, and emotionally resonant."
    )


def build_user_prompt(req: ReadingRequest, sun_sign: Optional[str]) -> str:
    return f"""Generate a deeply personalized astrology reading for the seeker below.

Seeker Profile:
- Name: {req.name}
- Date of Birth: {req.date_of_birth}
- Time of Birth: {req.time_of_birth or 'unknown'}
- Place of Birth: {req.place_of_birth}
- Inferred Sun Sign: {sun_sign or 'unknown'}
- Primary Focus: {req.focus_area}
- Seeker's Question: {req.question or 'general guidance'}

Return ONLY a JSON object with this exact schema:
{{
  "overview": "3-4 sentence cosmic snapshot — who they are right now energetically, addressed to {req.name} directly. Reference their sun sign and one current planetary theme.",
  "career": "3-4 sentences. Concrete career insight. Mention a strength, a blind spot, and an actionable next 30-day step.",
  "love": "3-4 sentences. Relationship / love energy. Include compatibility hint and one emotional growth area.",
  "finance": "3-4 sentences. Wealth flow, money patterns, and one practical financial mindset shift.",
  "health": "2-3 sentences. Energy / wellness theme — purely positive and lifestyle-oriented.",
  "remedies": ["5 short, elegant Vedic remedies — each one a single sentence, actionable, modern-friendly (e.g., 'Light a ghee diya at dusk on Thursdays to invite Jupiter's grace.')"],
  "lucky": {{
    "color": "one color",
    "number": "one number 1-9 as string",
    "day": "one day of the week",
    "gemstone": "one gemstone",
    "mantra": "one short Sanskrit mantra with English meaning in parentheses"
  }}
}}

Make the {req.focus_area} section the richest and most specific. Sound like you truly see {req.name}."""


# --------- Routes ---------
@api_router.get("/")
async def root():
    return {"message": "AstroMitra API live", "version": "1.0"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "llm_configured": bool(EMERGENT_LLM_KEY)}


@api_router.post("/reading", response_model=ReadingResponse)
async def generate_reading(req: ReadingRequest):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key not configured")

    sun_sign = compute_sun_sign(req.date_of_birth)
    session_id = f"reading-{uuid.uuid4()}"

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=build_system_prompt(),
        ).with_model("openai", "gpt-5.2")

        msg = UserMessage(text=build_user_prompt(req, sun_sign))
        raw = await chat.send_message(msg)
    except Exception as e:
        logger.exception("LLM error")
        raise HTTPException(status_code=502, detail=f"Astro engine unavailable: {str(e)[:120]}")

    # Parse JSON from response (strip code fences if present)
    import json, re
    text = raw.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)

    try:
        data = json.loads(text)
    except Exception:
        # Try to extract first JSON object
        m = re.search(r"\{[\s\S]*\}", text)
        if not m:
            raise HTTPException(status_code=502, detail="Could not parse reading. Try again.")
        try:
            data = json.loads(m.group(0))
        except Exception:
            raise HTTPException(status_code=502, detail="Malformed reading. Try again.")

    reading_id = str(uuid.uuid4())
    now_iso = datetime.now(timezone.utc).isoformat()

    response = ReadingResponse(
        id=reading_id,
        name=req.name,
        focus_area=req.focus_area,
        sun_sign=sun_sign,
        overview=data.get("overview", ""),
        career=data.get("career", ""),
        love=data.get("love", ""),
        finance=data.get("finance", ""),
        health=data.get("health", ""),
        remedies=data.get("remedies", []) or [],
        lucky=data.get("lucky", {}) or {},
        created_at=now_iso,
    )

    # Persist
    try:
        doc = response.model_dump()
        doc["request"] = req.model_dump()
        await db.readings.insert_one(doc)
    except Exception:
        logger.exception("Failed to persist reading (non-fatal)")

    return response


@api_router.post("/contact")
async def contact(payload: dict):
    """Capture lead / contact form submissions."""
    email = (payload or {}).get("email", "").strip()
    if not email or "@" not in email:
        raise HTTPException(status_code=400, detail="Valid email required")
    doc = {
        "id": str(uuid.uuid4()),
        "email": email,
        "name": payload.get("name", ""),
        "message": payload.get("message", ""),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.leads.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
