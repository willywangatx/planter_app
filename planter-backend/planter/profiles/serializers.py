from rest_framework import serializers 
from .models import Profile 
# from timers.models import Timer
# from accounts.models import Account 

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='account.username', read_only=True)
    email = serializers.EmailField(source='account.email', read_only=True)
    timer = serializers.RelatedField(many=True, read_only=True)
    # focus_time = serializers.RelatedField(source='timer', read_only=True)


    # focus_time = serializers.IntegerField(source='timer_set.focus_time', read_only=True)

    # focus_time = Profile.objects.select_related('timer__focus_time').get(id=<Profile.id>)

    #  def get_timer_data(self, obj):
    #     timer = set()
    #     for e in 
    #         Profile.objects.filter(id=self.profile).select_related('timer')


    # focus_time = serializers.IntegerField(source='Timer.focus_time', read_only=True)
    # focus_time = serializers.SerializerMethodField()

    # external_id = serializers.UUIDField(source='account.external_id', read_only=True)

    class Meta: 
        model = Profile
        fields = ['id', 'username', 'email', 'timer']

   