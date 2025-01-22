
from .models import Message
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
import base64    
import uuid
import re


class MessageSerializer(serializers.ModelSerializer):
    
    
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    receiver_username = serializers.CharField(source='receiver.username', read_only=True)
    class Meta:
        model = Message
        fields = [
            'sender', 'sala', 
            'receiver', 'message', 
            'timestamp', 'read', 
            'sender_username', 'receiver_username'
        ]