from django.db import models
from polymorphic.models import PolymorphicModel
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.snippets.models import get_snippet_models, register_snippet
from rest_framework import serializers

SERIALIZERS = {}


def get_serializers():
    return SERIALIZERS


def register_serializer(serializer):
    model = serializer.Meta.model
    if model not in SERIALIZERS:
        SERIALIZERS[model] = serializer
    return serializer


@register_snippet
class BaseModule(PolymorphicModel):
    component = None
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


class BaseSerializer(serializers.ModelSerializer):
    component = serializers.ReadOnlyField()


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseModule
        fields = '__all__'

    def to_representation(self, instance):
        models = list(get_serializers().keys())
        try:
            index = models.index(instance.__class__)
        except ValueError:
            index = None

        if index is not None:
            serializer = get_serializers()[models[index]]
            return serializer(instance=instance).data
        elif instance.__class__ == BaseModule:
            return super().to_representation(instance)
        else:
            raise NotImplementedError(
                'Unknown model attempted to serialize {}'.format(str(instance)))
