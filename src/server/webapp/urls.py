from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from wagtail.core import urls as wagtail_urls

from webapp.cms.api import api_router


urlpatterns = [
    url(r'^api/', api_router.urls),
    url(r'^cms/', include('webapp.cms.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^$', include(wagtail_urls))
    #url(r'^$', app.views.base.root_redirect, name='redirect')
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
