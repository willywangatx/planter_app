from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import Response
from rest_framework import status 
from .serializers import AccountSerializer 
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect 
import json 

# from rest_framework import status

# # registration form imports
# from django.shortcuts import redirect
# from django.contrib.auth import login, authenticate 
# from accounts.forms import RegistrationForm

# Create your views here.
@api_view(['POST'])
@permission_classes([AllowAny])
def create_account(request):
    # import pdb 
    # # python debugger 
    # pdb.set_trace()
    
    serializer = AccountSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    # return of user in create_user account manager in models.py
    account = serializer.save()

    refresh = RefreshToken.for_user(account)
    tokens = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    data = {'account': serializer.data, 'tokens': tokens}
    return Response(data, status=status.HTTP_201_CREATED)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def read_account(request):
    # request.user for backend because i'm only getting auth user data 
    # request.user.profile 
    account = AccountSerializer(request.user)
    return Response(account.data)



    # create token mannually - return serialized represntations of 
    # new refresh and access token for given user 

    # Should i split the create account and the login logic? - if so, remove token creation from view
    # refresh = RefreshToken.for_user(account)
    # return {
    #     'refresh': str(refresh),
    #     'access': str(refresh.access_token),
    # }

    # how to pass data with the redirect? ie User succesfully crated 

 


    # redirect user to the login page if registration successful with notice that account was created
    # or throw an error if unable to create account and notify 

    # return redirect('api/login/')




# def registration_view(request):
#     context = {}
#     if request.POST:
#         form = RegistrationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             email = form.cleaned_data.get('email')
#             raw_password = form.cleaned_data.get('password1')
#             account = authenticate(email=email, password=raw_password)
#             login (request, account)
#             return redirect('home')
#         else:
#             # passing form to template to display errors
#             context['registration_form'] = form
#     else: # GET request 
#         form = RegistrationForm()
#         context['registration_form'] = form
#     return render(request, 'accounts/register.html', context)




#register user 
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def create_account(request):
#     #add a name field: combine first and last name 
#     email = request.data.get('email')
#     username = request.data.get('username')
#     password = request.data.get('password')

#     user = User.objects.create_user(username, email, password)
#     user.save()

#     return Response("account created", status=status.HTTP_201_CREATED)







# # unauthenticated home page 
# def index(request):
#     return HttpResponse("Index View")

# # authenticated home/profile page
# @login_required 
# def home(request):
#     return render(request, "home.html", {})


# def register(request):
#     if request.method == 'POST':
#         form = UserCreationForm(require.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data['username']
#             password = form.cleaned_data['password1']
#             user = authenticate(username=username=username,password=password)
#             login(request, user)
#             return redirect('index')
#     else:
#     form = UserCreatedForm()
#     context = {'form': form}
#     return render(request, )

# def login(request): 
#     return HttpResponse("Login Page")