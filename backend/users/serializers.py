from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.exceptions import ValidationError
from .models import Inquilino

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise ValidationError("Este correo electrónico ya está registrado.")
        return value

   
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise ValidationError("Este nombre de usuario ya está registrado.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email']
        )
        return user

class InquilinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquilino
        fields = [
            'fkUser', 'age', 'occupation', 'gender', 'activity_schedule', 'cleanliness_level',
            'pets', 'smoker', 'visit_frequency', 'common_space_usage', 'hobbies', 
            'socializing_frequency', 'living_environment', 'presentation', 
            'instagram_profile', 'facebook_profile', 'linkedin_profile'
        ]
        read_only_fields = ['fkUser']


    def create(self, validated_data):
        user = self.context['request'].user
        if not user.is_authenticated:
            raise ValidationError("El usuario especificado no existe.")
        validated_data['fkUser'] = user
        inquilino = Inquilino.objects.create(**validated_data)
        return inquilino

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if not User.objects.filter(id=user.id).exists():
            raise serializers.ValidationError({"fkUser": "El usuario autenticado no es válido."})
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.fkUser = user
        instance.save()
        return instance
    
    