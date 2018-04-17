from django.db import models
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.snippets.models import register_snippet
from rest_framework import serializers


@register_snippet
class BaseModule(models.Model):
    title = models.CharField(max_length=255)

    panels = [
        FieldPanel('title')
    ]

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Module'
        verbose_name_plural = 'Modules'
        ordering = ['title']


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseModule
        fields = '__all__'

    def to_representation(self, instance):
        if isinstance(instance, Banner):
            return BannerSerializer(instance=instance).data
        elif isinstance(instance, HeroImage):
            return HeroImageSerializer(instance=instance).data
        elif isinstance(instance, Header):
            return HeaderSerializer(instance=instance).data
