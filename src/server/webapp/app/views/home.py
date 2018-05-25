import json

from django.core.mail import EmailMessage
from django.http import (
    HttpResponse,
    HttpResponseNotFound,
    HttpResponseServerError,
    JsonResponse
)
from django.shortcuts import render_to_response, render
from django.template import RequestContext, loader
from django.views import View
from wagtail.api.v2.serializers import get_serializer_class
from wagtail.api.v2.endpoints import PagesAPIEndpoint
from webapp.cms.models import ModulePage
from webapp.app.logic.api import getApiData

def http404(request):
    t = loader.get_template('webapp/404.html')
    return HttpResponseNotFound(
        t.render(RequestContext(request, {'request_path': request.path})))


def http500(request):
    t = loader.get_template("webapp/500.html")
    return HttpResponseServerError(
        t.render(RequestContext(request, {'request_path': request.path})))


class Home(View):
    template_name = 'webapp/index.html'

    def get(self, request):
        page = ModulePage.objects.get(slug='home')
        page_api_data = getApiData(request, page)
        return render(
            request,
            self.template_name,
            {'page': json.dumps(page_api_data)})

    def post(self, request):
        if request.is_ajax():
            content = (
                'Name: ' + request.POST.get('name') + '\n'
                'Email: ' + request.POST.get('email') + '\n'
                'Phone number: ' + request.POST.get('phone') + '\n'
                'Message: ' + request.POST.get('message'))
            email = EmailMessage(
                'E-mail from website',
                content,
                to=['jwnwilson88@gmail.com'])
            email.send()
            return JsonResponse({'success': True})
        else:
            return HttpResponse(status=405, content='Post request not supported')
