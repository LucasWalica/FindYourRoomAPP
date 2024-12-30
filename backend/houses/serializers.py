from .models import Room, House
from rest_framework import serializers
from django.core.exceptions import ValidationError

    

class HouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = House 
        fields = ['fkCreator', 'name', 'image', 
                  'desc', 'm2', 'house_type', 'rooms',
                  'ciudad', 'barrio', 'calle', 'portal',
                    'direccion', 'price']
        read_only_fields = ['fkCreator']
        
        def create(self, validated_data):
            user = self.context['request'].user 
            if not user.is_authenticated:
                raise ValidationError("El usuario especificado no existe.")
            validated_data['fkCreator'] = user
            house = House.objects.create(**validated_data)
            return house
        
        


class HouseUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ['name', 'image',' desc', 'm2', 'rooms', 'price']
    
    def update(self, instance, validated_data):
        user = self.context['request'].user
        if not user.is_authenticated:
            raise ValidationError("El usuario debe estar autenticado para actualizar una casa.")
        
        if instance.fkCreator != user:
            raise ValidationError("No puedes actualizar una casa que no te pertenece.")
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance
    
class RoomUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['m2', 'desc', 'image', 'price']

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if not user.is_authenticated:
            raise ValidationError("El usuario debe estar autenticado para actualizar una habitación.")
        
        fkHouse = validated_data.get('fkHouse', instance.fkHouse)
        if fkHouse.fkCreator != user:
            raise ValidationError("No puedes actualizar una habitación en una casa que no te pertenece.")
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance
    
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room 
        fields = ['fkHouse','m2', 'desc', 'image', 
                  'price', 'isOcupied', 'occupiedBy']
        read_only_fields = ['fkHouse', 'ocupiedBy']
        
    def create(self, validated_data):
        user = self.context['request'].user
        if not user.is_authenticated:
            raise ValidationError("El usuario debe estar autenticado para crear una habitación.")
        fkHouse = validated_data.get('fkHouse')
        if fkHouse.fkCreator != user:
            raise ValidationError("No puedes crear una habitación en una casa que no te pertenece.")
        room = Room.objects.create(**validated_data)
        return room   


class RoomOccupiedBySerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['occupiedBy'] 

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if not user.is_authenticated:
            raise ValidationError("El usuario debe estar autenticado para actualizar el ocupante.")
        if instance.fkHouse.fkCreator != user:
            raise ValidationError("Solo el propietario de la casa puede cambiar el ocupante.")
        instance.occupiedBy = validated_data.get('occupiedBy', instance.occupiedBy)
        instance.save()
        return instance