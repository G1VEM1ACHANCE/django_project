# insert_data.py
import json
from django.core.management.base import BaseCommand
from operation.models import Event, Subunit, ShowInfo, MasterUnit,SupportUnit,OtherUnit
from datetime import datetime

def translate_date(date):
    return datetime.strptime(date, "%Y/%m/%d").strftime("%Y-%m-%d")

def translate_time(time):
    return datetime.strptime(time, "%Y/%m/%d %H:%M:%S").strftime("%Y-%m-%d %H:%M:%S")

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        with open('out.json', 'r') as f:
            data = json.load(f)
            for item in data:
                event = Event.objects.create(
                    version=item['version'],
                    uid=item['UID'],
                    title=item['title'],
                    category=item['category'],
                    web_sales = item['webSales'],
                    source_web_promote = item['sourceWebPromote'],
                    start_date = translate_date(item['startDate']),
                    end_date = translate_date(item['endDate']),
                    hit_rate = item['hitRate'],
                    source_web_name = item['sourceWebName'],
                    comment = item['comment'],
                    edit_modify_date = None if item['editModifyDate'] == "" else translate_time(item['editModifyDate']),
                    show_unit = item['showUnit'],
                    discount_info = item['discountInfo'],
                    descriptionFilterHtml = item['descriptionFilterHtml'],
                    imageUrl = item['imageUrl'],
                )
                for unit_name in item['subUnit']:
                    Subunit.objects.create(event=event, unit_name=unit_name)
                for unit_name in item['masterUnit']:
                    MasterUnit.objects.create(event=event, unit_name=unit_name)
                for unit_name in item['supportUnit']:
                    SupportUnit.objects.create(event=event, unit_name=unit_name)
                for unit_name in item['otherUnit']:
                    OtherUnit.objects.create(event=event, unit_name=unit_name)
                    
                
                for show_info_item in item['showInfo']:
                    ShowInfo.objects.create(
                        event=event,
                        time=translate_time(show_info_item['time']),
                        location=show_info_item['location'],
                        location_name=show_info_item['locationName'],
                        on_sales=show_info_item['onSales'],
                        price=show_info_item['price'],
                        latitude=show_info_item['latitude'],
                        longitude=show_info_item['longitude'],
                        end_time=translate_time(show_info_item['endTime']),
                    )
