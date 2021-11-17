import pytz
import random
import string
from datetime import datetime, date, timedelta
from django.utils.timezone import make_aware

from carhire.models import Car, Booking

def check_availability(car, pickup, dropoff):
    avail_list = []
    booking_list = Booking.objects.filter(car=car)
    # Check against each booking for a clash
    for booking in booking_list:
        if booking.pickup > dropoff or booking.dropoff < pickup:
             avail_list.append(True)
        else:
            avail_list.append(False)
    # If no clashes detected return True
    return all(avail_list)

def check_type_availability(cartype, location, pickup, dropoff):
    # List of cars of that type at that location
    car_list = Car.objects.filter(type=cartype).filter(location=location)
    available_cars = []
    # If any of the cars are available make note of the id number
    for car in car_list:
        if check_availability(car, pickup, dropoff):
            available_cars.append(car.id)
    return available_cars


def hire_duration(pickup, dropoff):
    duration = dropoff - pickup
    days = duration.days
    # Any part days counted as a full day of hire
    if duration - timedelta(days=days) > timedelta(minutes=1):
        days += 1
    return days


def weekendDays(pickup, dropoff):
    # convert to just a date
    start = datetime.date(pickup)
    end = datetime.date(dropoff)
    # Check and keep count of the number of weeked days
    # include both start and end date 
    weekend_days = 0
    while start <= end:
        # check if weekday is saturday(5) or sunday(6)
        if date.weekday(start) == 5 or  date.weekday(start) == 6:
            weekend_days += 1
        start += timedelta(days=1)
    
    return weekend_days


def rate_factor(pickup, dropoff, location_factor):
    
    #Calculate day rate factor
    weekend_factor = 1.02
    # Calculate duration and weekend days
    duration = hire_duration(pickup, dropoff)
    weekend_days = weekendDays(pickup, dropoff)

    # If weekend days exceeds duration (pickup sat, dropoof sun) 
    # adjust weekend day count and add 5% to weekend factor
    if weekend_days > duration:
        weekend_days = duration
        weekend_factor+= 0.05
    weekdays = duration - weekend_days

    rate_factor = ((weekdays + (weekend_days * weekend_factor)) * location_factor) / duration

    data = {
        "duration": duration,
        "weekend_days": weekend_days,
        "rate_factor": rate_factor
        }
    
    return data

def awareTime(pickup, dropoff):
    # Make pickup and dropoff times aware - London timezone
    tz = pytz.timezone('Etc/Greenwich')
    try:
        try:
            pickup = datetime.strptime(pickup, '%Y-%m-%dT%H:%M')
            dropoff = datetime.strptime(dropoff, '%Y-%m-%dT%H:%M')
            pickup = make_aware(pickup, tz, True)
            dropoff = make_aware(dropoff, tz, True)
        except:
            pickup = datetime.strptime(pickup, '%Y-%m-%dT%H:%M:%SZ')
            dropoff = datetime.strptime(dropoff, '%Y-%m-%dT%H:%M:%SZ')
            pickup = make_aware(pickup, tz, True)
            dropoff = make_aware(dropoff, tz, True)
    except:
        return {"error": "Unrecognised date-time format"}
    if dropoff <= pickup:
        return {"error": "Dropoff must be after Pickup time."}
    data = {
        "pickup": pickup,
        "dropoff": dropoff
    }
    return data

def id_generator():
    ref = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(9))
    try:
        booking = Booking.objects.get(booking_ref=ref)
        id_generator()
    except:
        return ref
    