from django.db import models
from django.db.models import signals
from django.core.cache import cache
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.api import APIField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.images.api.fields import ImageRenditionField

from .module_page import ModulePage


def clear_cache(sender, instance, created, **kwargs):
    """
    Clear pages data after creating new page
    """
    cache.delete('pages_data')


class BlogPage(ModulePage):
    description = models.TextField()
    listing_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    api_fields = ModulePage.api_fields + [
        APIField('description'),
        APIField('listing_image'),
        # Adds a URL to a rendered thumbnail of the image to the API
        APIField(
            'listing_image_url',
            serializer=ImageRenditionField(
                'fill-400x400', source='listing_image'
            )
        )
    ]

    content_panels = ModulePage.content_panels + [
        FieldPanel('description'),
        ImageChooserPanel('listing_image'),
    ]


signals.post_save.connect(receiver=clear_cache, sender=BlogPage)
