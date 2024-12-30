from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User 
from . serializers import UserSerializer, InquilinoSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from .models import Inquilino
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404


# register
class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        if not user:
            return Response({'error':"invalid credentialds"}, status=401)

        try:
            inquilino = Inquilino.objects.get(fkUser=user)
            inquilino_id = inquilino.id
        except Inquilino.DoesNotExist:
            inquilino_id = None

        token, created = Token.objects.get_or_create(user=user)
        return Response({
            "token":token.key,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
            "inquilino_id": inquilino_id
        }, status=201)
    
#login 
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        try:
            inquilino = Inquilino.objects.get(fkUser=user)
            inquilino_id = inquilino.id
        except Inquilino.DoesNotExist:
            inquilino_id = None

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token":token.key,
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                "inquilino_id":inquilino_id
            }, status=200)
        else:
            return Response({"error": "Invalid credentials"}, status=401)
#logout 
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    def post(self, request):
        request.user.auth_token.delete()
        return Response({'message':"user logout succesfully"}, status=200)    
    

class InquilinoCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Inquilino.objects.all()
    serializer_class = InquilinoSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        inquilino = serializer.save()

        return Response({
            "message": "Inquilino creado exitosamente",
            "inquilino_id": inquilino.id,
        }, status=201)

class InquilinoUpdateView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Inquilino.objects.all()
    serializer_class = InquilinoSerializer
    lookup_field = 'id' 
    
    def get_object(self):
        print(f"Buscando Inquilino con id={self.kwargs['id']}")
        obj = get_object_or_404(Inquilino, id=self.kwargs['id'])
        if not obj:
            print("El objeto no existe.")
        else:
            print(f"Objeto encontrado: {obj}")
        return obj

class InquilinoDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]
    queryset = Inquilino.objects.all()
    serializer_class = InquilinoSerializer
    lookup_field = 'id'  

   