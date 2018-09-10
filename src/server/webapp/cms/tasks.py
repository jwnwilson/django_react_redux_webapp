import logging

from bs4 import BeautifulSoup as Soup
from celery import shared_task
from django.core.cache import cache
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.test.client import RequestFactory
from django.utils.cache import (
    get_cache_key, get_max_age, has_vary_header, learn_cache_key,
    patch_response_headers,
)
import requests

LOG = logging.getLogger(__name__)


@shared_task
def render_cache_pages():
    from webapp.cms.models.page import Page

    rf = RequestFactory()
    if hasattr(settings, 'RENDERTRON_PREFIX'):
        key_prefix = settings.RENDERTRON_PREFIX
    else:
        key_prefix = 'rendertron-'

    # For each page
    for page in Page.objects.all():
        LOG.info('Rendering page: %s', str(page))
        page_sub_url = (page.url or page.url_path)
        # Get page url
        page_url = 'https://noel-wilson.co.uk' + page_sub_url

        # Send page url to rendertron
        rendertron_url = 'https://render-tron.appspot.com/render/' + page_url
        requests_response = requests.get(rendertron_url)
        django_response = render_to_response('cms/module_page.html')

        rendertron_soup = Soup(requests_response.content, features='html5lib')
        django_soup = Soup(django_response.content, features='html5lib')

        django_soup_main = django_soup.find('div', class_='main')
        django_soup_main.clear()
        django_soup_main.append(rendertron_soup.find('div', id='root'))
        
        django_response = HttpResponse(
            content=str(django_soup),
            status=requests_response.status_code,
            content_type=requests_response.headers['Content-Type']
        )

        # Cache response for cache middleware for page
        cache_key = key_prefix + page_sub_url
        cache_timeout = settings.CACHE_MIDDLEWARE_SECONDS

        cache.set(cache_key, django_response, cache_timeout)
        LOG.info('Rendered page: %s', str(page))