from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel
from wagtail.api import APIField
from wagtail.api.v2.serializers import ChildRelationField, RelatedField
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from .header import HeaderSerializer

class ModulePage(Page):
    header = models.ForeignKey(
        'Header',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    heroImage = models.ForeignKey(
        'HeroImage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        SnippetChooserPanel('header'),
        SnippetChooserPanel('heroImage'),
        InlinePanel('test', label="Test")
    ]

    api_fields = [
        APIField('header', serializer=HeaderSerializer()),
        APIField('heroImage'),
        APIField('test'),
    ]


class Test(Orderable):
    page = ParentalKey(ModulePage, on_delete=models.CASCADE, related_name='test')
    name = models.CharField(max_length=255)
    header = models.ForeignKey(
        'Header',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        FieldPanel('name'),
        SnippetChooserPanel('header')
    ]

    api_fields = [
        APIField('name'),
        APIField('header', serializer=HeaderSerializer()),
    ]
