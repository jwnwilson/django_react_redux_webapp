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


@register_snippet
class Footer(ClusterableModel):
    title = models.CharField(max_length=255)
    address = models.TextField()
    text = models.TextField()
    google_link = models.URLField(max_length=255, blank=True, null=True)
    github_link = models.URLField(max_length=255, blank=True, null=True)
    instagram_link = models.URLField(max_length=255, blank=True, null=True)
    linkedin_link = models.URLField(max_length=255, blank=True, null=True)

    panels = [
        FieldPanel('title'),
        FieldPanel('address'),
        FieldPanel('text'),
        FieldPanel('google_link'),
        FieldPanel('github_link'),
        FieldPanel('instagram_link'),
        FieldPanel('linkedin_link')
    ]

    def __str__(self):
        return self.title

    class Meta(Orderable.Meta):
        verbose_name_plural = 'Footers'
        ordering = ['title']


@register_serializer
class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = '__all__'
        depth = 1
