from django.conf import settings
from django.core.cache import cache
import logging

LOG = logging.getLogger(__name__)


class RenderTronMiddleware(object):
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
