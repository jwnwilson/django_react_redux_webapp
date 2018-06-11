from django.db import models
from rest_framework import serializers
from wagtail.api import APIField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet

from .base import BaseModule, BaseSerializer
from webapp.cms.models.modules.base import register_serializer


@register_snippet
class ContactMe(BaseModule):
    component = "ContactMe"
    text = models.CharField(max_length=255)

    panels = [
        FieldPanel('title'),
        FieldPanel('text'),
    ]

    def __str__(self):
        return self.text


@register_serializer
class ContactMeSerializer(BaseSerializer):
    class Meta:
        model = ContactMe
        fields = '__all__'
        depth = 1
