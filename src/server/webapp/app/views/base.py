import json

from django.core.mail import EmailMessage
from django.http import (
    HttpResponse,
    HttpResponseNotFound,
    HttpResponseServerError,
    JsonResponse
)
from django.shortcuts import render_to_response, render, redirect
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


def root_redirect(request):
    return redirect('home')


class BaseView(View):
    template_name = ''
    slug = ''

    def get(self, request):
        page = ModulePage.objects.get(slug=self.slug)
        page_api_data = getApiData(request, page)
        return render(
            request,
            self.template_name,
            {'page': json.dumps(page_api_data)})
