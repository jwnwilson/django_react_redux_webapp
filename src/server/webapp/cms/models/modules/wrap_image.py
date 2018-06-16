from django.db import models
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from rest_framework import serializers
from wagtail.api import APIField
from wagtail.admin.edit_handlers import InlinePanel, FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet
from wagtail.core.models import Orderable

from .base import BaseModule, BaseSerializer
from webapp.cms.models.modules.base import register_serializer


@register_snippet
class WrapImage(ClusterableModel, BaseModule):
    component = "WrapImage"
    text = models.TextField(blank=True, null=True)
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    link = models.URLField(max_length=255, blank=True, null=True)

    panels = [
        FieldPanel('title'),
        FieldPanel('text'),
        ImageChooserPanel('image'),
        FieldPanel('link'),
        InlinePanel('paragraphs', label='Paragraphs')
    ]

    def __str__(self):
        return self.title


class Paragraph(Orderable):
    portfolio = ParentalKey(
        'cms.WrapImage',
        related_name='paragraphs',
        null=True,
        blank=True
    )
    text = models.CharField(max_length=255)
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    youtube_link = models.URLField(max_length=255, blank=True, null=True)


class ParagraphSerializer(BaseSerializer):
    class Meta:
        model = Paragraph
        fields = '__all__'
        depth = 1


@register_serializer
class WrapImageSerializer(BaseSerializer):
    paragraphs = ParagraphSerializer(many=True, read_only=True)

    class Meta:
        model = WrapImage
        fields = '__all__'
        depth = 1
