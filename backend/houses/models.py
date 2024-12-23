from django.db import models
from django.contrib.auth.models import User 
from enum import Enum

class houseType(Enum):
    APARTMENT = "Apartment"
    HOUSE = "House"
    VILLA = "Villa"
    STUDIO = "Studio"
    DUPLEX = "Duplex"


class House(models.Model):
    fkCreator = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/')
    desc = models.TextField()
    m2 = models.IntegerField()
    house_type = models.CharField(
        max_length=20,
        choices=[(tag.name, tag.value) for tag in houseType],
        default=houseType.APARTMENT.name
    )  
    rooms = models.IntegerField()
    ciudad = models.CharField(max_length=40)
    barrrio = models.CharField(max_length=40)
    calle = models.CharField(max_length=50)
    price = models.FloatField()


class Room(models.Model):
    fkHouse = models.ForeignKey(House, on_delete=models.CASCADE)
    m2 = models.IntegerField()
    desc = models.TextField()
    image = models.ImageField(upload_to='images/')  
    price = models.FloatField()
    isOcupied = models.BooleanField(default=False)
    occupiedBy = models.ForeignKey(User, on_delete=models.DO_NOTHING)