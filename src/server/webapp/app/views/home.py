import json

from django.http import HttpResponseNotFound, HttpResponseServerError
from django.shortcuts import render_to_response, render
from django.template import RequestContext, loader

from webapp.cms.models import ModulePage

def http404(request):
    t = loader.get_template("webapp/404.html")
    return HttpResponseNotFound(
        t.render(RequestContext(request, {'request_path': request.path})))


def http500(request):
    t = loader.get_template("webapp/500.html")
    return HttpResponseServerError(
        t.render(RequestContext(request, {'request_path': request.path})))


def home(request):
    context = ModulePage.objects.get(slug='home')
    return render(
        request,
        "webapp/index.html",
        json.loads(context.to_json()))
