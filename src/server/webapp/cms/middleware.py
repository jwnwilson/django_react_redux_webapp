import logging

from django.conf import settings
from django.core.cache import cache
from django.http import HttpResponse
import requests

LOG = logging.getLogger(__name__)


class PreRenderMiddleware(object):
    """
    Will check cache for prerendered html and replace empty body with html if it exists
    """
    def __init__(self, get_response):
        self.get_response = get_response
        if hasattr(settings, 'RENDERTRON_PREFIX'):
            self.key_prefix = settings.RENDERTRON_PREFIX
        else:
            self.key_prefix = 'rendertron-'
        self.cache = cache

    def __call__(self, request):
        if hasattr(settings, 'SKIP_PRERENDER'):
            skip = settings.SKIP_PRERENDER
        else:
            skip = False
        
        if request.method not in ('GET', 'HEAD'):
            skip = True  # Don't bother checking the cache.

        # Check for rendertron request and don't return cache if rendertroning
        LOG.info('request.get_host(): %s', request.get_host())

        if 'HTTP_PUPPETEER' in request.META:
            LOG.info('Rendering html for SSR: %s', str(request.path))
            skip = True
        
        if 'skip_prerender' in request.GET:
            LOG.info('Skipping prerender as got skip_prerender url param: %s', str(request.path))
            skip = True

        # try and get the cached GET response
        if not skip:
            cache_key = self.key_prefix + request.path
            rendertron_resp = self.cache.get(cache_key)

        # hit, return cached response
        if not skip and rendertron_resp:
            LOG.debug('Injecting rendertron html into page: %s', str(request.path))
            response = rendertron_resp

            # TODO: Needs to injest api-data and page data from api so we render correct page
            # even if cache is out of date
        else:
            response = self.get_response(request)
        
        return response


class SEOMiddleware(object):
    """
    Attempt to recognise a search bot and return it a rendered page from rendertron for better SEO crawling
    """
    def __init__(self, get_response):
        self.get_response = get_response
        self.bots=[
            'Slurp',
            'Twiceler',
            'msnbot',
            'KaloogaBot',
            'YodaoBot',
            'Baiduspider',
            'googlebot',
            'Speedy Spider',
            'DotBot',
            'bingbot',
            'yandex',
            'facebookexternalhit',
            'twitterbot',
            'W3C_Validator',
            'linkedinbot',
            ]
    
    def __call__(self, request):
        is_crawler = False
        if request.method in ('GET', 'HEAD'):
            user_agent = request.META.get('HTTP_USER_AGENT', None)

            if user_agent:
                for bot in self.bots:
                    if bot.lower() in user_agent.lower():
                        is_crawler = True

        if is_crawler:
            LOG.debug('Serving crawler via rendertron: %s', str(request.path))
            rendertron_url = 'https://render-tron.appspot.com/render/' + request.get_full_path()
            requests_response = requests.get(rendertron_url)
            response = HttpResponse(
                content=requests_response.content,
                status=requests_response.status_code,
                content_type=requests_response.headers['Content-Type']
            )
        else:
            response = self.get_response(request)

        # hit, return cached response
        return response
