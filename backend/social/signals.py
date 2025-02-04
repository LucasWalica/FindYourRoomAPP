from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import FriendRequest, Friends
from django.utils.translation import gettext_lazy as _
from chat.models import Sala, Message

def get_or_create_sala(user1, user2):
    sala, created = Sala.objects.get_or_create(user1=user1, user2=user2)
    return sala

@receiver(post_save, sender=FriendRequest)
def handle_friend_request(sender, instance, **kwargs):
    if instance.accepted is not None:
        user1 = instance.sender.fkUser
        user2 = instance.receiver.fkUser

        sala = get_or_create_sala(user1, user2)

        if instance.accepted:
            if not Friends.objects.filter(fkTenant1=user1, fkTenant2=user2).exists() and \
               not Friends.objects.filter(fkTenant1=user2, fkTenant2=user1).exists():
                Friends.objects.create(fkTenant1=user1, fkTenant2=user2)

                Message.objects.create(
                    sala=sala,
                    sender=user1,
                    receiver=user2,
                    message=_("You have been added as a friend by {username}.").format(username=user1.username)
                )

                Message.objects.create(
                    sala=sala,
                    sender=user2,
                    receiver=user1,
                    message=_("You added {username} as a friend.").format(username=user2.username)
                )
            else:
                Message.objects.create(
                    sala=sala,
                    sender=user1,
                    receiver=user2,
                    message=_("You are already friends with {username}.").format(username=user1.username)
                )
        else:
            Message.objects.create(
                sala=sala,
                sender=user1,
                receiver=user2,
                message=_("The friend request from {username} has been rejected.").format(username=user1.username)
            )
