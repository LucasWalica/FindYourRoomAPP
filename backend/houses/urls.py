from django.urls import path
from .views import (
    RoomCreateView, RoomUpdateView, RoomDetailView, RoomUpdateOcupant,
    HouseCreateView, HouseDeleteView, HouseUpdateView, HouseDetailView
)

urlpatterns = [
   path('house/create/', HouseCreateView.as_view()),
   path('house/delete/<int:id>/', HouseDeleteView.as_view()),
   path('house/update/<int:id>/', HouseUpdateView.as_view()),
   path('house/<int:id>/', HouseDetailView.as_view()),
   path('room/create/', RoomCreateView.as_view()),
   path('room/update/<int:id>/', RoomUpdateView.as_view()),
   # test this one 
   path('room/update/<int:id>/occupant/', RoomUpdateOcupant.as_view()),
   path('room/<int:id>/', RoomDetailView.as_view())
]