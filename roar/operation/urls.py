from django.contrib import admin
from django.urls import path,include
from operation.views import GetEventView,UpdateEventView,DeleteEventView,CreateEventView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("search/",GetEventView.as_view(),name="get-data"),
    path("update/<str:pk>/",UpdateEventView.as_view(),name="update-data"),
    path("delete/<str:pk>/",DeleteEventView.as_view(),name="delete-data"),
    path("create/",CreateEventView.as_view(),name="create-data")
]