from django.shortcuts import render
from .models import FriendRequest, Friends, Matches
from rest_framework import generics
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from .serializer import FriendsSerializer, FriendRequestSerializer, MatchesSerializer
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
    serializer_class = FriendRequestSerializer

    def get_queryset(self):
        inquilino = Inquilino.objects.filter(fkUser = self.request.user).first()
        if inquilino:
            return FriendRequest.objects.filter(receiver=inquilino)
        else:
            return FriendRequest.objects.none()

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
        return Response({'message': 'Solicitud de amistad actualizada', 'accepted': accepted}, status=status.HTTP_200_OK)

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
        inquilino = Inquilino.objects.filter(fkUser=self.request.user).first()
        if inquilino:
            return Friends.objects.filter(Q(fkTenant1=inquilino) | Q(fkTenant2=inquilino))
        return Friends.objects.none()

    
class FriendDelete(generics.DestroyAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer
    lookup_field = 'pk'

    def delete(self, request, *args, **kwargs):
        try:
            relation_id = kwargs.get('pk')
            inquilino = request.user.inquilino  # Asumiendo que el usuario tiene un inquilino relacionado
            
            # Buscar la relación de amistad en cualquier dirección
            friend_relation = Friends.objects.filter(id=relation_id).filter(
                    Q(fkTenant1=inquilino) | Q(fkTenant2=inquilino)
            ).first()

            if friend_relation:
                friend_relation.delete()
                return Response({"detail": "Friendship deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
            else:
                return Response({"detail": "Friendship not found or not authorized."}, status=status.HTTP_404_NOT_FOUND)

        except AttributeError:
            return Response({"detail": "User does not have an associated tenant."}, status=status.HTTP_400_BAD_REQUEST)
        


# returns the matches that a certain users has
class MatchListView(generics.ListAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Matches.objects.all()
    serializer_class = MatchesSerializer

    def get_queryset(self):
        inquilino = Inquilino.objects.filter(fkUser=self.request.user).first()
        if inquilino:
            return Matches.objects.filter(Q(fkTenant1=inquilino) | Q(fkTenant2=inquilino))
        return Matches.objects.none()



# test if works, add signalMatchesSerializer
class MatchUpdate(generics.UpdateAPIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]
    queryset = Matches.objects.all()
    serializer_class = MatchesSerializer

    def update(self, request, *args, **kwargs):
        print("request data:", request.data)
        pk = self.kwargs['pk']
        match = get_object_or_404(Matches, pk=pk)
        accepted = request.data.get('accepted')
        if accepted is None:
            return Response({'error': 'El campo "accepted" es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)
        if not isinstance(accepted, bool):
            return Response({'error': 'El campo "accepted" debe ser un valor booleano'}, status=status.HTTP_400_BAD_REQUEST)
        match.accepted = accepted
        match.save()
        return Response({'status': 'success', 'message': 'Match actualizado correctamente'}, status=status.HTTP_200_OK)

    def get_object(self):
        pk = self.kwargs['pk']
        return get_object_or_404(Matches, pk=pk)