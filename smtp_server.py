import smtplib
import random
import string
import time

TO_EMAIL = "makarov331gun@gmail.com"
EMAIL_COUNT = 5

# Load your domains
with open("domain.txt") as f:
    domains = [line.strip() for line in f if line.strip()]

# Send loop
for i in range(EMAIL_COUNT):
    local = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    domain = random.choice(domains)
    sender = f"{local}@{domain}"

    msg = f"""From: {sender}
To: {TO_EMAIL}
Subject: Let's Connect — 250 Domains

Hi there,

I’m reaching out from 250 Domains to explore how we can support your team’s email infrastructure and deliverability.

Let me know if you'd be open to a quick chat.

Best regards,
Team 250 Domains
"""

    try:
        with smtplib.SMTP("localhost", 25) as server:
            server.sendmail(sender, TO_EMAIL, msg)
        print(f"[{i+1}] Sent from {sender}")
    except Exception as e:
        print(f"[{i+1}] Failed from {sender}: {e}")

    time.sleep(random.uniform(0.5, 1.5))
