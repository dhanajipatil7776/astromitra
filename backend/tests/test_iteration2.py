"""
Iteration 2 backend tests for AstroMitra new endpoints:
- GET /api/reading/{id}  (share / fetch by id)
- POST /api/whatsapp/subscribe
- POST /api/notify
"""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://astromitra-preview.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --------- GET /api/reading/{id} ---------
class TestGetReadingById:
    def test_seeded_demo_reading(self, session):
        r = session.get(f"{API}/reading/demo-reading-001", timeout=15)
        assert r.status_code == 200, f"status={r.status_code} body={r.text[:300]}"
        data = r.json()
        assert data.get("id") == "demo-reading-001"
        assert data.get("name") == "Ananya"
        assert data.get("sun_sign") == "Pisces"
        # all required textual sections present
        for k in ["overview", "career", "love", "finance", "health", "remedies", "lucky"]:
            assert k in data, f"missing {k}"
        assert isinstance(data["remedies"], list) and len(data["remedies"]) >= 1
        assert isinstance(data["lucky"], dict)

    def test_nonexistent_returns_404(self, session):
        r = session.get(f"{API}/reading/nonexistent-xyz", timeout=15)
        assert r.status_code == 404


# --------- POST /api/whatsapp/subscribe ---------
class TestWhatsAppSubscribe:
    def test_valid_subscribe(self, session):
        payload = {"name": "TEST Ananya", "phone": "9876543210"}
        r = session.post(f"{API}/whatsapp/subscribe", json=payload, timeout=15)
        assert r.status_code == 200, f"status={r.status_code} body={r.text[:300]}"
        data = r.json()
        assert data.get("ok") is True
        assert "TEST Ananya" in data.get("message", "") or "Namaste" in data.get("message", "")

    def test_idempotent_upsert(self, session):
        payload = {"name": "TEST Ananya2", "phone": "9876543210"}
        # second call with same phone, different name => should still succeed
        r1 = session.post(f"{API}/whatsapp/subscribe", json=payload, timeout=15)
        assert r1.status_code == 200
        r2 = session.post(f"{API}/whatsapp/subscribe", json=payload, timeout=15)
        assert r2.status_code == 200
        assert r2.json().get("ok") is True

    def test_short_phone_rejected(self, session):
        # Pydantic min_length=8 should return 422 (or 400 if digit check inside)
        payload = {"name": "TEST X", "phone": "12345"}
        r = session.post(f"{API}/whatsapp/subscribe", json=payload, timeout=15)
        assert r.status_code in (400, 422), f"got {r.status_code}: {r.text[:200]}"

    def test_8plus_chars_but_few_digits_rejected(self, session):
        # phone passes Pydantic min_length=8 but digit count < 8 -> 400
        payload = {"name": "TEST X", "phone": "abcd-1234"}  # 4 digits
        r = session.post(f"{API}/whatsapp/subscribe", json=payload, timeout=15)
        assert r.status_code in (400, 422)

    def test_missing_name(self, session):
        payload = {"phone": "9876543210"}
        r = session.post(f"{API}/whatsapp/subscribe", json=payload, timeout=15)
        assert r.status_code == 422


# --------- POST /api/notify ---------
class TestNotify:
    def test_valid_email(self, session):
        payload = {"email": "TEST_notify@example.com", "product": "kundali_deep_dive"}
        r = session.post(f"{API}/notify", json=payload, timeout=15)
        assert r.status_code == 200, f"status={r.status_code} body={r.text[:300]}"
        data = r.json()
        assert data.get("ok") is True
        assert "list" in data.get("message", "").lower() or "live" in data.get("message", "").lower()

    def test_invalid_email(self, session):
        payload = {"email": "not-an-email"}
        r = session.post(f"{API}/notify", json=payload, timeout=15)
        assert r.status_code == 400

    def test_idempotent_same_email_product(self, session):
        payload = {"email": "TEST_idem@example.com", "product": "kundali_deep_dive"}
        r1 = session.post(f"{API}/notify", json=payload, timeout=15)
        r2 = session.post(f"{API}/notify", json=payload, timeout=15)
        assert r1.status_code == 200 and r2.status_code == 200
        assert r2.json().get("ok") is True

    def test_default_product(self, session):
        payload = {"email": "TEST_default_product@example.com"}
        r = session.post(f"{API}/notify", json=payload, timeout=15)
        assert r.status_code == 200
        assert r.json().get("ok") is True
