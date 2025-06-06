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
from django.db.models import Q 
from django.db.models import Prefetch
from houseOrdersTasks.models import HouseRequest, RoomRequest


class HouseList(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    

class HouseListBySearch(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = House.objects.all()
    serializer_class = HouseSerializer    
    
    def get_queryset(self):
        search_term = self.request.query_params.get('search', None)  

        queryset = House.objects.all()
        if search_term:
            queryset = queryset.filter(
                Q(name__icontains=search_term) |
                Q(desc__icontains=search_term) |
                Q(ciudad__icontains=search_term) | 
                Q(barrio__icontains=search_term) | 
                Q(calle__icontains=search_term)
            )
        
        return queryset
    

class HouseOwnerListView(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = House.objects.all()
    serializer_class = HouseSerializer
    
    def get_queryset(self):
        user = self.request.user
        # Pre-cargar house_requests
        house_requests_qs = HouseRequest.objects.all()

        queryset = House.objects.filter(fkCreator=user).prefetch_related(
            Prefetch('house_requests', queryset=house_requests_qs, to_attr='related_house_requests')  # Cambié el nombre aquí
        )
        # Pre-cargar room_requests por separado
        room_requests_qs = RoomRequest.objects.all()
        queryset = queryset.prefetch_related(
            Prefetch('rooms__room_requests', queryset=room_requests_qs, to_attr='related_room_requests')  # Cambié el nombre aquí
        )

        return queryset
    


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

class HouseUpdateView(generics.UpdateAPIView):
    parser_classes = [MultiPartParser, FormParser]
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
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Room.objects.all()
    serializer_class = RoomUpdateSerializer
   
    
    def get_object(self):
        obj = get_object_or_404(Room, id=self.kwargs['id'])
        if obj.fkHouse.fkCreator != self.request.user:
            raise ValidationError("No puedes actualizar la habitación de una casa que no te pertenece.")        
        return obj
    

   
    


   
        
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
    
    
