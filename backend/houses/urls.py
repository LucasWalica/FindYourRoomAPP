from django.urls import path
from .views import (
    RoomUpdateView, RoomUpdateOcupant,
    HouseCreateView, HouseDeleteView, HouseUpdateView, HouseDetailView,
    HouseOwnerListView, HouseList
)

urlpatterns = [
   path('house/create/', HouseCreateView.as_view()),
   path('houses/owner/', HouseOwnerListView.as_view()),
   path('houses/', HouseList.as_view()),
   path('house/delete/<int:id>/', HouseDeleteView.as_view()),
   path('house/update/<int:id>/', HouseUpdateView.as_view()),
   path('house/<int:id>/', HouseDetailView.as_view()),
   path('room/update/<int:id>/', RoomUpdateView.as_view()),
   # test this one 
   path('room/update/<int:id>/occupant/', RoomUpdateOcupant.as_view()),
]