from celery import shared_task
from django.db.models import Q
from .models import Inquilino, Matches

@shared_task
def evaluar_compatibilidad():
    """Tarea periódica para comparar inquilinos y generar coincidencias (matches)"""
    
    inquilinos = list(Inquilino.objects.all())
    umbral_match = 3  # Puntaje mínimo para considerar un match

    for i, inquilino1 in enumerate(inquilinos):
        for inquilino2 in inquilinos[i + 1:]:  # Evitar comparar un inquilino consigo mismo
            puntaje = 0
            if inquilino1.desiredCity.lower() == inquilino2.desiredCity.lower():
                # Comparar atributos
                if abs(inquilino1.age - inquilino2.age) <= 5:
                    puntaje += 2
                if inquilino1.gender == inquilino2.gender:
                    puntaje +=1
                if inquilino1.activity_schedule == inquilino2.activity_schedule:
                    puntaje +=2
                if inquilino1.cleanliness_level == inquilino2.cleanliness_level:
                    puntaje +=2
                if inquilino1.pets == inquilino2.pets:
                    puntaje +=1
                if inquilino1.smoker == inquilino2.smoker:
                    puntaje +=2
                if inquilino1.visit_frequency == inquilino2.visit_frequency:
                    puntaje+=1
                if inquilino1.common_space_usage == inquilino2.common_space_usage:
                    puntaje+=2
                if inquilino1.socializing_frequency == inquilino2.socializing_frequency:
                    puntaje+=2
                if inquilino1.living_environment == inquilino2.living_environment:
                    puntaje +=2
            
            # Si la compatibilidad es suficiente, se crea un match
            if puntaje >= umbral_match:
                match, created = Matches.objects.get_or_create(
                    fkTenant1=inquilino1,
                    fkTenant2=inquilino2,
                    defaults={'score': puntaje}
                )
                if created:
                    print(f"✅ Match creado entre {inquilino1.fkUser.username} y {inquilino2.fkUser.username} con {puntaje} puntos")

    return "Evaluación de compatibilidad completada"
