from django.urls import path 
from .views import (HouseRequestList, HouseRequestUpdate,
                    RoomRequestList, RoomRequestUpdate,
                    PostHouseRequest, PostRoomRequest)


urlpatterns = [
    path('post/houseRequest/', PostHouseRequest.as_view()),
    path('houseRequestList/<int:fkHouse>/', HouseRequestList.as_view()),
    path('houseRequestUpdate/<int:pk>/', HouseRequestUpdate.as_view()),
    path('post/RoomRequest/', PostRoomRequest.as_view()),
    path('RoomRequestList/<int:fkRoom>/', RoomRequestList.as_view()),
    path('RoomRequestUpdate/<int:pk>/', RoomRequestUpdate.as_view()),
]
