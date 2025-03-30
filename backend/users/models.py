from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User

class Inquilino(models.Model):
    fkUser = models.ForeignKey(User, on_delete=models.CASCADE)    
    age = models.IntegerField(null=True, blank=True)
    occupation = models.CharField(max_length=100, null=True, blank=True)
    gender = models.CharField(max_length=50, null=True, blank=True) 
    activity_schedule = models.CharField(max_length=50, null=True, blank=True)
    cleanliness_level = models.CharField(max_length=50, null=True, blank=True)
    pets = models.BooleanField(default=False, blank=False)
    smoker = models.BooleanField(default=False, blank=True)
    visit_frequency = models.CharField(max_length=100, null=True, blank=True)
    common_space_usage = models.CharField(max_length=50, null=True, blank=True)
    hobbies = models.CharField(max_length=255, null=True, blank=True)
    socializing_frequency = models.CharField(max_length=50, null=True, blank=True)
    living_environment = models.CharField(max_length=50, null=True, blank=True)
    presentation = models.TextField(max_length=1024, null=True, blank=True)
    desiredCity = models.CharField(max_length=40, blank=False, null=False)


    def __str__(self):
        return f"{self.pk} - {self.fkUser.username}"


class PasswordReset(models.Model):
    email = models.EmailField()
    token = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)



    
    


