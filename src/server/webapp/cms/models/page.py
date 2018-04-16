from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from modelcluster.fields import ParentalKey
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel
from wagtail.api import APIField
from wagtail.api.v2.serializers import ChildRelationField, RelatedField
from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.snippets.models import register_snippet
from rest_framework import serializers

from .snippets.header import HeaderSerializer

@register_snippet
class Module(models.Model):
    title = models.CharField(max_length=255)

    panels = [
        FieldPanel('title')
    ]

    def __str__(self):
        return self.title


@register_snippet
class Hero(Module):
    test = models.CharField(max_length=255)

    panels = [
        FieldPanel('title'),
        FieldPanel('test')
    ]

    def __str__(self):
        return self.title


@register_snippet
class Banner(Module):
    test = models.CharField(max_length=255)

    panels = [
        FieldPanel('title'),
        FieldPanel('test')
    ]

    def __str__(self):
        return self.title


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'


class ModulePage(Page):
    header = models.ForeignKey(
        'Header',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        SnippetChooserPanel('header'),
        #InlinePanel('test', label="Test")
        InlinePanel('modules', label="Modules")
    ]

    api_fields = [
        APIField('header', serializer=HeaderSerializer()),
        #APIField('test'),
        APIField('modules'),
    ]


class Test(Orderable):
    page = ParentalKey(ModulePage, on_delete=models.CASCADE, related_name='test')
    name = models.CharField(max_length=255)
    header = models.ForeignKey(
        'Header',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        FieldPanel('name'),
        SnippetChooserPanel('header')
    ]

    api_fields = [
        APIField('name'),
        APIField('header', serializer=HeaderSerializer()),
    ]


class ModuleContainer(Orderable):
    page = ParentalKey(ModulePage, on_delete=models.CASCADE, related_name='modules')
    name = models.CharField(max_length=255)
    module = models.ForeignKey(
        'Module',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    panels = [
        FieldPanel('name'),
        SnippetChooserPanel('module')
    ]

    api_fields = [
        APIField('name'),
        APIField('module', serializer=ModuleSerializer()),
    ]
