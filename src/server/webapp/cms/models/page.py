from django.db import models
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
