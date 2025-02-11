from .models import FriendRequest, Friends,Matches
from rest_framework import serializers
from users.serializers import InquilinoSerializer



class FriendRequestSerializer(serializers.ModelSerializer):
    sender = InquilinoSerializer(read_only=True)
    
    class Meta:
        model = FriendRequest
        fields = ['id','sender', 'accepted']

    def validate(self, data):
        # Verificar si ya existe un HouseRequest para la misma casa y el mismo tenant
        sender = data['sender']
        receiver = data['receiver']
        # Si ya existe un request, levantar una excepción de validación
        if  FriendRequest.objects.filter(sender=sender, receiver=receiver).exists():
            raise serializers.ValidationError("Estea solicitud ya existe.")
        return data

class FriendsSerializer(serializers.ModelSerializer):
    fkTenant1 = InquilinoSerializer(read_only=True)
    fkTenant2 = InquilinoSerializer(read_only=True)

    class Meta:
        model = Friends
        fields = ['id','fkTenant1', 'fkTenant2']
    
    def validate(self, data):
        fkTenant1 = data['fkTenant1']
        fkTenant2 = data['fkTenant2']
        # Si ya existe un request, levantar una excepción de validación
        if  Friends.objects.filter(fkTenant1=fkTenant1, fkTenant2=fkTenant2).exists():
            raise serializers.ValidationError("Esta relacion ya existe.")
        return data
    

# maybe add methods to improve 
class MatchesSerializer(serializers.ModelSerializer):
    fkTenant1 = InquilinoSerializer(read_only=True)
    fkTenant2 = InquilinoSerializer(read_only=True)

    class Meta:
        model = Matches
        fields = ['id','fkTenant1', 'fkTenant2', 'accepted', 'score']

    def validate(self, data):
        fkTenant1 = data['fkTenant1']
        fkTenant2 = data['fkTenant2']
        # Si ya existe un request, levantar una excepción de validación
        if  Friends.objects.filter(fkTenant1=fkTenant1, fkTenant2=fkTenant2).exists():
            raise serializers.ValidationError("Esta relacion ya existe.")
        return data