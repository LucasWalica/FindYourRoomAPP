
from .models import Message
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
import base64    
import uuid
import re


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['sender', 'receiver', 'message', 'timestamp', 'read']
