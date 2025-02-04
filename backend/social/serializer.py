from .models import FriendRequest, Friends
from rest_framework import serializers

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ['sender', 'receiver']

    def validate(self, data):
        # Verificar si ya existe un HouseRequest para la misma casa y el mismo tenant
        sender = data['sender']
        receiver = data['receiver']
        
        # Si ya existe un request, levantar una excepción de validación
        if  FriendRequest.objects.filter(sender=sender, receiver=receiver).exists():
            raise serializers.ValidationError("Estea solicitud ya existe.")
        return data

class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friends
        fields = ['fkTenant1', 'fkTenant2', 'accepted']
    
    def validate(self, data):
        fkTenant1 = data['fkTenant1']
        fkTenant2 = data['fkTenant2']
        
        # Si ya existe un request, levantar una excepción de validación
        if  Friends.objects.filter(fkTenant1=fkTenant1, fkTenant2=fkTenant2).exists():
            raise serializers.ValidationError("Estea solicitud ya existe.")
        return data