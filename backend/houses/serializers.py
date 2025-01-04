from .models import Room, House
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
import base64    

        


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
    image = serializers.CharField(required=True)

    class Meta:
        model = Room
        fields = ['fkHouse', 'm2', 'desc', 'image', 'price', 'isOcupied', 'occupiedBy']
        read_only_fields = ['fkHouse', 'occupiedBy']

    def create(self, validated_data):
        # Extraer y eliminar temporalmente la imagen de los datos validados
        image_data = validated_data.pop('image', None)

        # Crear el objeto Room sin la imagen para obtener el ID
        room = Room.objects.create(**validated_data)

        # Procesar y asignar la imagen basada en el ID del objeto creado
        if image_data:
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            image = ContentFile(base64.b64decode(imgstr), name=f"room_{room.id}.{ext}")
            room.image = image
            room.save()  # Guardar el modelo con la imagen asignada

        return room


class HouseSerializer(serializers.ModelSerializer):
    image = serializers.CharField(required=True)
    rooms_data = RoomSerializer(many=True, required=False)

    class Meta:
        model = House
        fields = ['fkCreator', 'name', 'image', 
                  'desc', 'm2', 'house_type', 'rooms', 
                  'ciudad', 'barrio', 'calle', 'portal', 
                  'direccion', 'price', 'rooms_data']
        read_only_fields = ['fkCreator']

    def to_representation(self, instance):
        # Obtener la representación estándar del modelo
        representation = super().to_representation(instance)

        # Añadir manualmente las habitaciones relacionadas
        rooms = Room.objects.filter(fkHouse=instance)
        representation['rooms_data'] = RoomSerializer(rooms, many=True).data

        return representation
    def create(self, validated_data):
        # Extraer y eliminar temporalmente la imagen de los datos validados
        image_data = validated_data.pop('image', None)
        rooms_data = validated_data.pop('rooms_data', [])
        user = self.context['request'].user

        if not user.is_authenticated:
            raise serializers.ValidationError("El usuario no está autenticado.")

        # Asignar el creador autenticado
        validated_data['fkCreator'] = user

        # Crear el objeto House sin la imagen para obtener el ID
        house = House.objects.create(**validated_data)

        # Procesar y asignar la imagen basada en el ID del objeto creado
        if image_data:
            format, imgstr = image_data.split(';base64,')
            ext = format.split('/')[-1]
            image = ContentFile(base64.b64decode(imgstr), name=f"house_{house.id}.{ext}")
            house.image = image
            house.save()  # Guardar el modelo con la imagen asignada

        # Crear habitaciones relacionadas
        for room_data in rooms_data:
            room_data['fkHouse'] = house
            RoomSerializer.create(RoomSerializer(context=self.context), validated_data=room_data)

        return house



        


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