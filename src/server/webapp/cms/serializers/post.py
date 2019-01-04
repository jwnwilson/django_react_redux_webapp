from rest_framework import serializers


class PostSerializer(serializers.Serializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'code', 'linenos', 'language', 'style')