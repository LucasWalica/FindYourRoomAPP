from django.shortcuts import render
from .models import FriendRequest, Friends
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from .serializer import FriendsSerializer, FriendRequestSerializer
from users.models import Inquilino
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
# Create your views here.

class PostFriendRequest(generics.CreateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer


# getting all requests that have been sended to a certain tenant
class FriendsRequestList(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    def get_queryset(self):
        inquilino = Inquilino.objects.filter(fkUser = self.request.user)
        return FriendRequest.objects.filter(receiver=inquilino)
    

# test if works, add signal
class FriendRequestUpdate(generics.UpdateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer

    def update(self, request, *args, **kwargs):
        pk = self.kwargs['pk']
        friend_request = get_object_or_404(FriendRequest, pk=pk)
        accepted = request.data.get('accepted')
        if accepted is None:
            return Response({'error':'El campo "accepted" es obligatorio'})
        friend_request.accepted = accepted
        friend_request.save()

    def get_object(self):
        pk = self.kwargs['pk']
        return get_object_or_404(FriendRequest, pk=pk)
    

# friends -> list friends, delete friend
class FriendsLists(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer

    def get_queryset(self):
        inquilino = Inquilino.objects.filter(fkUser = self.request.user)
        return Friends.objects.filter(fkTenant1=inquilino) | Friends.objects.filter(fkTenant2=inquilino)
    
class FriendDelete(generics.DestroyAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer
    lookup_field = 'id'

    def delete(self, request, tenant_id, format=None):
        try:
            inquilino = request.user.inquilino  # Asumiendo que el usuario tiene un inquilino relacionado
            
            # Buscar la relación de amistad en cualquier dirección
            friend_relation = Friends.objects.filter(
                (Q(fkTenant1=inquilino) & Q(fkTenant2__id=tenant_id)) |
                (Q(fkTenant2=inquilino) & Q(fkTenant1__id=tenant_id))
            ).first()

            if friend_relation:
                friend_relation.delete()
                return Response({"detail": "Friendship deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"detail": "Friendship not found or not authorized."}, status=status.HTTP_404_NOT_FOUND)

        except AttributeError:
            return Response({"detail": "User does not have an associated tenant."}, status=status.HTTP_400_BAD_REQUEST)