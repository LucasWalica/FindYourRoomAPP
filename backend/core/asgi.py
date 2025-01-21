import os
from django.core.asgi import get_asgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

django_asgi_app = get_asgi_application()
from channels.auth import AuthMiddlewareStack
from chat.routing import websocket_urlpatterns  
from channels.routing import ProtocolTypeRouter, URLRouter
import environ

env = environ.Env()
environ.Env.read_env()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns  # Incluye las rutas de WebSocket de la app `chat`
        )
    ),
})
