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

        # Autenticación del usuario (user1) con el token
        user = await self.authenticate_user(user1_id, token)

        # Si no se autentica, denegamos la conexión
        if user is None:
            raise AuthenticationFailed("Usuario no autenticado.")

        self.scope['user'] = user  # Guardamos el usuario autenticado en el scope

        # Verificar si el usuario está autorizado para unirse a la sala (por ejemplo)
        if user.id != user1_id:
            raise PermissionDenied("No tienes permiso para unirte a esta sala.")

        # Configurar el nombre de la sala
        self.room_name = f"{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"
        self.room_group_name = f"chat_{self.room_name}"

        # Unirse al grupo WebSocket
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Salir del grupo de WebSocket al desconectar
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
            )
    async def receive(self, text_data):
        data = json.loads(text_data)
        print(data)
        message = data['message']
        sender_id = data['sender']  # Ahora recibimos el ID del sender
        receiver_id = data['receiver']  # Ahora recibimos el ID del receiver

        # Obtener usuarios de la base de datos usando los IDs
        sender = await self.get_user(sender_id)
        receiver = await self.get_user(receiver_id)
        print(sender, " ", receiver)

        if sender and receiver:
            print("sender and receiver checked")
            # Guardar el mensaje en la base de datos
            await self.save_message(sender, receiver, message)

        # Enviar el mensaje al grupo WebSocket
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',  # Tipo de evento
                'message': message,
                'sender': sender_id,  # Usamos el ID del sender
                'receiver': receiver_id  # Usamos el ID del receiver
            }
        )

    async def chat_message(self, event):
        # Maneja el evento `chat_message` y envía el mensaje al WebSocket
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
        # Guardamos el mensaje en la base de datos
        Message.objects.create(sender=sender, receiver=receiver, message=message)

    @database_sync_to_async
    def get_user(self, user_id):
        try:
            # Obtiene el usuario por su nombre de usuario
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    @database_sync_to_async
    def authenticate_user(self, user_id, token):
        # Verifica si el usuario existe
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None  # Si el usuario no existe, devolvemos None

        # Verifica que el token corresponda al usuario
        token_auth = TokenAuthentication()
        try:
            # Autenticamos al usuario con el token
            token_obj = token_auth.get_model().objects.get(key=token)
            if token_obj.user != user:
                return None  # Si el token no pertenece al usuario, devolvemos None
        except token_auth.get_model().DoesNotExist:
            return None  # Si el token no es válido, devolvemos None

        return user
