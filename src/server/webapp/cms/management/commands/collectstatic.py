import os
import shutil

from django.core.management.base import BaseCommand, CommandError
from django.contrib.staticfiles.management.commands.collectstatic import Command as collectstatic


class Command(collectstatic):

    def handle(self, *args, **options):
        super().handle(*args, **options)
        import pdb;pdb.set_trace()
        # get client / build directory
        file_dir = os.path.dirname(os.path.abspath(__file__))
        build_dir = os.path.join(file_dir, '../../../../../client/build')
        static_dir = os.path.join(file_dir, '../../../../staticfiles')

        # copy manifest.json, index.html && offline.html
        for f in ['manifest.json', 'index.html', 'offline.html']:
            shutil.copy(os.path.join(build_dir, f), static_dir)