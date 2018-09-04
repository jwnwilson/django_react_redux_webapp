from django.conf import settings
from django.core.cache import cache


class RenderTronMiddleware():
    """
    Will look for cached response from rendertron for current url
    """
    def __init__(self, get_response=None):
        if hasattr(settings, 'RENDERTRON_PREFIX'):
            self.key_prefix = settings.RENDERTRON_PREFIX
        else:
            self.key_prefix = 'rendertron-'
        self.cache = cache

    def process_request(self, request):
        """
        Checks whether the page is already cached and returns the cached
        version if available.
        """
        if request.method not in ('GET', 'HEAD'):
            request._cache_update_cache = False
            return None  # Don't bother checking the cache.

        # Check for rendertron request and don't return cache if rendertroning

        # try and get the cached GET response
        cache_key = self.key_prefix + 'path'
        response = self.cache.get(cache_key)

        if response is None:
            return None

        # hit, return cached response
        return response