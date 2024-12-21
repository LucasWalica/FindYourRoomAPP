from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class House(models.Model):
    fkCreator = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/')
    desc = models.TextField()
    m2 = models.IntegerField()
    #rules = it can be many rules
    # house type =  
    rooms = models.IntegerField()
    ciudad = models.CharField(max_length=40)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)


class Room(models.Model):
    fkHouse = models.ForeignKey(House, on_delete=models.CASCADE)
    m2 = models.IntegerField()
    desc = models.TextField()
    image = models.ImageField(upload_to='images/')