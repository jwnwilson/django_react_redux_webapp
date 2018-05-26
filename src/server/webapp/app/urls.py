from django.conf.urls import url

from .views import home
from .views import web_development

urlpatterns = [
    url(r'^$', home.Home.as_view(), name='home'),
    url(r'^home/web-development/', web_development.WebDevelopment.as_view(), name='web-development'),
]
