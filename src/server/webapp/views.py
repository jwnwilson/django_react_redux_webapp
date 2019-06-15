import json

from django.shortcuts import render_to_response
from django.template import RequestContext

from webapp.cms.models.pages.module_page import ModulePage


def handler404(request):
    try:
        page_404 = ModulePage.objects.get(slug='404')
        context = page_404.get_context(request)
        context['status'] = 400
    except ModulePage.DoesNotExist:
        context = {'status': 400, 'api_data': {}, 'pages': []}

    response = render_to_response(
        'cms/module_page.html', context)
    response.status_code = 404
    return response


def handler500(request):
    response = render_to_response(
        'webapp/500.html', {'status': 500, 'api_data': {}, 'pages': []})
    response.status_code = 500
    return response