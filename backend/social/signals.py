from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import FriendRequest, Friends, Matches
from django.utils.translation import gettext_lazy as _
from chat.models import Sala, Message
from django.db.models import Q

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



@receiver(post_save, sender=Matches)
def create_friend_request_on_match(sender, instance, **kwargs):
    """
    Crea automáticamente una solicitud de amistad cuando un match es aceptado.
    """
    if instance.accepted:  # Si el match es aceptado
        user1 = instance.fkTenant1.fkUser  # Usuario 1 del match
        user2 = instance.fkTenant2.fkUser  # Usuario 2 del match

        # Verificar si ya existe una solicitud de amistad entre estos usuarios
        existing_request = FriendRequest.objects.filter(
            (Q(sender=user1) & Q(receiver=user2)) | (Q(sender=user2) & Q(receiver=user1))
        ).exists()

        if not existing_request:  # Si no existe, crear la solicitud de amistad
            FriendRequest.objects.create(sender=user1, receiver=user2, accepted=None)  # accepted=None -> pendiente

            # Crear sala de chat si no existe
            sala = get_or_create_sala(user1, user2)

            Message.objects.create(
                sala=sala,
                sender=user1,
                receiver=user2,
                message=_("You have matched with {username}! A friend request has been sent.").format(username=user1.username)
            )
            Message.objects.create(
                sala=sala,
                sender=user2,
                receiver=user1,
                message=_("You have matched with {username}! A friend request has been sent.").format(username=user2.username)
            )