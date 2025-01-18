import os
from django.core.asgi import get_asgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

django_asgi_app = get_asgi_application()

from chat.routing import websocket_urlpatterns  # Importa las rutas de la app `chat`
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

import environ

env = environ.Env()
environ.Env.read_env()
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns  # Incluye las rutas de WebSocket de la app `chat`
        )
    ),
})
