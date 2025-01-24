from django.shortcuts import render
from .models import RoomRequest, HouseRequest
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from .serializers import RoomRequestSerializer, HouseRequestSerializer
from django.shortcuts import get_object_or_404
# Create your views here.


class PostRoomRequest(generics.CreateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = RoomRequest.objects.all()
    serializer_class = RoomRequestSerializer

class RoomRequestList(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = RoomRequest.objects.all()
    serializer_class = RoomRequestSerializer

    def get_queryset(self):
        fkRoom = self.kwargs['fkRoom']
        return RoomRequest.objects.filter(fkRoom_id=fkRoom)

class RoomRequestUpdate(generics.UpdateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = RoomRequest.objects.all()
    serializer_class = RoomRequestSerializer

    def get_object(self):
        pk = self.kwargs['pk']
        return get_object_or_404(RoomRequest, pk=pk)
    

class PostHouseRequest(generics.CreateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = HouseRequest.objects.all()
    serializer_class = HouseRequestSerializer

class HouseRequestList(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = RoomRequest.objects.all()
    serializer_class = HouseRequestSerializer

    def get_queryset(self):
        fkHouse = self.kwargs['fkHouse']
        return HouseRequest.objects.filter(fkHouse_id=fkHouse)

class HouseRequestUpdate(generics.UpdateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = HouseRequest.objects.all()
    serializer_class = HouseRequestSerializer

    def get_object(self):
        pk = self.kwargs['pk']
        return get_object_or_404(HouseRequest, pk=pk)
