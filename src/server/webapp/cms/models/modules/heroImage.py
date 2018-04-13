from django.db import models

from wagtail.api import APIField
from wagtail.core.models import Page, Orderable
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.snippets.models import register_snippet
from wagtail.images.edit_handlers import ImageChooserPanel

@register_snippet
class HeroImage(models.Model):
    title = models.CharField(max_length=255)
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

    api_fields = [
        APIField('title'),
        APIField('text'),
        APIField('image')
    ]

    def __str__(self):
        return self.text
