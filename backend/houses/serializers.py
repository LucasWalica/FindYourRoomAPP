from .models import Room, House
from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
import base64    
from houseOrdersTasks.serializers import HouseRequestSerializer, RoomRequestSerializer


class HouseUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = House
        fields = ['name', 'image','desc', 'm2', 'price']
        
    def update(self, instance, validated_data):
       
        image_data = validated_data.pop('image', None)
        if image_data:
            instance.image = image_data  # Django se encarga de manejar la imagen como archivo
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
        # Verifica si el usuario tiene permiso para modificar la habitación
        if instance.fkHouse.fkCreator != user:
            raise ValidationError("No puedes actualizar la habitación de una casa que no te pertenece.")
        # Extrae la imagen si existe
        image_data = validated_data.pop('image', None)
        if image_data:
            instance.image = image_data
        else:
            pass
        # Actualiza los otros campos del modelo
        for attr, value in validated_data.items():
            setattr(instance, attr,  value)

        instance.save()
        return instance
    
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

class RoomSerializer(serializers.ModelSerializer):
    image = serializers.CharField(required=True)
    room_requests = RoomRequestSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ['id','fkHouse', 'm2', 'desc', 'image', 'price', 'room_requests']
        read_only_fields = ['fkHouse', 'occupiedBy']

    def to_representation(self, instance):
        # Obtener la representación básica del objeto Room
        representation = super().to_representation(instance)
        
        # Convertir la imagen a base64 si existe
        if instance.image:
            try:
                with instance.image.open('rb') as image_file:
                    encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
                    representation['image'] = f"data:image/{instance.image.name.split('.')[-1]};base64,{encoded_image}"
            except Exception as e:
                print(f"Error procesando la imagen de la habitación {instance.id}: {e}")
                representation['image'] = None  # Si hay un error, devolver None
        
        return representation
    
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
    house_requests = HouseRequestSerializer(many=True, read_only=True)
    class Meta:
        model = House
        fields = ['id','fkCreator', 'name', 'image', 
                  'desc', 'm2', 'house_type', 'rooms', 
                  'ciudad', 'barrio', 'calle', 'portal', 
                   'price', 'rooms_data', 'latitud', 'longitud', 
                    'house_requests']
        read_only_fields = ['fkCreator']
    
    def to_representation(self, instance):    
        representation = super().to_representation(instance)
        if instance.image:
            try:
                with instance.image.open('rb') as image_file:
                    encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
                    representation['image'] = f"data:image/{instance.image.name.split('.')[-1]};base64,{encoded_image}"
            except Exception as e:
                print(f"Error procesando la imagen de la casa {instance.id}: {e}")
                representation['image'] = None

        rooms = Room.objects.filter(fkHouse=instance)
        representation['rooms_data'] = RoomSerializer(rooms, many=True).data
        
        return representation


    def create(self, validated_data):
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
        
        
        print("Rooms data:", rooms_data)
        # Crear habitaciones relacionadas
        for room_data in rooms_data:
            room_serializer = RoomSerializer(data=room_data, context=self.context)
            if room_serializer.is_valid(raise_exception=True):
                room_serializer.save(fkHouse=house)  # Asignar la relación con la casa

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