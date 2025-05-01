import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async
from rest_framework.exceptions import PermissionDenied
from .models import Sala
from django.db.models import Q




User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Extraer user1_id, user2_id y token de la URL
        user1_id = int(self.scope['url_route']['kwargs']['user1_id'])
        user2_id = int(self.scope['url_route']['kwargs']['user2_id'])
        token = self.scope['url_route']['kwargs']['token']

        # Autenticar el usuario con el token
        user = await self.authenticate_user(user1_id, token)
        if user is None:
            user = await self.authenticate_user(user2_id, token)
            if user is None:
                await self.close()  # Cierra la conexión si no se autentica
                raise AuthenticationFailed("Usuario no autenticado.")

        self.scope['user'] = user

        # Verificar permisos
        if user.id != user1_id and user.id != user2_id:
            await self.close()
            raise PermissionDenied("No tienes permiso para unirte a esta sala.")

        # Configurar la sala
        self.room_name = f"{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"
        self.room_group_name = f"chat_{self.room_name}"

        # Unir al grupo WebSocket
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

        # Obtener usuarios y sala
        sender = await self.get_user(sender_id)
        receiver = await self.get_user(receiver_id)

        if sender and receiver:
            sala = await self.get_or_create_sala(sender, receiver)
        
            # Guardar el mensaje en la base de datos
            await self.save_message(sala, sender, receiver, message)
            print("enviando mensage", flush=True)
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
    def get_or_create_sala(self, sender, receiver):
        # Intentamos encontrar una sala existente entre los dos usuarios
        sala = Sala.objects.filter(
            Q(user1=sender, user2=receiver) | Q(user1=receiver, user2=sender)
        ).first()

        # Si no existe, la creamos explícitamente
        if not sala:
            sala = Sala.objects.create(user1=sender, user2=receiver)
        
        return sala

    @database_sync_to_async
    def save_message(self, sala, sender, receiver, message):
        # Guardar un mensaje en la base de datos
        from .models import Message
        return Message.objects.create(sala=sala, sender=sender, receiver=receiver, message=message)

    @database_sync_to_async
    def get_user(self, user_id):
        # Obtener un usuario por su ID
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    @database_sync_to_async
    def authenticate_user(self, user_id, token):
        # Autenticar el usuario con un token
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

        token_auth = TokenAuthentication()
        try:
            token_obj = token_auth.get_model().objects.get(key=token)
            if token_obj.user != user:
                return None
        except token_auth.get_model().DoesNotExist:
            return None

        return user



