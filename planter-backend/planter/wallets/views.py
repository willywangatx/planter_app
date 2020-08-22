from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response
from rest_framework import status

from .serializers import WalletSerializer
from .models import Wallet

# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_wallet(request):
    wallet = Wallet.objects.get(profile=request.user.profile)
    serializer = WalletSerializer(wallet)
    data = {'wallet': serializer.data, 'response': 'Wallet Data successfully fetched'}
    return Response(data, status=status.HTTP_200_OK)