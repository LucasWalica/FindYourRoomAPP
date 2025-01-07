from .models import Room, House
from rest_framework import generics
from .serializers import (
    HouseSerializer, RoomOccupiedBySerializer, RoomSerializer,
    HouseUpdateSerializer, RoomUpdateSerializer)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import House, Room 
from rest_framework.authentication import TokenAuthentication 
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework import status




#done
class HouseOwnerListView(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    
    def get_queryset(self):
        user = self.request.user
        return House.objects.filter(fkCreator=user)

#done
class HouseCreateView(generics.CreateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = House.objects.all()
    serializer_class = HouseSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# iworks
class HouseDeleteView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    lookup_field = 'id'
    
    def perform_destroy(self, instance):
        if instance.room_set.filter(isOcupied=True).exists():
            raise ValidationError("No se puede eliminar una casa con habitaciones ocupadas.")
        instance.delete()


class HouseDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    lookup_field = 'id'


# done
class HouseUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = House.objects.all()
    serializer_class = HouseUpdateSerializer

    def get_object(self):
        print("ID recibido:", self.kwargs['id'])
        obj = get_object_or_404(House, id=self.kwargs['id'])
        if obj.fkCreator != self.request.user:
            raise ValidationError("No puedes actualizar una casa")
        return obj
    


# create specific serializer for this class
class RoomUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Room.objects.all()
    serializer_class = RoomUpdateSerializer

    def get_object(self):
        obj = get_object_or_404(Room, id=self.kwargs['id'])
        if obj.fkHouse.fkCreator != self.request.user:
            raise ValidationError("No puedes actualizar la habitacion")



# view for occupant update
class RoomUpdateOcupant(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Room.objects.all()
    serializer_class = RoomOccupiedBySerializer

    def get_object(self):
        print(f"Buscando habitacion con id={self.kwargs['id']}")
        obj = get_object_or_404(Room, id=self.kwargs['id'])
        if not obj:
            print("El objeto no existe.")
        else:
            print(f"Objeto encontrado: {obj}")
        return obj
