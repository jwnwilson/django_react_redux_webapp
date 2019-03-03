from datetime import date, datetime
import json
from importlib import import_module

from django.db import models
from django.db.models import signals
from django.core.cache import cache
from modelcluster.fields import ParentalKey
from rest_framework import serializers
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel
from wagtail.api import APIField
from wagtail.core.models import Page, Orderable
from wagtail.snippets.edit_handlers import SnippetChooserPanel

from ..modules.base import ModuleSerializer


def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError("Type %s not serializable" % type(obj))


class ModulePage(Page):
    header = models.ForeignKey(
        'Header',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    footer = models.ForeignKey(
        'Footer',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        SnippetChooserPanel('header'),
        SnippetChooserPanel('footer'),
        InlinePanel('modules', label="Modules")
    ]

    api_fields = [
        APIField('header', serializer=ModuleSerializer()),
        APIField('footer', serializer=ModuleSerializer()),
        APIField('modules'),
        APIField('url'),
    ]

    def cache_all_pages(self):
        from webapp.cms.api.logic import getApiData

        pages = Page.objects.live()
        page_data = []
        # Add url value from page property
        for page in pages:
            page_data.append(getApiData(page.site, page))

        page_data = json.dumps(page_data)
        cache.set('pages_data', page_data)

    def get_context(self, request):
        from webapp.cms.api.logic import getApiData

        context = super().get_context(request)

        # Get list of pages to build routes cache it might need to move to a task
        # Move to cache get only current page data and cache it
        context['pages'] = cache.get('pages_data')
        if not context['pages']:
            pages = Page.objects.in_site(request.site).live()
            pages_data = []
            # Add url value from page property
            for page in pages:
                page_data = getApiData(request, page)
                pages_data.append(page_data)

            pages_data = json.dumps(pages_data)
            cache.set('pages_data', pages_data)
            context['pages'] = pages_data

        # Add extra variables and return the updated context
        context['api_data'] = json.dumps(getApiData(request, context['page']))
        return context

    def serve(self, request):
        # Attempt to dynamically import get / post logic
        try:
            view_module = import_module(
                'webapp.cms.views.{}'.format(self.slug))
        except ModuleNotFoundError:
            view_module = None

        if request.method == 'POST':
            if hasattr(view_module, 'post'):
                return view_module.post(request)
        else:
            # Display event page as usual
            if hasattr(view_module, 'get'):
                return view_module.get(request)

        return super().serve(request)


class ModuleContainer(Orderable):
    page = ParentalKey(ModulePage, on_delete=models.CASCADE, related_name='modules')
    name = models.CharField(max_length=255)
    module = models.ForeignKey(
        'BaseModule',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        FieldPanel('name'),
        SnippetChooserPanel('module')
    ]

    api_fields = [
        APIField('name'),
        APIField('module', serializer=ModuleSerializer()),
    ]


class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModulePage
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['url'] = instance.url
        return data


def clear_cache(sender, instance, created, **kwargs):
    """
    Clear pages data after creating new page
    """
    cache.delete('pages_data')


signals.post_save.connect(receiver=clear_cache, sender=ModulePage)
