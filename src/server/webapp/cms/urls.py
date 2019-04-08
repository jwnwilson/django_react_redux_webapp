from django.conf.urls import include, url
from django.conf import settings

from wagtail.admin import urls as wagtailadmin_urls
from wagtail.documents import urls as wagtaildocs_urls


urlpatterns = [
    url(r'^', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls))
]
