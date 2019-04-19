import os
import shutil

from django.contrib.staticfiles.management.commands.collectstatic import Command as collectstatic


class Command(collectstatic):

    def handle(self, *args, **options):
        super().handle(*args, **options)
        # get client / build directory
        file_dir = os.path.dirname(os.path.abspath(__file__))
        build_dir = os.path.join(file_dir, '../../../../../client/build')
        static_dir = os.path.join(file_dir, '../../../../staticfiles')

        # copy manifest.json, index.html
        for f in ['manifest.json', 'index.html', 'static/favicon.png']:
            shutil.copy(os.path.join(build_dir, f), static_dir)