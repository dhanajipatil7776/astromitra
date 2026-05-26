"""
Backend tests for AstroMitra API.
Covers:
- /api/health
- /api/reading (valid, validation, all focus areas)
- /api/contact (valid + invalid email)
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://astromitra-preview.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"

# Long timeout to accommodate slow LLM (gpt-5.2 takes 20-40s)
LLM_TIMEOUT = 120


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --------- Health ---------
class TestHealth:
    def test_health_ok(self, session):
        r = session.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"
        assert data.get("llm_configured") is True

    def test_root(self, session):
        r = session.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "AstroMitra" in data.get("message", "")


# --------- Reading endpoint validation ---------
class TestReadingValidation:
    def test_missing_name_returns_422(self, session):
        payload = {
            "date_of_birth": "1995-08-15",
            "place_of_birth": "Mumbai, India",
            "focus_area": "career",
        }
        r = session.post(f"{API}/reading", json=payload, timeout=15)
        assert r.status_code == 422

    def test_missing_dob_returns_422(self, session):
        payload = {
            "name": "Test User",
            "place_of_birth": "Mumbai, India",
            "focus_area": "career",
        }
        r = session.post(f"{API}/reading", json=payload, timeout=15)
        assert r.status_code == 422

    def test_missing_place_returns_422(self, session):
        payload = {
            "name": "Test User",
            "date_of_birth": "1995-08-15",
            "focus_area": "career",
        }
        r = session.post(f"{API}/reading", json=payload, timeout=15)
        assert r.status_code == 422

    def test_empty_name_returns_422(self, session):
        payload = {
            "name": "",
            "date_of_birth": "1995-08-15",
            "place_of_birth": "Mumbai, India",
            "focus_area": "career",
        }
        r = session.post(f"{API}/reading", json=payload, timeout=15)
        assert r.status_code == 422


# --------- Reading endpoint happy path ---------
class TestReadingGeneration:
    def _validate_reading(self, data, expected_name, expected_focus):
        # structure
        for k in ["id", "name", "focus_area", "overview", "career", "love",
                  "finance", "health", "remedies", "lucky", "created_at"]:
            assert k in data, f"Missing key '{k}' in reading response"
        assert data["name"] == expected_name
        assert data["focus_area"] == expected_focus
        # textual sections non-empty
        assert isinstance(data["overview"], str) and len(data["overview"]) > 10
        assert isinstance(data["career"], str) and len(data["career"]) > 5
        assert isinstance(data["love"], str) and len(data["love"]) > 5
        assert isinstance(data["finance"], str) and len(data["finance"]) > 5
        assert isinstance(data["health"], str) and len(data["health"]) > 5
        # remedies is a list
        assert isinstance(data["remedies"], list)
        assert len(data["remedies"]) >= 1
        # lucky is dict with expected keys
        assert isinstance(data["lucky"], dict)
        # sun_sign computed for 1995-08-15 should be Leo
        # (only check when dob is provided)

    def test_reading_career_valid(self, session):
        payload = {
            "name": "Test User",
            "date_of_birth": "1995-08-15",
            "time_of_birth": "06:30",
            "place_of_birth": "Mumbai, India",
            "focus_area": "career",
        }
        r = session.post(f"{API}/reading", json=payload, timeout=LLM_TIMEOUT)
        assert r.status_code == 200, f"Unexpected status: {r.status_code} body={r.text[:300]}"
        data = r.json()
        self._validate_reading(data, "Test User", "career")
        # Aug 15 -> Leo
        assert data.get("sun_sign") == "Leo", f"Expected Leo got {data.get('sun_sign')}"

    @pytest.mark.parametrize("focus", ["love", "marriage", "finance", "life_direction"])
    def test_reading_each_focus_area(self, session, focus):
        payload = {
            "name": "Test User",
            "date_of_birth": "1990-04-10",
            "time_of_birth": "12:00",
            "place_of_birth": "Delhi, India",
            "focus_area": focus,
        }
        r = session.post(f"{API}/reading", json=payload, timeout=LLM_TIMEOUT)
        assert r.status_code == 200, f"focus={focus} status={r.status_code} body={r.text[:300]}"
        data = r.json()
        self._validate_reading(data, "Test User", focus)


# --------- Contact endpoint ---------
class TestContact:
    def test_contact_valid_email(self, session):
        payload = {"email": "TEST_user@example.com", "name": "TEST User", "message": "hello"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("ok") is True
        assert "id" in data

    def test_contact_invalid_email(self, session):
        payload = {"email": "not-an-email", "name": "TEST"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 400

    def test_contact_missing_email(self, session):
        payload = {"name": "TEST"}
        r = session.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 400
