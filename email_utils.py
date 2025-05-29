import random
import string
import time
import json
import redis
import uuid
from email_validator import validate_email, EmailNotValidError

r = redis.Redis(host='localhost', port=6379, decode_responses=True)


EMAIL_TTL = 3600  # 1 hour expiration
MAX_INBOX_SIZE = 50

def load_domains(file_path="domain.txt"):
    with open(file_path, "r") as f:
        domains = [line.strip() for line in f if line.strip()]
    return domains

DOMAINS = load_domains()

def generate_unique_email():
    max_attempts = 10
    for _ in range(max_attempts):
        prefix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=10))
        domain = random.choice(DOMAINS)
        email = f"{prefix}@{domain}"
        if not r.exists(f"email:{email}"):
            r.hset(f"email:{email}", mapping={"created_at": int(time.time())})
            r.expire(f"email:{email}", EMAIL_TTL)
            return email
    raise RuntimeError("Failed to generate unique email address")

def validate_email_address(email):
    try:
        v = validate_email(email, check_deliverability=False)
        email_normalized = v.email.lower()
        return email_normalized
    except EmailNotValidError:
        return None

def save_email_to_redis(to_email: str, email_data: dict):
    key = f"inbox:{to_email}"
    email_data["timestamp"] = int(time.time() * 1000)
    r.lpush(key, json.dumps(email_data))
    r.ltrim(key, 0, MAX_INBOX_SIZE - 1)
    r.expire(key, EMAIL_TTL)

def get_inbox_from_redis(email: str, limit=20):
    key = f"inbox:{email}"
    messages = r.lrange(key, 0, limit - 1)
    return [json.loads(m) for m in messages]

def email_exists(email: str) -> bool:
    return r.exists(f"email:{email}") == 1
