import asyncio
from aiosmtpd.controller import Controller
from email import policy
from email.parser import BytesParser
from email_utils import save_email_to_redis, email_exists
import json

class CustomSMTPHandler:
    async def handle_DATA(self, server, session, envelope):
        to_email = envelope.rcpt_tos[0].lower()

        if not email_exists(to_email):
            return "550 Email address not found"

        msg = BytesParser(policy=policy.default).parsebytes(envelope.content)

        email_data = {
            "from": envelope.mail_from,
            "to": to_email,
            "subject": msg.get('subject', ''),
            "date": msg.get('date', ''),
            "body_plain": None,
            "body_html": None,
            "headers": dict(msg.items()),
        }

        if msg.is_multipart():
            for part in msg.walk():
                ctype = part.get_content_type()
                if ctype == "text/plain" and email_data["body_plain"] is None:
                    email_data["body_plain"] = part.get_content()
                elif ctype == "text/html" and email_data["body_html"] is None:
                    email_data["body_html"] = part.get_content()
        else:
            email_data["body_plain"] = msg.get_content()

        save_email_to_redis(to_email, email_data)

        print(f"Received email for {to_email} with subject: {email_data['subject']}")
        return "250 Message accepted for delivery"

async def start_smtp_server():
    controller = Controller(CustomSMTPHandler(), hostname="0.0.0.0", port=1025)
    controller.start()
    print("SMTP server running on port 1025")
    try:
        while True:
            await asyncio.sleep(3600)
    except KeyboardInterrupt:
        controller.stop()

if __name__ == "__main__":
    asyncio.run(start_smtp_server())
