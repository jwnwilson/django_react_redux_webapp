from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from rest_framework import serializers
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel, PageChooserPanel
from wagtail.api import APIField
from wagtail.core.models import Orderable
from wagtail.snippets.models import register_snippet


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
    category = ParentalKey(
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

    panels = [
        FieldPanel('text'),
        PageChooserPanel('link')
    ]

    def __str__(self):
        return self.category.title + ' -> ' + self.ctas.link

    class Meta(Orderable.Meta):
        verbose_name = 'Nav Item'
        verbose_name_plural = 'Nav Items'


class HeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Header
        fields = '__all__'
        depth = 1
