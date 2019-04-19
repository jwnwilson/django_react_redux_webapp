from django.core.mail import EmailMessage
from django.http import (
    HttpResponse,
    JsonResponse
)


def post(request):
    if request.is_ajax():
        content = (
            'Name: ' + request.POST.get('name') + '\n'
            'Email: ' + request.POST.get('email') + '\n'
            'Phone number: ' + request.POST.get('phone') + '\n'
            'Message: ' + request.POST.get('message'))
        email = EmailMessage(
            'E-mail from website',
            content,
            to=['jwnwilson@gmail.com'])
        email.send()
        return JsonResponse({'success': True})
    else:
        return HttpResponse(status=405, content='Post request not supported')
