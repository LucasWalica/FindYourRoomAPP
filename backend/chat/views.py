from django.shortcuts import render
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from .serializers import MessageSerializer
from .models import Message
from django.db.models import Q, Subquery, OuterRef, Max
from .models import Sala
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



class InboxViewSerializer(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    serializer_class = MessageSerializer

    def get_queryset(self):
        user_id = self.request.user.id

        # Filtrar las salas en las que participa el usuario
        salas = Sala.objects.filter(
            Q(user1_id=user_id) | Q(user2_id=user_id)
        ).values_list('id', flat=True)

        latest_message_ids = Message.objects.filter(
            sala_id__in=salas
        ).values('sala_id').annotate(latest_id=Max('id')).values_list('latest_id', flat=True)

        mensajes = Message.objects.filter(
            id__in=latest_message_ids
        ).order_by('-timestamp')

        return mensajes