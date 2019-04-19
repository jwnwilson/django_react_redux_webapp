from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from rest_framework import serializers
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, PageChooserPanel
from wagtail.api import APIField
from wagtail.core.models import Orderable
from wagtail.snippets.models import register_snippet

from webapp.cms.models.modules.base import register_serializer
from webapp.cms.models.pages.module_page import LinkSerializer


@register_snippet
class Header(ClusterableModel):
    title = models.CharField(max_length=255)

    panels = [
        FieldPanel('title'),
        InlinePanel('ctas', label='CTAS')
    ]

    def __str__(self):
        return self.title

    class Meta(Orderable.Meta):
        verbose_name_plural = 'Headers'
        ordering = ['title']


class CTA(Orderable):
    header = ParentalKey(
        'Header',
        related_name='ctas'
    )
    link = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )
    text = models.CharField(max_length=255, blank=True)
    selector = models.CharField(max_length=255, blank=True)

    panels = [
        FieldPanel('text'),
        FieldPanel('selector'),
        PageChooserPanel('link')
    ]

    def __str__(self):
        return self.category.title + ' -> ' + self.ctas.link

    class Meta(Orderable.Meta):
        verbose_name = 'Nav Item'
        verbose_name_plural = 'Nav Items'


@register_serializer
class CtaSerializer(serializers.ModelSerializer):
    link = LinkSerializer()
    class Meta:
        model = CTA
        fields = '__all__'
        depth = 1


@register_serializer
class HeaderSerializer(serializers.ModelSerializer):
    ctas = CtaSerializer(many=True, read_only=True)

    class Meta:
        model = Header
        fields = '__all__'
        depth = 1
