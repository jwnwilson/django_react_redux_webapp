from django.db import models
from rest_framework import serializers
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from wagtail.api import APIField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.admin.edit_handlers import InlinePanel
from wagtail.admin.edit_handlers import PageChooserPanel
from wagtail.core.models import Orderable
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet

from .base import BaseModule, BaseSerializer, register_serializer
from webapp.cms.models.pages.module_page import LinkSerializer


@register_snippet
class Portfolio(ClusterableModel, BaseModule):
    component = 'Portfolio'
    text = models.CharField(max_length=255)
    panels = [
        FieldPanel('title'),
        FieldPanel('text'),
        InlinePanel('portfolio_items', label='Items')
    ]

    def __str__(self):
        return self.text


class PortfolioItem(Orderable):
    portfolio = ParentalKey(
        'cms.Portfolio',
        related_name='portfolio_items',
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
        'cms.ModulePage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )

    panels = [
        FieldPanel('text'),
        ImageChooserPanel('image'),
        PageChooserPanel('link')
    ]

    api_fields = [
        APIField('text'),
        APIField('image'),
        APIField('link'),
    ]

    def __str__(self):
        return self.category.text

    class Meta(ClusterableModel.Meta):
        verbose_name = 'Portfolio Item'
        verbose_name_plural = 'Portfolio Items'
        ordering = ['sort_order']


@register_serializer
class PortfolioItemSerializer(serializers.ModelSerializer):
    link = LinkSerializer()

    class Meta:
        model = PortfolioItem
        fields = '__all__'
        depth = 1


@register_serializer
class PortfolioSerializer(BaseSerializer):
    portfolio_items = PortfolioItemSerializer(many=True, read_only=True)

    class Meta:
        model = Portfolio
        fields = '__all__'
        depth = 2
