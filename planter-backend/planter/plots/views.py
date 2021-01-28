from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response
from rest_framework import status
from django.http import Http404

from .models import Plot
from profiles.models import Profile 
from .serializers import PlotSerializer

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_plots(request):
    plots = Plot.objects.select_related().filter(profile=request.user.profile)
    # plots = Profile.objects.get(profile=request.user.profile).select_related('plots')
    serializer = PlotSerializer(plots)
    data = {'plots': serializer.data, 'response': 'Plot data successfully fetched' }
    return Response(data, status=status.HTTP_200_OK)