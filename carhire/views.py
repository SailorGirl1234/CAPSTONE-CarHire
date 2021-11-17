import json
import random
from django.contrib.auth import authenticate, login, logout, password_validation, validators
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import Booking, Car, CarType, Location, OpeningTimes, User
from .helpers import check_type_availability, hire_duration, rate_factor, awareTime, id_generator





# Create your views here

def index(request, message=None):
    locations = Location.objects.all()
    all_locations = []
    for location in locations:
        all_locations.append({"site": location.site, "code": location.code })
    return render(request, "carhire/index.html", {
        "message": message,
        "locations": all_locations
    })


def login_AJAX(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return JsonResponse({"message": "Successfully logged in."})

        else:
            return JsonResponse({
                "error": "Invalid username and/or password.",
            })
    else:
        return HttpResponseRedirect(reverse('index'))

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        try:
            validators.UnicodeUsernameValidator(username)
        except ValidationError as e:
            errors = []
            for error in e:
                errors.append(error)
            return JsonResponse({"error": errors}, safe=False)
        if username == "":
            return JsonResponse({
                "error": "Please enter a valid username to register.",
            })
        email = request.POST["email"]
        try:
            validate_email(email)
        except:
            return JsonResponse({
                "error": "Please enter a valid email to register.",
            })

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return JsonResponse({
                "error": "Passwords must match.",
            })
        try:
            password_validation.validate_password(password)
        except ValidationError as e:
            errors = []
            for error in e:
                errors.append(error)
            return JsonResponse({"error": errors}, safe=False)

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({"error": "Username already taken."})

        login(request, user)
        return JsonResponse({"message": "Successfully logged in."})
          
    else:
        return HttpResponseRedirect(reverse('index'))


@login_required
def update_user(request):
    if request.method == 'POST':
        username = request.user
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        if user == None:
            return JsonResponse({"error": "Invalid username and/or password."})
        
        # If new password was selected
        newPassword = request.POST["new-password"]
        if newPassword != "":
            confPassword = request.POST["confirm-password"]
            if newPassword != confPassword:
                return JsonResponse({"error": "New password and password confirmation do not match"})

            try:
                password_validation.validate_password(newPassword)
            except ValidationError as e:
                errors = []
                for error in e:
                    errors.append(error)
                return JsonResponse({"error": errors}, safe=False)
            user.set_password(newPassword)

        #If new email was changed
        email = request.POST["email"]
        if email != user.email:
            try:
                validate_email(email)
            except ValidationError as e:
                errors = []
                for error in e:
                    errors.append(error)
                return JsonResponse({"error": errors}, safe=False)
            user.email = email

        #If username is changed
        new_username = request.POST["new-username"]
        if new_username != "":
            try:
                username_taken = User.objects.get(username=new_username)
                return JsonResponse({"error": "Username unavailable."})
            except User.DoesNotExist:
                try:
                    validators.UnicodeUsernameValidator(new_username)
                except ValidationError as e:
                    errors = []
                    for error in e:
                        errors.append(error)
                    return JsonResponse({"error": errors}, safe=False)
            user.username = new_username

        # If first name was added or changed
        first_name = request.POST["first-name"]
        if first_name != user.first_name:
            try:
                validators.UnicodeUsernameValidator(first_name)
            except ValidationError as e:
                errors = []
                for error in e:
                    errors.append(error)
                return JsonResponse({"error": errors}, safe=False)
            user.first_name = first_name

        # If surname name was added or changed
        surname = request.POST["surname"]
        if surname != user.last_name:
            try:
                validators.UnicodeUsernameValidator(surname)
            except ValidationError as e:
                errors = []
                for error in e:
                    errors.append(error)
                return JsonResponse({"error": errors}, safe=False)
            user.last_name = surname

        try:
            user.save()
            body = user.serialize()
            return JsonResponse({"error": "Changes saved succesfully.", "body": body}, safe=False)
        except:
            return JsonResponse({"error": "Could not save changes."}, safe=False)


# Overview of all cars
def cars(request):
    cars = CarType.objects.all()
    body = [car.serialize() for car in cars]
    return JsonResponse({"body": body}, safe=False)


def location(request, code):
    # All locations page
    if code == "all":
        locationsList = []
        # Get opening hours
        hoursQset = OpeningTimes.objects.all()

        # organise and serialize info for each location
        locations = Location.objects.all()
        for location in locations:
            # Get opening hours for each location
            openhours = hoursQset.filter(location=location)
            openhours = [hours.serialize() for hours in openhours]
            locations = location.serialize()

            # Remove unecessary details
            locations.pop("details")
            # Add opening hours
            locations.update({"hours": openhours})
            # Add to locations list
            locationsList.append(locations)

        return JsonResponse({
                "code": code,
                "body": locationsList
            })

    # Individual location
    else:
        # Try get location data
        try:
            location = Location.objects.get(code=code)
        except Location.DoesNotExist:
            print("not found")
            return JsonResponse({
                "error": "Location not found."
            })

        hoursQset = OpeningTimes.objects.filter(location=location)
        location = location.serialize()
        hours = [hours.serialize() for hours in hoursQset]
        location.update({"hours": hours})

        return JsonResponse({
                "code": code,
                "body": location
            })


def search(request):
    # search must be via POST request
    if request.method != 'POST':
        return JsonResponse({'error': 'POST request required'})

    # Get search parameters
    data = json.loads(request.body)
    location = data["location"]
    pickup = data["pickup"]
    dropoff = data["dropoff"]


    # Get location specific data
    try:
        location = Location.objects.get(code=location)
    except Location.DoesNotExist:
        return JsonResponse({"error": "Location not found."})
    location_factor = location.price_factor

    # Make pickup and dropoff times aware - London timezone
    awareTimes = awareTime(pickup, dropoff)
    if "error" in awareTimes:
        return JsonResponse({"error": "Unrecognised date-time format"})
    pickup = awareTimes["pickup"]
    dropoff = awareTimes["dropoff"]

    factors = rate_factor(pickup, dropoff, location_factor)

    cars = CarType.objects.all()
    available_cars =[]
    for car in cars:
        if len(check_type_availability(car, location, pickup, dropoff)) > 0:
            car.price *= factors["rate_factor"]
            available_cars.append(car)

    # Stringify pickup and dropoff 
    pickup_str = pickup.strftime("%a, %b %d %Y, %I:%M %p")
    dropoff_str = dropoff.strftime("%a, %b %d %Y, %I:%M %p")

    info = {
        "duration": factors["duration"],
        "weekend_days": factors["weekend_days"],
        "pickup": pickup_str,
        "pickup_value": pickup,
        "dropoff": dropoff_str,
        "dropoff_value": dropoff,
        "location_name": location.site,
        "location_code": location.code,
        "factor": factors["rate_factor"],
    }

    body = [car.serialize() for car in available_cars]
    for car in body:
        car.update({"duration": factors["duration"]})
    return JsonResponse({"info": info, "body": body}, safe=False)


def select_car(request):
    if request.method == "POST":
        data = json.loads(request.body)
        # Get car
        car = data["car"]
        try:
            car = CarType.objects.get(pk=car)
        except CarType.DoesNotExist:
            return JsonResponse({"error": "Car type not found."})
        # Get location
        location = data["location"]
        try:
            location = Location.objects.get(code=location)
        except Location.DoesNotExist:
            return JsonResponse({"error": "Location not found."})
        
        # Get pickup/dropoff times
        pickup = data["pickup"]
        dropoff = data["dropoff"]
        # Make pickup and dropoff times aware - London timezone
        awareTimes = awareTime(pickup, dropoff)
        if "error" in awareTimes:
            return JsonResponse({"error": "Unrecognised date-time format"})
        pickup = awareTimes["pickup"]
        dropoff = awareTimes["dropoff"]

        # Check car is still available
        if not len(check_type_availability(car, location, pickup, dropoff)) > 0:
            return JsonResponse({"error": "Car no longer available"})

        # Get total price
        duration = hire_duration(pickup, dropoff)
        factor = float(data["factor"])
        try:
            car.price *= factor
            total_price = car.price * duration
        except:
            return JsonResponse({"error": "Unable to calculate booking price"})
        car = car.serialize()
        car.update({"total_price": total_price})
        return JsonResponse({"body": [car]}, safe=False)


def book_car(request):
    if request.method == "POST":
        
        data = json.loads(request.body)
        # Get location
        location = data["location"]
        try:
            location = Location.objects.get(code=location)
        except Location.DoesNotExist:
            return JsonResponse({"error": "Location not found."})
        
        # Get car type
        cartype = data["car"]
        try:
            cartype = CarType.objects.get(id=cartype)
        except Location.DoesNotExist:
            return JsonResponse({"error": "Car make/model not found."})

        price = float(data["price"])

        # Get pickup date-time
        pickup = data["pickup"]
        dropoff = data["dropoff"]

        # Make pickup and dropoff times aware - London timezone
        awareTimes = awareTime(pickup, dropoff)
        if "error" in awareTimes:
            return JsonResponse({"error": "Unrecognised date-time format"})
        pickup = awareTimes["pickup"]
        dropoff = awareTimes["dropoff"]


        # if user not authenticated - log in/register
        if not request.user.is_authenticated:
                return JsonResponse({"error": "Login/Register to make booking."})        
        else:
            user = request.user
            # check type is still available
            available_cars = check_type_availability(cartype, location, pickup, dropoff)
            if len(available_cars) == 0:
                return JsonResponse({"error": "Car no longer available"})
            # Pick an available car of that type at random
            car = random.choice(available_cars)
            car = Car.objects.get(pk=car)

            ref = id_generator()

            try:
                booking = Booking(
                    booking_ref=ref,
                    user=user,
                    car=car,
                    pickup=pickup,
                    dropoff=dropoff,
                    price=price,
                )
                booking.save()
            except:
                return JsonResponse({"error": "Unable to make booking."})

            return JsonResponse({"message": "Booking created successfully", "booking_id": booking.id})
  
        
@login_required
def booking(request, id):
    if request.method == 'POST':
        data = json.loads(request.body)
        booking_id = id
        try:
            booking = Booking.objects.get(id=booking_id)
        except Booking.DoesNotExist:
            return JsonResponse({"error": "Booking not found."})
        
        # Check logged in user is booking user
        if request.user != booking.user:
            return JsonResponse({"error": "Only the user who created the original booking can view the booking details."})
        
        # Get car type info
        car = booking.car.type.id
        car = CarType.objects.get(id=car)
        car= car.serialize()

        booking = booking.serialize()
        body = {
                "booking": booking,
                "car": car,
            }
        if "message" in data:
            body["message"] = data["message"]

        return JsonResponse(body)


@login_required
def profile(request):
    user = request.user
    # Get user info
    try:
        user_profile = User.objects.get(username=user)
    except User.DoesNotExist:
        return JsonResponse({"error": "User could not be found."})

    # Get user's bookings
    try:
        bookings = Booking.objects.filter(user=user_profile).order_by("-pickup")
    except:
        return JsonResponse({"error": "Bookings could not be found."})
    
    body = [booking.serialize() for booking in bookings]

    info = user.serialize()

    return JsonResponse({"body": body, "info": info})


@login_required
def cancel_booking(request, id):
        try:
            booking = Booking.objects.get(id=id)
        except Booking.DoesNotExist:
            return JsonResponse({"error": "Could not find booking."})
        if request.user != booking.user:
            return JsonResponse({"error": "Only the booking creator cancel the booking."})
        booking_ref = booking.booking_ref
        try:
            booking.delete()
        except:
            return JsonResponse({"error": f"Could not delete booking #{booking_ref}"})
        return JsonResponse({"message": f"Booking #{booking_ref} canceled."})

