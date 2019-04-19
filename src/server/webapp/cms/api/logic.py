import json

from django.core.urlresolvers import resolve
from django.test.client import RequestFactory


def getApiData(request, page):
    """
    Make internal API call to get page api data as returned from api endpoint
    """
    rf = RequestFactory()
    api_request = rf.get(
        '/api/pages/{}/'.format(page.pk), data={'format': 'json'}
    )
    api_handler = resolve(api_request.path)
    api_request.site = request.site
    resp = api_handler.func(api_request, pk=page.pk)
    resp.render()
    return json.loads(resp.content)
