from django.core.management.base import BaseCommand

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        pass  # This method should be implemented in your actual management command

# Register custom management commands
from .commands import insert_data  # Import your custom command
