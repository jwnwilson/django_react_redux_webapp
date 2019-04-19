from django.db import models
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.models import register_snippet
from webapp.cms.models.modules.base import register_serializer

from .base import BaseModule
from .base import BaseSerializer


@register_snippet
class Banner(BaseModule):
    component = "Banner"
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
class BannerSerializer(BaseSerializer):
    class Meta:
        model = Banner
        fields = '__all__'
        depth = 1
