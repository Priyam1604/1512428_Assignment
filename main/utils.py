from django.core.mail import EmailMessage
from django.conf import settings

def send_mail(subject,email):
    try:
        email_sent = EmailMessage(
            subject, 'Your mark has updated please check on account',
            settings.DEFAULT_FROM_EMAIL, [email, ],
        )
        return email_sent.send(fail_silently=False)
    except Exception as err:
        print(f'Email error {err}')