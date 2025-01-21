from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from .serializers import MessageSerializer
from .models import Message
from django.db.models import Q, Subquery
# Create your views here.

class MessagesList(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        user2_id = self.kwargs['user2_id']
        
        return Message.objects.filter(
                (Q(sender=user_id) & Q(receiver=user2_id)) | (Q(sender=user2_id) & Q(receiver=user_id))
            ).order_by('timestamp')


# get all conversations that users has 
class InboxViewSerializer(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

# returns the last message from every conversation
    def get_queryset(self):
        user_id = self.request.user.id 
       
        latest_messages = Message.objects.filter(
            Q(sender_id=user_id) | Q(receiver_id=user_id)
        ).order_by('sender', 'receiver', '-timestamp')  

        
        unique_conversations = Message.objects.filter(
            id__in=Subquery(
                latest_messages.values('id').distinct('sender', 'receiver')
            )
        )

        return unique_conversations.order_by('-timestamp')