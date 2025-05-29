import asyncio
from aiosmtpd.controller import Controller
from email import policy
from email.parser import BytesParser
from email_utils import save_email_to_redis, email_exists
import imaplib
import poplib
from email.message import EmailMessage
import time
import ssl

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
            "timestamp": time.time()
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

        print(f"[SMTP] Received email for {to_email} with subject: {email_data['subject']}")
        return "250 Message accepted for delivery"

async def start_smtp_server():
    controller = Controller(CustomSMTPHandler(), hostname="0.0.0.0", port=25)
    controller.start()
    print("SMTP server running on port 25")
    try:
        while True:
            await asyncio.sleep(3600)
    except KeyboardInterrupt:
        controller.stop()

# Placeholder functions for POP3/IMAP (you can implement actual polling from external mailboxes)
def fetch_emails_imap(host, port, username, password):
    context = ssl.create_default_context()
    with imaplib.IMAP4_SSL(host, port, ssl_context=context) as mail:
        mail.login(username, password)
        mail.select('inbox')
        status, data = mail.search(None, 'ALL')
        for num in data[0].split():
            status, msg_data = mail.fetch(num, '(RFC822)')
            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    msg = BytesParser(policy=policy.default).parsebytes(response_part[1])
                    email_data = {
                        "from": msg.get('from', ''),
                        "to": msg.get('to', ''),
                        "subject": msg.get('subject', ''),
                        "date": msg.get('date', ''),
                        "body_plain": msg.get_body(preferencelist=('plain')).get_content() if msg.get_body(preferencelist=('plain')) else '',
                        "body_html": msg.get_body(preferencelist=('html')).get_content() if msg.get_body(preferencelist=('html')) else '',
                        "headers": dict(msg.items()),
                        "timestamp": time.time()
                    }
                    save_email_to_redis(email_data["to"].lower(), email_data)
                    print(f"[IMAP] Saved email for {email_data['to']}")

def fetch_emails_pop3(host, port, username, password):
    context = ssl.create_default_context()
    with poplib.POP3_SSL(host, port, context=context) as mail:
        mail.user(username)
        mail.pass_(password)
        num_messages = len(mail.list()[1])
        for i in range(num_messages):
            response, lines, octets = mail.retr(i+1)
            msg_content = b"\r\n".join(lines)
            msg = BytesParser(policy=policy.default).parsebytes(msg_content)
            email_data = {
                "from": msg.get('from', ''),
                "to": msg.get('to', ''),
                "subject": msg.get('subject', ''),
                "date": msg.get('date', ''),
                "body_plain": msg.get_body(preferencelist=('plain')).get_content() if msg.get_body(preferencelist=('plain')) else '',
                "body_html": msg.get_body(preferencelist=('html')).get_content() if msg.get_body(preferencelist=('html')) else '',
                "headers": dict(msg.items()),
                "timestamp": time.time()
            }
            save_email_to_redis(email_data["to"].lower(), email_data)
            print(f"[POP3] Saved email for {email_data['to']}")

if __name__ == "__main__":
    try:
        asyncio.run(start_smtp_server())
        # Optionally: start polling IMAP/POP3 here as well
        # fetch_emails_imap('imap.example.com', 993, 'user', 'pass')
        # fetch_emails_pop3('pop.example.com', 995, 'user', 'pass')
    except KeyboardInterrupt:
        print("Server shutdown.")
