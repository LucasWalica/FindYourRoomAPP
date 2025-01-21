import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from rest_framework.exceptions import PermissionDenied

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Extraer user1_id, user2_id y token de la URL
        user1_id = int(self.scope['url_route']['kwargs']['user1_id'])
        user2_id = int(self.scope['url_route']['kwargs']['user2_id'])
        token = self.scope['url_route']['kwargs']['token']  # El token está en la URL como string

        user = await self.authenticate_user(user1_id, token)
        if user is None:
            user = await self.authenticate_user(user2_id, token)
            if user is None:
                raise AuthenticationFailed("Usuario no autenticado.")  # Si ninguno de los dos usuarios es válido

        self.scope['user'] = user

        # Verificamos que el usuario está autorizado para conectarse a esta sala (user1_id o user2_id)
        if user.id != user1_id and user.id != user2_id:
            raise PermissionDenied("No tienes permiso para unirte a esta sala.")

        # Configuramos el nombre de la sala basado en los dos IDs de usuario
        self.room_name = f"{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"
        self.room_group_name = f"chat_{self.room_name}"

        # Unimos al grupo WebSocket
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Salir del grupo WebSocket al desconectar
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Recibir y procesar mensajes del WebSocket
        data = json.loads(text_data)
        message = data['message']
        sender_id = data['sender']
        receiver_id = data['receiver']

        # Obtener usuarios de la base de datos por sus IDs
        sender = await self.get_user(sender_id)
        receiver = await self.get_user(receiver_id)

        if sender and receiver:
            # Guardamos el mensaje en la base de datos
            await self.save_message(sender, receiver, message)

        # Enviar el mensaje al grupo WebSocket
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender_id,
                'receiver': receiver_id
            }
        )

    async def chat_message(self, event):
        # Enviar el mensaje al WebSocket
        message = event['message']
        sender = event['sender']
        receiver = event['receiver']

        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,
            'receiver': receiver,
        }))

    @database_sync_to_async
    def save_message(self, sender, receiver, message):
        from .models import Message
        Message.objects.create(sender=sender, receiver=receiver, message=message)

    @database_sync_to_async
    def get_user(self, user_id):
        from django.contrib.auth import get_user_model
        try:
            return get_user_model().objects.get(id=user_id)
        except get_user_model().DoesNotExist:
            return None

    @database_sync_to_async
    def authenticate_user(self, user_id, token):
        from rest_framework.authentication import TokenAuthentication
        try:
            user = get_user_model().objects.get(id=user_id)
        except get_user_model().DoesNotExist:
            return None  # El usuario no existe

        token_auth = TokenAuthentication()
        try:
            token_obj = token_auth.get_model().objects.get(key=token)
            if token_obj.user != user:
                return None  # El token no corresponde al usuario
        except token_auth.get_model().DoesNotExist:
            return None  # El token no existe

        return user  # Si todo es correcto, devolvemos el usuario autenticado