import smtplib
import random
import string
import time
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email config
TO_EMAIL = 'makarov331gun@gmail.com'  # Change or expand to a list
EMAIL_COUNT = 1
SUBJECT = "Let’s Connect — 250 Domains"
BODY = """Hi there,

I’m reaching out from 250 Domains to explore how we can support your team’s email infrastructure and deliverability.

Let me know if you'd be open to a quick chat.

Best regards,  
Team 250 Domains
"""

# Helpers
def generate_local_part(length=8):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

# Load domains
with open('domain.txt', 'r') as f:
    domains = [line.strip() for line in f if line.strip()]

# Generate 1000 random email addresses from those domains
random_senders = [
    f"{generate_local_part()}@{random.choice(domains)}"
    for _ in range(EMAIL_COUNT)
]

# Send via local mail server (Postfix/Exim/etc.)
for i, sender in enumerate(random_senders, 1):
    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = TO_EMAIL
    msg['Subject'] = SUBJECT
    msg.attach(MIMEText(BODY, 'plain'))

    try:
        with smtplib.SMTP('localhost') as server:  # no login required
            server.send_message(msg)
            print(f"[{i}] Sent from {sender} to {TO_EMAIL}")
    except Exception as e:
        print(f"[{i}] Failed from {sender}: {e}")

    time.sleep(random.uniform(0.5, 2))  # throttle to stay safe
