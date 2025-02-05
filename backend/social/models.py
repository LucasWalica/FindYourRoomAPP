from django.db import models
from users.models import Inquilino

class Friends(models.Model):
    fkTenant1 = models.ForeignKey(Inquilino, related_name='friends_as_tenant_1', on_delete=models.CASCADE)
    fkTenant2 = models.ForeignKey(Inquilino, related_name='friends_as_tenant_2', on_delete=models.CASCADE)
    timestamp  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pk} - {self.fkTenant1} - {self.fkTenant2}"

class FriendRequest(models.Model):
    sender = models.ForeignKey(Inquilino, related_name='sent_requests', on_delete=models.CASCADE)
    receiver = models.ForeignKey(Inquilino, related_name='received_requests', on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    timestamp  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pk} - {self.sender} - {self.receiver}"
    