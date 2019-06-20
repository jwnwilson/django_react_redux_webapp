import os
import shutil

from django.core.management.base import BaseCommand, CommandError
from webapp.cms.tasks import render_cache_pages

class Command(BaseCommand):
    def handle(self, *args, **options):
        render_cache_pages.delay()