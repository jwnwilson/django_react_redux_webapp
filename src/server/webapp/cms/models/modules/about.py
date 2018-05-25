from django.db import models
from rest_framework import serializers
from wagtail.api import APIField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet

from .base import BaseModule
from webapp.cms.models.modules.base import register_serializer


@register_snippet
class About(BaseModule):
    component = models.CharField(max_length=255, default="About")
    text_1 = models.TextField(blank=True, null=True)
    text_2 = models.TextField(blank=True, null=True)
    cv_link = models.URLField(max_length=255, blank=True, null=True)

    panels = [
        FieldPanel('title'),
        FieldPanel('text_1'),
        FieldPanel('text_2'),
        FieldPanel('cv_link')
    ]

    def __str__(self):
        return self.title



@register_serializer
class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = '__all__'
        depth = 1
