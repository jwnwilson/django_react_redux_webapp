from django.db import models
from modelcluster.models import ClusterableModel
from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from rest_framework import serializers
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.core import blocks
from wagtail.core.fields import StreamField
from wagtail.embeds.blocks import EmbedBlock
from wagtail.images.blocks import ImageChooserBlock
from taggit.models import TaggedItemBase, Tag as TaggitTag
from wagtail.snippets.models import register_snippet

from .base import BaseModule, BaseSerializer
from webapp.cms.models.modules.base import register_serializer


class BlogImage(ImageChooserBlock):
    def get_prep_value(self, value):
        """Override default Image chooser block logic to return
        actual image data over just a primary key
        """
        if value:
            return {
                'id': value.id,
                'title': value.title,
                'large': value.get_rendition('width-1000').attrs_dict,
                'thumbnail': value.get_rendition('fill-120x120').attrs_dict,
            }


@register_snippet
class Blog(ClusterableModel, BaseModule):
    component = "Blog"
    tags = ClusterTaggableManager(through='cms.BlogTag', blank=True)
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', BlogImage()),
        ('video', EmbedBlock()),
    ])

    panels = [
        FieldPanel('title'),
        FieldPanel('tags'),
        StreamFieldPanel('body'),
        # InlinePanel('entries', label='Entries')
    ]

    def __str__(self):
        return self.title


@register_snippet
class Tag(TaggitTag):
    class Meta:
        proxy = True


class BlogTag(TaggedItemBase):
    content_object = ParentalKey(
        'Blog', related_name='blog_tags', on_delete=models.CASCADE
    )


@register_serializer
class BlogSerializer(serializers.ModelSerializer):
    # entries = EntrySerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'
        depth = 2
