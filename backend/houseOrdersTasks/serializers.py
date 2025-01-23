from .models import RoomRequest, HouseRequest
from rest_framework import serializers


class RoomRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomRequest
        fields = [
            'fkRoom', 'fkTenant', 'accepted'
        ]

    def validate(self, data):
        # Verificar si ya existe un HouseRequest para la misma casa y el mismo tenant
        fkRoom = data['fkRoom']
        fkTenant = data['fkTenant']
        
        # Si ya existe un request, levantar una excepción de validación
        if RoomRequest.objects.filter(fkRoom=fkRoom, fkTenant=fkTenant).exists():
            raise serializers.ValidationError("Este inquilino ya tiene una solicitud para esta habitación.")
        
        return data


class HouseRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseRequest
        fields = [
            'fkHouse', 'fkTenant', 'accepted'
        ]

    def validate(self, data):
        # Verificar si ya existe un HouseRequest para la misma casa y el mismo tenant
        fkHouse = data['fkHouse']
        fkTenant = data['fkTenant']
        
        # Si ya existe un request, levantar una excepción de validación
        if HouseRequest.objects.filter(fkHouse=fkHouse, fkTenant=fkTenant).exists():
            raise serializers.ValidationError("Este inquilino ya tiene una solicitud para esta casa.")
        
        return data