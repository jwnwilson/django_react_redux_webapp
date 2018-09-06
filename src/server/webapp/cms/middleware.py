from django.conf import settings
from django.core.cache import cache
from django.http import HttpResponse
import requests
import logging

LOG = logging.getLogger(__name__)


class PreRenderMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        if hasattr(settings, 'RENDERTRON_PREFIX'):
            self.key_prefix = settings.RENDERTRON_PREFIX
        else:
            self.key_prefix = 'rendertron-'
        self.cache = cache

    def __call__(self, request):
        if request.method not in ('GET', 'HEAD'):
            return None  # Don't bother checking the cache.

        # Check for rendertron request and don't return cache if rendertroning
        if request.get_host() == 'render-tron.appspot.com':
            return None

        # try and get the cached GET response
        cache_key = self.key_prefix + request.path
        response = self.cache.get(cache_key)

        if response is None:
            response = self.get_response(request)
            LOG.debug('Serving page from server: %s', str(request.path))
        else:
            LOG.debug('Serving page from middleware cache, path:%s, key:%s', request.path, str(cache_key))

        # hit, return cached response
        return response


class SEOMiddleware(object):
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
        if request.method not in ('GET', 'HEAD'):
            return None  # Don't bother checking the cache.

        user_agent = request.META.get('HTTP_USER_AGENT', None)

        for bot in self.bots:
            if bot.lower() in user_agent.lower():
                request.is_crawler=True

        if request.is_crawler:
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
