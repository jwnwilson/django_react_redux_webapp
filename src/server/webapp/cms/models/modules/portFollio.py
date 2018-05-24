from django.db import models
from rest_framework import serializers
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from wagtail.api import APIField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, PageChooserPanel
from wagtail.core.models import Orderable
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet

from .base import BaseModule
from webapp.cms.models.modules.base import register_serializer


@register_snippet
class Portfollio(ClusterableModel, BaseModule):
    component = models.CharField(max_length=255, default="Portfollio")
    text = models.CharField(max_length=255)
    panels = [
        FieldPanel('title'),
        FieldPanel('text'),
        InlinePanel('portfollio_items', label='Items')
    ]

    def __str__(self):
        return self.text


class PortfollioItem(Orderable):
    portfollio = ParentalKey(
        'cms.Portfollio',
        related_name='portfollio_items',
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
    link = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )

    panels = [
        FieldPanel('text'),
        FieldPanel('text'),
        ImageChooserPanel('image'),
        PageChooserPanel('link')
    ]

    def __str__(self):
        return self.category.text

    class Meta(ClusterableModel.Meta):
        verbose_name = 'Portfollio Item'
        verbose_name_plural = 'Portfollio Items'


@register_serializer
class PortfollioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfollioItem
        fields = '__all__'
        depth = 1


@register_serializer
class PortfollioSerializer(serializers.ModelSerializer):
    portfollio_items = PortfollioItemSerializer(many=True, read_only=True)

    class Meta:
        model = Portfollio
        fields = '__all__'
        depth = 2
