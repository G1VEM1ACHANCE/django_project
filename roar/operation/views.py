from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serilaizers import UserSerializer,EventSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Event

# Create your views here.
class GetEventView(generics.ListAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        return Event.objects.prefetch_related('show_info', 'masterunits', 'subunits', 'supportunits', 'other_units')
class CreateEventView(generics.CreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]


class UpdateEventView(generics.UpdateAPIView):
    serializer_class = EventSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        uid = (self.kwargs['pk'])
        print(self.request.data)
        return Event.objects.filter(uid=uid)
    
class DeleteEventView(generics.DestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AllowAny]


    def perform_destroy(self, instance):
        return super().perform_destroy(instance)
    

    



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
