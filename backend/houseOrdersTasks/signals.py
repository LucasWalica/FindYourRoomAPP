from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Q
from chat.models import Message, Sala
from .models import RoomRequest, HouseRequest


@receiver(post_save, sender=RoomRequest)
def handle_room_request(sender, instance, **kwargs):
    if instance.accepted is not None:  
        owner = instance.fkHouse.fkCreator
        tenant = instance.fkTenant.fkUser

        sala = get_or_create_sala(owner, tenant)

        if instance.accepted:
            Message.objects.create(
                sala=sala,
                sender=owner,
                receiver=tenant,
               message=f"Congratulations! Your request has been accepted. Welcome to the {instance.fkHouse.name}. We look forward to having you as a tenant!"
            )
        else:
            # Enviar mensaje de rechazo
            Message.objects.create(
                sala=sala,
                sender=owner,
                receiver=tenant,
               message="Unfortunately, your request has been declined. We wish you the best in finding your ideal accommodation."
            )

        # Eliminar la solicitud después de procesarla
        instance.delete()


@receiver(post_save, sender=HouseRequest)
def handle_house_request(sender, instance, **kwargs):
    if instance.accepted is not None:  
        owner = instance.fkHouse.fkCreator
        tenant = instance.fkTenant.fkUser

        sala = get_or_create_sala(owner, tenant)

        if instance.accepted:
            Message.objects.create(
                sala=sala,
                sender=owner,
                receiver=tenant,
                message=f"Congratulations! Your request has been accepted. Welcome to the {instance.fkHouse.name}. We are excited to have you as part of our community!"
            )
        else:
            Message.objects.create(
                sala=sala,
                sender=owner,
                receiver=tenant,
                message="Unfortunately, your request to join the house has been declined. We wish you the best in finding the perfect place for you."
            )

        # Eliminar la solicitud después de procesarla
        instance.delete()

def get_or_create_sala(sender, receiver):
    # Intentamos encontrar una sala existente entre los dos usuarios
    sala = Sala.objects.filter(
        Q(user1=sender, user2=receiver) | Q(user1=receiver, user2=sender)
    ).first()

    # Si no existe, la creamos explícitamente
    if not sala:
        sala = Sala.objects.create(user1=sender, user2=receiver)

    return sala



