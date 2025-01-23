from django.db import models
from houses.models import Room, House 
from users.models import Inquilino
from django.db.models.signals import post_save
from django.dispatch import receiver
from chat.models import Message, Sala 
from django.db.models import Q
# Create your models here.


class RoomRequest(models.Model):
    fkRoom = models.ForeignKey(Room, related_name='room_requests', on_delete=models.CASCADE)
    fkTenant = models.ForeignKey(Inquilino, related_name='room_requests', on_delete=models.DO_NOTHING)
    timestamp  = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return f"{self.pk} - {self.fkRoom} - {self.fkTenant}"



class HouseRequest(models.Model):
    fkHouse = models.ForeignKey(House, related_name='house_requests', on_delete=models.CASCADE)
    fkTenant = models.ForeignKey(Inquilino,related_name='house_requests', on_delete=models.DO_NOTHING)
    timestamp  = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return f"{self.pk} - {self.fkHouse} - {self.fkTenant}"



