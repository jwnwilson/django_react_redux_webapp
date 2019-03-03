from wagtail.snippets.models import register_snippet
from webapp.cms.models.modules.base import register_serializer

from .base import BaseModule
from .base import BaseSerializer


@register_snippet
class BlogListComponent(BaseModule):
    component = "BlogListComponent"


@register_serializer
class BlogListComponentSerializer(BaseSerializer):
    class Meta:
        model = BlogListComponent
        fields = '__all__'
        depth = 1
