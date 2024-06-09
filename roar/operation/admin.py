from django.contrib import admin

from .models import Event, ShowInfo, MasterUnit, Subunit, SupportUnit, OtherUnit

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'start_date', 'end_date')
    search_fields = ('title', 'category', 'source_web_name')
    list_filter = ('category', 'start_date', 'end_date')

@admin.register(ShowInfo)
class ShowInfoAdmin(admin.ModelAdmin):
    list_display = ('event', 'time', 'location', 'location_name', 'on_sales')
    search_fields = ('location', 'location_name')
    list_filter = ('on_sales', 'time')

@admin.register(MasterUnit)
class MasterUnitAdmin(admin.ModelAdmin):
    list_display = ('event', 'unit_name')
    search_fields = ('unit_name',)
    list_filter = ('event',)

@admin.register(Subunit)
class SubunitAdmin(admin.ModelAdmin):
    list_display = ('event', 'unit_name')
    search_fields = ('unit_name',)
    list_filter = ('event',)

@admin.register(SupportUnit)
class SupportUnitAdmin(admin.ModelAdmin):
    list_display = ('event', 'unit_name')
    search_fields = ('unit_name',)
    list_filter = ('event',)

@admin.register(OtherUnit)
class OtherUnitAdmin(admin.ModelAdmin):
    list_display = ('event', 'unit_name')
    search_fields = ('unit_name',)
    list_filter = ('event',)
