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
    accepted = models.BooleanField(default=False, null=True)
    timestamp  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pk} - {self.sender} - {self.receiver}"


# celery bg tasks generates data with posible matches
class Matches(models.Model):
    fkTenant1 = models.ForeignKey(Inquilino, related_name='posible_match_1', on_delete=models.CASCADE)
    fkTenant2 = models.ForeignKey(Inquilino, related_name='posible_match_2', on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)
    score = models.IntegerField(blank=False, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pk} - {self.fkTenant1} - {self.fkTenant2}"
