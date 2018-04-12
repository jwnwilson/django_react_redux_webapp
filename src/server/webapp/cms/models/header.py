from django.db import models

from wagtail.admin.edit_handlers import FieldPanel
from wagtail.snippets.models import register_snippet


@register_snippet
class Header(models.Model):
    title = models.CharField(max_length=255)
    cta_1 = models.CharField(max_length=255)
    cta_url_1 = models.URLField(null=True, blank=True)
    cta_2 = models.CharField(max_length=255)
    cta_url_2 = models.URLField(null=True, blank=True)
    cta_3 = models.CharField(max_length=255)
    cta_url_3 = models.URLField(null=True, blank=True)

    panels = [
        FieldPanel('title'),
        FieldPanel('cta_1'),
        FieldPanel('cta_url_1'),
        FieldPanel('cta_2'),
        FieldPanel('cta_url_2'),
        FieldPanel('cta_3'),
        FieldPanel('cta_url_3'),
    ]

    def __str__(self):
        return self.title
