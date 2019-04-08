from django.http import HttpResponse
from django.core.cache import cache


def get(request):
    cache.clear()
    return HttpResponse({'success': True})