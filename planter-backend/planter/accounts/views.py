from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response
from rest_framework import status 
from .serializers import AccountSerializer 
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect 
# import json 


@api_view(['POST'])
@permission_classes([AllowAny])
def create_account(request):
    
    serializer = AccountSerializer(data=request.data)

    # wrap in try catch block 
    # serializer.is_valid(raise_exception=True)
    if not serializer.is_valid():
        serializer.errors
        return Response(serializer.errors, status.HTTP_500_INTERNAL_SERVER_ERROR)

    account = serializer.save()
    refresh = RefreshToken.for_user(account)
    tokens = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    data = {'account': serializer.data, 'tokens': tokens, 'response': 'Account successfully created.'}
    return Response(data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_account(request):
    serializer = AccountSerializer(data=request.data)

    if not serializer.is_valid():
        serializers.errors
        return Response(serializer.errors, status=HTTP_500_INTERNAL_SERVER_ERROR)
    
    account = serializer.save()
    refresh = RefreshToken.for_user(account)
    tokens = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    data = {'account': serializer.data, 'tokens': tokens, 'response': 'Account successfully updated.'}
    return Response(data, status=status.HTTP_200_OK)

    
    
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def read_account(request):
#     # request.user for backend because i'm only getting auth user data 
#     # request.user.profile 
#     account = AccountSerializer(request.user)
#     return Response(account.data)
















