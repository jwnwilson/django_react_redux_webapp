from django.conf import settings

from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic import TemplateView
from wagtail.core import urls as wagtail_urls


urlpatterns = [
    url(r'^', include('webapp.cms.urls')),
    url(r'^', TemplateView.as_view(template_name="index.html")),
    url(r'', include(wagtail_urls)),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
