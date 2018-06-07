from importlib import import_module
import json

from django.db import models
from django.db.models import signals
from django.core import serializers
from django.core.cache import cache
from modelcluster.fields import ParentalKey
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel
from wagtail.api import APIField
from wagtail.api.v2.serializers import ChildRelationField, RelatedField
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.snippets.models import register_snippet

from .modules.base import ModuleSerializer
from .snippets.header import HeaderSerializer
from .snippets.footer import FooterSerializer
from ..logic.api import getApiData


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
        APIField('header', serializer=HeaderSerializer()),
        APIField('footer', serializer=FooterSerializer()),
        APIField('modules'),
    ]

    def get_context(self, request):
        context = super().get_context(request)

        # Get list of pages to build routes cache it might need to move to a task
        context['pages'] = cache.get('pages_data')
        if not context['pages']:
            pages = [request.site.root_page] + list(request.site.root_page.get_children().live())
            page_data = serializers.serialize("json", pages)
            cache.set('pages_data', page_data)
            context['pages'] = page_data

        # Add extra variables and return the updated context
        context['api_data'] = json.dumps(getApiData(request, context['page']))
        return context

    def serve(self, request):
        # Attempt to dynamically import post logic
        try:
            view_module = import_module(
                'webapp.cms.view_logic.{}'.format(self.slug))
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


def clear_cache(sender, instance, created, **kwargs):
    """
    Clear pages data after creating new page
    """
    cache.delete('pages_data')


signals.post_save.connect(receiver=clear_cache, sender=ModulePage)
