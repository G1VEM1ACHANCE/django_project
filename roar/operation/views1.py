from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Event
from .serilaizers1 import EventSerializer

@csrf_exempt  # This decorator is used for demonstration purposes. You should handle CSRF protection properly in production.
def operation_view(request):
    if request.method == 'GET':
        # Handle display operation
        events = Event.objects.prefetch_related('show_info', 'masterunits', 'subunits', 'supportunits', 'other_units')
        serializer = EventSerializer(events, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        # Handle creation operation
        data = JSONParser().parse(request)
        serializer = EventSerializer(data=data)
        if serializer.is_valid():
            serializer.create(data)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'PUT':
        # Handle updating operation
        data = JSONParser().parse(request)
        try:
            event = Event.objects.get(uid=data['uid'])
        except Event.DoesNotExist:
            return JsonResponse({'message': 'The event does not exist'}, status=404)
        print("event")
        
        serializer = EventSerializer(event, data=data)
        if serializer.is_valid():
            serializer.update(event,data)
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        # Handle deletion operation
        data = JSONParser().parse(request)
        print(data)
        try:
            event = Event.objects.get(uid=data['uid'])
        except Event.DoesNotExist:
            return JsonResponse({'message': 'The event does not exist'}, status=404)

        event.delete()
        return JsonResponse({'message': 'Event was deleted successfully!'}, status=204)

    else:
        return JsonResponse({'message': 'Unsupported method'}, status=405)
