from django.db import models
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.snippets.models import register_snippet

from .base import BaseModule, BaseSerializer
from webapp.cms.models.modules.base import register_serializer


@register_snippet
class About(BaseModule):
    component = "About"
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
class AboutSerializer(BaseSerializer):
    class Meta:
        model = About
        fields = '__all__'
        depth = 1
