from django.urls import path
from . import consumers

websocket_urlpatterns = [
   path('ws/chat/<int:user1_id>/<int:user2_id>/<str:token>/', consumers.ChatConsumer.as_asgi()),
]