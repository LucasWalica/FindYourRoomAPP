from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Sala(models.Model):
    user1 = models.ForeignKey(User,related_name="user1", on_delete=models.CASCADE)
    user2 = models.ForeignKey(User,related_name="user2", on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user1', 'user2')

class Message(models.Model):
    sala = models.ForeignKey(Sala, on_delete=models.CASCADE)
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"From {self.sender} to {self.receiver}"
    
    def save(self, *args, **kwargs):
        if not self.sala:
            self.sala, created = Sala.objects.get_or_create(
                user1=min(self.sender, self.receiver, key=lambda u: u.id),
                user2=max(self.sender, self.receiver, key=lambda u: u.id)
            )
        super().save(*args, **kwargs)  
    
