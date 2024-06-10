from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Event,ShowInfo,MasterUnit,Subunit,SupportUnit,OtherUnit


class ShowInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowInfo
        fields = '__all__'

class MasterUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterUnit
        fields = '__all__'

class SubunitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subunit
        fields = '__all__'

class SupportUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportUnit
        fields = '__all__'

class OtherUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OtherUnit
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    show_info = ShowInfoSerializer(many=True)
    masterunits = MasterUnitSerializer(many=True)
    subunits = SubunitSerializer(many=True)
    supportunits = SupportUnitSerializer(many=True)
    other_units = OtherUnitSerializer(many=True)

    class Meta:
        model = Event
        fields = '__all__'
    def create(self, validated_data):
        validated_data.pop('show_info', None)
        validated_data.pop('masterunits', None)
        validated_data.pop('subunits', None)
        validated_data.pop('supportunits', None)
        validated_data.pop('other_units', None)
        return Event.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        instance.show_info.all().delete()
        instance.masterunits.all().delete()
        instance.subunits.all().delete()
        instance.supportunits.all().delete()
        instance.other_units.all().delete()
        show_info_data = validated_data.pop('show_info', None)
        if show_info_data is not None:
            for show_info_item in show_info_data:
                show_info_item['event'] = Event.objects.get(uid=validated_data['uid'])
                ShowInfo.objects.create(**show_info_item)
        masterUnits = validated_data.pop('masterunits', None)
        if masterUnits is not None:
            for units in masterUnits:
                units['event'] = Event.objects.get(uid=validated_data['uid'])
                MasterUnit.objects.create(**units)
        subUnits = validated_data.pop('subunits', None)
        if subUnits is not None:
            for units in subUnits:
                units['event'] = Event.objects.get(uid=validated_data['uid'])
                Subunit.objects.create(**units)
        supportUnits = validated_data.pop('supportunits', None)
        if supportUnits is not None:
            for units in supportUnits:
                units['event'] = Event.objects.get(uid=validated_data['uid'])
                SupportUnit.objects.create(**units)
        otherUnits = validated_data.pop('other_units', None)
        if otherUnits is not None:
            for units in otherUnits:
                units['event'] = Event.objects.get(uid=validated_data['uid'])
                OtherUnit.objects.create(**units)
        uid = validated_data.pop('uid', None)
        instance.title = validated_data.pop('title',None)
        instance.category = validated_data.pop('category',None)
        instance.web_sales = validated_data.pop('web_sales',None)
        instance.source_web_promote = validated_data.pop('source_web_promote',None)
        instance.start_date = validated_data.pop('start_date',None)
        instance.end_date = validated_data.pop('end_date',None)
        instance.hit_rate = validated_data.pop('hit_rate',None)
        instance.source_web_name = validated_data.pop('source_web_name',None)
        instance.comment = validated_data.pop('comment',None)
        instance.show_unit = validated_data.pop('show_unit',None)
        instance.discount_info = validated_data.pop('discount_info',None)
        instance.descriptionFilterHtml = validated_data.pop('descriptionFilterHtml',None)
        instance.imageUrl = validated_data.pop('imageUrl',None)
        instance.save()
        return instance




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs = {"password":{"write_only":True}}
    
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user