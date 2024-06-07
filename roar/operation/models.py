from django.db import models

class Event(models.Model):
    version = models.CharField(max_length=10)
    uid = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=10)
    web_sales = models.URLField(blank=True)
    source_web_promote = models.URLField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    hit_rate = models.IntegerField()
    source_web_name = models.CharField(max_length=255)
    comment = models.TextField(blank=True)
    edit_modify_date = models.DateTimeField(blank=True,null=True)
    show_unit = models.CharField(blank=True,max_length=100)
    discount_info = models.TextField(blank=True)
    descriptionFilterHtml = models.TextField(blank=True)
    imageUrl = models.URLField(blank=True)



class ShowInfo(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='show_info')
    time = models.DateTimeField()
    location = models.CharField(max_length=255)
    location_name = models.CharField(max_length=255)
    on_sales = models.CharField(max_length=1)
    price = models.CharField(max_length=50,blank=True)
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    end_time = models.DateTimeField()

class MasterUnit(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='masterunits')
    unit_name = models.CharField(max_length=255)

    def __str__(self):
        return self.unit_name

class Subunit(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='subunits')
    unit_name = models.CharField(max_length=255)

    def __str__(self):
        return self.unit_name
    
class SupportUnit(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='supportunits')
    unit_name = models.CharField(max_length=255)

    def __str__(self):
        return self.unit_name

class OtherUnit(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='other_units')
    unit_name = models.CharField(max_length=255)

    def __str__(self):
        return self.unit_name