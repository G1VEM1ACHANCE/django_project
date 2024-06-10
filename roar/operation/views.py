from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serilaizers import UserSerializer,EventSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Event
from rest_framework.views import APIView

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Event
from .serilaizers import EventSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

class operation_view(APIView):
    def get_permissions(self):
        access_token = self.request.headers.get('Authorization')
        if self.request.method == 'GET':
            return [AllowAny()]
        elif self.request.method == 'POST':
            return [IsAuthenticated()]
        elif self.request.method in ['PUT', 'DELETE']:
            return [IsAuthenticated()]
        else:
            return [IsAuthenticated()] 
    def get(self,request):
        events = Event.objects.prefetch_related('show_info', 'masterunits', 'subunits', 'supportunits', 'other_units')
        serializer = EventSerializer(events, many=True)
        return JsonResponse(serializer.data, safe=False)

    def post(self,request):
        # Handle creation operation
        data = JSONParser().parse(request)
        serializer = EventSerializer(data=data)
        if serializer.is_valid():
            serializer.create(data)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def put(self,request):
        # Handle updating operation
        data = JSONParser().parse(request)
        try:
            event = Event.objects.get(uid=data['uid'])
        except Event.DoesNotExist:
            return JsonResponse({'message': 'The event does not exist'}, status=404)
        
        serializer = EventSerializer(event, data=data)
        if serializer.is_valid():
            serializer.update(event,data)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    def delete(self,request):
        # Handle deletion operation
        data = JSONParser().parse(request)
        try:
            event = Event.objects.get(uid=data['uid'])
        except Event.DoesNotExist:
            return JsonResponse({'message': 'The event does not exist'}, status=404)
        

        event.delete()
        return JsonResponse({'message': 'Event was deleted successfully!'}, status=204)
    

    



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
