from django.urls import path
from . import consumers

websocket_urlpatterns = [
   path('ws/chat/<int:user1_id>/<int:user2_id>/', consumers.ChatConsumer.as_asgi()),
]