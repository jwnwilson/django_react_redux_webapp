from django.db import models
from rest_framework import serializers
from wagtail.api import APIField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet

from .base import BaseModule
from webapp.cms.models.modules.base import register_serializer


@register_snippet
class ContactMe(BaseModule):
    component = models.CharField(max_length=255, default="ContactMe")
    text = models.CharField(max_length=255)
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
        ImageChooserPanel('image'),
    ]

    def __str__(self):
        return self.text



@register_serializer
class ContactMeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMe
        fields = '__all__'
        depth = 1
