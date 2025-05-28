import smtplib

server = smtplib.SMTP('localhost', 1025)
server.sendmail('sender@example.com', ['yitgfn4e7m@tempmail51.com'], 'Subject: Test\n\nThis is a test email.')
server.quit()
