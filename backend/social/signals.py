from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import FriendRequest, Friends, Matches
from django.utils.translation import gettext_lazy as _
from chat.models import Sala, Message
from django.db.models import Q

def get_or_create_sala(user1, user2):
    user1, user2 = sorted([user1, user2], key=lambda x: x.id)
    sala, created = Sala.objects.get_or_create(user1=user1, user2=user2)
    return sala

@receiver(post_save, sender=FriendRequest)
def handle_friend_request(sender, instance, **kwargs):
    if instance.accepted is not None:
        user1 = instance.sender.fkUser
        user2 = instance.receiver.fkUser
        
        tenant1 = instance.sender 
        tenant2 = instance.receiver

        sala = get_or_create_sala(user1, user2)

        if instance.accepted:
            print("Accepted:", instance.accepted)
            #if it doesnt exist
            if not Friends.objects.filter(fkTenant1=tenant1, fkTenant2=tenant2).exists() and \
               not Friends.objects.filter(fkTenant1=tenant2, fkTenant2=tenant1).exists():
                Friends.objects.get_or_create(fkTenant1=tenant1, fkTenant2=tenant2)

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
                instance.delete()
            # if it exists
            else:
                Message.objects.create(
                    sala=sala,
                    sender=user1,
                    receiver=user2,
                    message=_("You are already friends with {username}.").format(username=user1.username)
                )
            instance.delete()
        # if match has not been accepted
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
        tenant1 = instance.fkTenant1
        tenant2 = instance.fkTenant2

        user1 = tenant1.fkUser
        user2 = tenant2.fkUser

        # Determinar quién aceptó el match
        match_updater = getattr(instance, "_updated_by", None)  # Si tienes tracking del usuario que hizo el update

        if match_updater == user1:
            sender = tenant1
            receiver = tenant2
        else:
            sender = tenant2
            receiver = tenant1

        # Verificar si ya existe una solicitud de amistad entre estos usuarios
        existing_request = FriendRequest.objects.filter(
            (Q(sender=sender) & Q(receiver=receiver)) | (Q(sender=sender) & Q(receiver=receiver))
        ).exists()
        
        if not existing_request:  # Si no existe, crear la solicitud de amistad
            FriendRequest.objects.get_or_create(sender=sender, receiver=receiver, accepted=None)  # accepted=None -> pendiente
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
        instance.delete()
    elif instance.accepted is False:
        pass