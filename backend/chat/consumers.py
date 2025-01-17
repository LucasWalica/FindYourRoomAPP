import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Los IDs de los usuarios se pueden pasar como parte de la URL o del frontend
        user1_id = int(self.scope['url_route']['kwargs']['user1_id'])
        user2_id = int(self.scope['url_route']['kwargs']['user2_id'])
        
        # Genera el nombre único de la sala
        self.room_name = f"{min(user1_id, user2_id)}_{max(user1_id, user2_id)}"
        self.room_group_name = f"chat_{self.room_name}"

        # Únete al grupo de WebSocket
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Sal del grupo de WebSocket al desconectar
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # Recibe datos del WebSocket
        data = json.loads(text_data)
        message = data['message'] 
        sender_username = data['sender']
        receiver_username = data['receiver']
        
        sender = await self.get_user(sender_username)
        receiver = await self.get_user(receiver_username)
        if sender and receiver:
            await self.save_message(sender, receiver, message)

        # Envía el mensaje al grupo
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',  # Nombre del evento (debe coincidir con el método correspondiente)
                'message': message,
                'sender':sender_username,
                'receiver':receiver_username
            }
        )

    async def chat_message(self, event):
        # Maneja el evento `chat_message`
        message = event['message']
        sender = event['sender']
        receiver = event['receiver']

        # Envía el mensaje al WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,
            'receiver': receiver,
        }))

    @database_sync_to_async
    def save_message(self, sender, receiver, message):
        from .models import Message
        Message.objects.create(sender=sender, receiver=receiver)

    @database_sync_to_async
    def get_user(self, username):
        try:
            return User.objects.get(username=username)
        except User.DoesNotExist:
            return None