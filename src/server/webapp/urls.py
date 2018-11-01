from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView, RedirectView
from django.views.static import serve
from wagtail.core import urls as wagtail_urls


from webapp.cms.api import api_router


handler404 = 'webapp.views.handler404'
handler500 = 'webapp.views.handler500'

urlpatterns = [
    url(r'^api/', api_router.urls),
    url(r'^cms/', include('webapp.cms.urls')),
    url(r'^admin/', admin.site.urls),
    # PWA url
    url(
        r'^index.html/$',
        RedirectView.as_view(url='/'),
        name='index_html'),
    # This needs to be moved to nginx
    url(
        r'^service-worker.js$',
        serve,
        kwargs={
            'path': 'service-worker.js',
            'document_root': settings.STATIC_ROOT
        }
    ),
    url(r'', include(wagtail_urls)),
]

if settings.DEBUG or settings.DEBUG_404:
    import debug_toolbar
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
