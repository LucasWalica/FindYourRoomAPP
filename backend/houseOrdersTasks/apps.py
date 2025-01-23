from django.apps import AppConfig


class HouseorderstasksConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'houseOrdersTasks'

    def ready(self):
        import houseOrdersTasks.signals 