from celery import shared_task
from django.core.cache import cache
from django.utils.cache import (
    get_cache_key, get_max_age, has_vary_header, learn_cache_key,
    patch_response_headers,
)
from django.conf import settings
from django.http import HttpResponse
from django.test.client import RequestFactory
import requests

from .middleware import RenderTronMiddleware


@shared_task
def render_cache_pages():
    from webapp.cms.models.page import Page

    rf = RequestFactory()

    # For each page
    for page in Page.objects.all():
        # Get page url
        page_url = 'https://noel-wilson.co.uk' + page.url_path

        # Send page url to rendertron
        rendertron_url = 'https://render-tron.appspot.com/render/' + page_url
        requests_response = requests.get(rendertron_url)
        django_response = HttpResponse(
            content=requests_response.content,
            status=requests_response.status_code,
            content_type=requests_response.headers['Content-Type']
        )

        # Cache response for cache middleware for page
        cache_key = RenderTronMiddleware().key_prefix + page.url_path
        cache_timeout = settings.CACHE_MIDDLEWARE_SECONDS

        cache.set(cache_key, django_response, cache_timeout)