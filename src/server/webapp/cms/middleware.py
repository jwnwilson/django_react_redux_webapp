import logging

from bs4 import BeautifulSoup as Soup
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
        if request.method not in ('GET', 'HEAD'):
            return None  # Don't bother checking the cache.

        # Check for rendertron request and don't return cache if rendertroning
        if request.get_host() == 'render-tron.appspot.com':
            return None

        # try and get the cached GET response
        cache_key = self.key_prefix + request.path
        rendertron_resp = self.cache.get(cache_key)

        response = self.get_response(request)

        if rendertron_resp:
            LOG.debug('Injecting rendertron html into page: %s', str(request.path))
            # Replace body of response with rendertron body
            rendertron_soup = Soup(rendertron_resp.content, features='html5lib')
            rendertron_inner_html = rendertron_soup.find('div', class_='main') or rendertron_soup.body
             
            resp_soup = Soup(response.content, features='html5lib')
            resp_soup_main = resp_soup.find('div', class_='main')
            resp_soup_main.clear()
            resp_soup_main.append(rendertron_inner_html.find('div', id='root'))
            
            response.content = str(resp_soup)

        # hit, return cached response
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
        if request.method not in ('GET', 'HEAD'):
            return None  # Don't bother checking the cache.

        user_agent = request.META.get('HTTP_USER_AGENT', None)

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
