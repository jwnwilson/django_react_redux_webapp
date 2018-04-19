import json

from django.http import HttpResponseNotFound, HttpResponseServerError
from django.shortcuts import render_to_response, render
from django.template import RequestContext, loader
from wagtail.api.v2.serializers import get_serializer_class
from wagtail.api.v2.endpoints import PagesAPIEndpoint
from webapp.cms.models import ModulePage
from webapp.app.logic.api import getApiData

def http404(request):
    t = loader.get_template("webapp/404.html")
    return HttpResponseNotFound(
        t.render(RequestContext(request, {'request_path': request.path})))


def http500(request):
    t = loader.get_template("webapp/500.html")
    return HttpResponseServerError(
        t.render(RequestContext(request, {'request_path': request.path})))


def home(request):
    page = ModulePage.objects.get(slug='home')
    page_api_data = getApiData(request, page)
    return render(
        request,
        "webapp/index.html",
        page_api_data)
