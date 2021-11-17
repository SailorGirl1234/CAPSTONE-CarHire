from django.contrib import admin
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email")

class CarTypeAdmin(admin.ModelAdmin):
    list_display = ("make", "model", "range", "charge_time", "seats", "storage", "price")

class LocationAdmin(admin.ModelAdmin):
    list_display = ("code", "site", "postcode", "tel")

class OpeningTimesAdmin(admin.ModelAdmin):
    list_display = ("location", "day", "hours_from", "hours_to")

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Booking)
admin.site.register(Car)
admin.site.register(CarType, CarTypeAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(OpeningTimes, OpeningTimesAdmin)
