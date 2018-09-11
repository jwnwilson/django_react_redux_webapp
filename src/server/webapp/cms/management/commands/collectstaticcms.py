from django.core.management.base import BaseCommand, CommandError
from django.contrib.staticfiles.management.commands.collectstatic import Command as collectstatic


class Command(collectstatic):

    def handle(self, *args, **options):
        super().handle(*args, **options)
        import pdb;pdb.set_trace()
        self.stdout.write("Here is a further treatment! :)")