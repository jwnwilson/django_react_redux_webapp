from django.db import models
from modelcluster.models import ClusterableModel
from modelcluster.fields import ParentalKey
from modelcluster.tags import ClusterTaggableManager
from rest_framework import serializers
from wagtail.api import APIField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.admin.edit_handlers import InlinePanel
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.core import blocks
from wagtail.core.fields import StreamField
from wagtail.core.models import Orderable
from wagtail.embeds.blocks.EmbedBlock
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.images.blocks import ImageChooserBlock
from taggit.models import TaggedItemBase, Tag as TaggitTag
from wagtail.snippets.models import register_snippet

from .base import BaseModule, BaseSerializer
from webapp.cms.models.modules.base import register_serializer
from webapp.cms.models.page import LinkSerializer


@register_snippet
class Blog(ClusterableModel, BaseModule):
    component = "Blog"
    tags = ClusterTaggableManager(through='cms.BlogTag', blank=True)
    body = StreamField([
        ('heading', blocks.CharBlock(classname="full title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
        ('video', EmbedBlock()),
    ])

    panels = [
        FieldPanel('title'),
        FieldPanel('tags'),
        StreamFieldPanel('body'),
        # InlinePanel('entries', label='Entries')
    ]

    def __str__(self):
        return self.text


@register_snippet
class Tag(TaggitTag):
    class Meta:
        proxy = True


class BlogTag(TaggedItemBase):
    content_object = ParentalKey(
        'Blog', related_name='blog_tags', on_delete=models.CASCADE
    )


# class Entry(Orderable):
#     blog = ParentalKey(
#         'cms.Blog',
#         related_name='entries',
#         null=True,
#         blank=True
#     )
#     slug = models.SlugField(max_length=255, unique=True)
#     title = models.CharField(max_length=255)
#     text = models.TextField(null=True)
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)
#     published = models.BooleanField(db_index=True, default=True)
#     image = models.ForeignKey(
#         'wagtailimages.Image',
#         null=True,
#         blank=True,
#         on_delete=models.SET_NULL,
#         related_name='+'
#     )
#     link = models.URLField(default=None)

#     panels = [
#         FieldPanel('title'),
#         FieldPanel('text'),
#         FieldPanel('slug'),
#         FieldPanel('link'),
#         ImageChooserPanel('image'),
#     ]
#     api_fields = [
#         APIField('title'),
#         APIField('text'),
#         APIField('slug'),
#         APIField('image'),
#         APIField('link')
#     ]

#     def __str__(self):
#         return self.text

#     class Meta(ClusterableModel.Meta):
#         verbose_name = 'Entry'
#         verbose_name_plural = 'Entries'
#         ordering = ['sort_order']


# @register_serializer
# class EntrySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Entry
#         fields = '__all__'
#         depth = 0


@register_serializer
class BlogSerializer(serializers.ModelSerializer):
    # entries = EntrySerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'
        depth = 2
