from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response
from rest_framework import status
from django.http import Http404

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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_energy(request):
    wallet_id = request.data.get('id')
    focus_time = request.data.get('focus_time')
    if not id or not focus_time:
        return Response({'details': {'required fields': ['id', 'focus_time']}}, status=status.HTTP_400_BAD_REQUEST)

    try: 
        wallet = Wallet.objects.get(pk= wallet_id)
        wallet.energy = wallet.energy + focus_time/60
        wallet.save()
        wallet.refresh_from_db()
    except Wallet.DoesNotExist:
        raise Http404()

    serializer = WalletSerializer(wallet)
    data = {'wallet': serializer.data, 'response': 'Wallet energy successfully updated' }
    return Response(data, status=status.HTTP_200_OK)