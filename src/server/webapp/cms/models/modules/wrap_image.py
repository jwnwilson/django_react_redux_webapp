from django.db import models
from rest_framework import serializers
from wagtail.api import APIField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet

from .base import BaseModule, BaseSerializer
from webapp.cms.models.modules.base import register_serializer


@register_snippet
class WrapImage(BaseModule):
    component = "WrapImage"
    text = models.TextField(blank=True, null=True)
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        FieldPanel('title'),
        FieldPanel('text'),
        ImageChooserPanel('image')
    ]

    def __str__(self):
        return self.title



@register_serializer
class WrapImageSerializer(BaseSerializer):
    class Meta:
        model = WrapImage
        fields = '__all__'
        depth = 1
