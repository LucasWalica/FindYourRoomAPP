from django.db import models
from django.contrib.auth.models import User 
from enum import Enum
from .utils import get_coordinates_from_address


class houseType(Enum):
    APARTMENT = "Apartment"
    HOUSE = "House"
    VILLA = "Villa"
    STUDIO = "Studio"
    DUPLEX = "Duplex"


class House(models.Model):
    fkCreator = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to='images/houses/')
    desc = models.TextField()
    m2 = models.IntegerField()
    house_type = models.CharField(
        max_length=20,
        choices=[(tag.value, tag.name) for tag in houseType], 
        default=houseType.APARTMENT.value 
    )  
    rooms = models.IntegerField()
    ciudad = models.CharField(max_length=40)
    barrio = models.CharField(max_length=40)
    calle = models.CharField(max_length=50)
    portal = models.IntegerField(blank=False, null=False)
    latitud = models.FloatField(null=True, blank=True)
    longitud = models.FloatField(null=True, blank=True)
    price = models.FloatField()
    # add owner

    def save(self, *args, **kwargs):
        direccion = self.ciudad + " " + self.barrio + " " + self.calle + " "+ str(self.portal)
        self.latitud, self.longitud = get_coordinates_from_address(direccion)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"ID: {self.id} - {self.ciudad} - {self.barrio}"


class Room(models.Model):
    fkHouse = models.ForeignKey(House, on_delete=models.CASCADE)
    m2 = models.IntegerField()
    desc = models.TextField()
    image = models.ImageField(upload_to='images/rooms/')  
    price = models.FloatField()
    isOcupied = models.BooleanField(default=False)
    occupiedBy = models.ForeignKey(User, on_delete=models.DO_NOTHING, blank=True, null=True)

    def __str__(self):
        return f"ID: {self.id} - house PK:{self.fkHouse}"


# maybe add rules to houses?