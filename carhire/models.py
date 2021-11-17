from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.deletion import CASCADE


class User(AbstractUser):
    def __str__(self):
        return f"{self.username}"
    
    def serialize(self):
        return {
            "username": self.username,
            "email": self.email,
            "name": self.first_name,
            "surname": self.last_name
        }

class Booking(models.Model):
    booking_ref = models.CharField(max_length=9, unique=True)
    user = models.ForeignKey("User", on_delete=CASCADE, related_name="bookings")
    car = models.ForeignKey("Car", on_delete=CASCADE, related_name="bookings")
    pickup = models.DateTimeField()
    dropoff = models.DateTimeField()
    price = models.FloatField()

    def __str__(self):
        return f"{self.user} has booked a {self.car} from {self.pickup} to {self.dropoff}"

    def serialize(self):
        return {
            "id": self.id,
            "ref": self.booking_ref,
            "user": self.user.username,
            "car": self.car.type.make + "-" +self.car.type.model,
            "pickup": self.pickup,
            "dropoff": self.dropoff,
            "location_site": self.car.location.site,
            "location_code": self.car.location.code,
            "price": self.price,
            "photo": self.car.type.image
        }


class Car(models.Model):
    type = models.ForeignKey("CarType", on_delete=CASCADE, related_name="cars")
    location = models.ForeignKey("Location", on_delete=CASCADE, related_name="cars")

    def __str__(self):
        return f"{self.id} ({self.type} - {self.location})"
    

class CarType(models.Model):
    make = models.CharField(max_length=64)
    model = models.CharField(max_length=64)
    range = models.PositiveSmallIntegerField()
    charge_time = models.PositiveSmallIntegerField()
    seats = models.PositiveSmallIntegerField()
    storage = models.PositiveSmallIntegerField()
    image = models.URLField()
    price = models.FloatField()

    def serialize(self):
        return {
            "id": self.id,
            "make": self.make,
            "model": self.model,
            "range": self.range,
            "charge_time": self.charge_time,
            "seats": self.seats,
            "storage": self.storage,
            "image": self.image,
            "price": self.price,
        }
    
    def __str__(self):
        return f"{self.make} - {self.model}"


class Location(models.Model):
    code = models.CharField(max_length=4)
    site = models.CharField(max_length=64)
    address = models.TextField()
    postcode = models.CharField(max_length=8)
    tel = models.CharField(max_length=32)
    map = models.CharField(max_length=64, blank=True)
    info = models.TextField(blank=True)
    about = models.TextField(blank=True)
    photo = models.URLField(blank=True)
    lat = models.FloatField(blank=True)
    long = models.FloatField(blank=True)
    price_factor = models.FloatField(default=1)
    
    def __str__(self):
        return f"{self.site} ({self.code})"

    def serialize(self):
        return {
            "code": self.code,
            "site": self.site,
            "address": self.address,
            "postcode": self.postcode,
            "tel": self.tel,
            "info": self.info,
            "map": self.map,
            "details": {
                "about": self.about,
                "photo": self.photo,
                "lat": self.lat,
                "long": self.long,
            }
        }


DAYS = [
  (1, ("Monday")),
  (2, ("Tuesday")),
  (3, ("Wednesday")),
  (4, ("Thursday")),
  (5, ("Friday")),
  (6, ("Saturday")),
  (7, ("Sunday")),
  (8, ("Holidays"))
]

class OpeningTimes(models.Model):
    location = models.ForeignKey("Location", on_delete=models.CASCADE, related_name="opening_hours")
    day = models.IntegerField(choices=DAYS)
    hours_from = models.TimeField()
    hours_to = models.TimeField()

    class Meta:
        ordering = ("location", "day", "hours_from")
        unique_together = ("location", "day", "hours_from", "hours_to")
    
    def serialize(self):
        return {
            "location": self.location.code,
            "day": self.get_day_display(),
            "from": self.hours_from.strftime("%H:%M"),
            "to": self.hours_to.strftime("%H:%M"),
        }