from django.conf.urls import include, url
from wagtail.core import urls as wagtail_urls

from .views import home
from .views import web_development

urlpatterns = [
    url(r'^$', home.Home.as_view(), name='home'),
    url(r'^web-development/', web_development.WebDevelopment.as_view(), name='web-development'),
    url(r'', include(wagtail_urls))
]
