from django.contrib import admin
from .models.modules.blog import Blog


@admin.register(Blog)
class AuthorAdmin(admin.ModelAdmin):
    pass
