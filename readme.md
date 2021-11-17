# **CAPSTONE E-Car Hire**

## **Video Demo:**  <https://youtu.be/UupEu_e38s0>

## **Description**

**CAPSTONE E-Car Hire**
is a car hire booking system, that checks the availability and handles the booking of cars within a fleet, distributed across several locations.

It is a single page, responsive web app, designed using React/Javascript alongside AJAX requests sent to the Django back end, so that the page is dynamically updated and only reloads when necessary

All requests except logout are made using AJAX fetch requests, with POST requests having the csrf token added to the request header to improve cross site request forgery protection.

The Javascript History Api is used to update the URL and stateObj using pushstate and onpopstate which is configured to reload sections when using the back and forward buttons.

### **Technologies used:**

To build the web app I used the following languages, frameworks and libraries:

* Django
* Python
* Javascript
* React
* Bootstrap 5
* HTML
* SASS
* SQLite Database

### **Using the web app**

#### **Home**

This takes you to the main landing page, with cards linking to the "e-cars" and "all locations" pages.

#### **E-cars**

Clicking on the E-cars tab in the nav bar shows a list of all the available car types, along with details including their range, charging times and size. This list can be sorted by various options including price, range and charging time.

![gif1](https://user-images.githubusercontent.com/78767736/142284850-7ee06a54-aa12-446b-a424-1f64707ca3e8.gif)

#### **Locations**

Using the dropdown menu, you can access information about each car hire site, or a brief summary of all of the sites.

![capstone3](https://user-images.githubusercontent.com/78767736/142209504-dffd9752-9d3a-425b-bee3-707a1fd0b5d4.gif)

#### **Login/Register**

The login/register button in the nav bar shows the login/register section above any other content. The section can be hidden by clicking the "x" in the top right of the section.

#### **Search bar**

The search bar can be used from all sections of the web app.
The location is selected from a dropdown of available locations. While the "To" and "From" date-times are set using date pickers.
The min and max values for the "To" and "From" fields are dynamically updated using javascript, with the minimum pickup time being set to tomorrow 08:00.
Clicking the "Search" button will initiate the booking query.

![capstone](https://user-images.githubusercontent.com/78767736/142209104-15c05be9-8cc7-47a2-b274-7d4224086857.gif)

#### **Search results**

Once the search form has been submitted, the fields are checked for validity.
A summary of the search criteria is displayed above the results.
If all fields are valid, a list of available car models for the selected location and dates is displayed, along with information regarding the car model and its price. This list is returned in price ascending order but can be changed to be sorted to be price descending, range, charge time or size.
If no cars are available a warning is shown prompting a change to the search criteria is needed.
From the list of cars, a single model can be selected. This leads you to the pre-booking page.

#### **Pre-booking page**

The page shows a more comprehensive set of details about the car you have chosen and confirms the total price and per day breakdown.
If you are logged in, a button to book the car will be shown, which will book the car and lead you to a booking confirmation page.
If you are not logged in yet, the login/register section is displayed, and the "Book this car now" button is not available.

#### **Booking confirmation/summary**

If your booking is created successfully, you will be shown a booking confirmation with the option to cancel your booking from that page.
The booking confirmation page is also available via your profile section.
The booking confirmation page shows the unique booking reference number, price, location and date-times for the booking, as well as information regarding the car model you booked.

#### **Profile page**

The profile page can be accessed once logged in, via the nav bar/menu.
It has a button which shows a section where you can update your details, as well as a list of all the bookings you have made. Clicking on a booking in the list takes you to the Booking confirmation/summary page.

#### **Update personal details**

From the profile page, you can choose to update your details.
This includes a form where you can change your password, update your email and username, as well as add your first and last name.

## **How to run the application**

Clone the project

    git clone https://github.com/SailorGirl1234/CAPSTONE-CarHire.git

Create and start a a virtual environment

    virtualenv env --no-site-packages
    source env/bin/activate

Install the project dependencies:

    pip install -r requirements.txt

Run using python3 in your terminal:

    from django.core.management.utils import get_random_secret_key
    SECRET_KEY = get_random_secret_key()
    print(SECRET_KEY)

Create a new file called "local_settings.py" in /capstone.
Create a constant with the value of your secret key:

    DJANGO_SECRET_KEY = 'django-insecure-*YOUR SECRET KEY*'

From the root directory run:

    python3 manage.py makemigrations
    python3 manage.py migrate

The application can be run on Django's development server using:

    python3 manage.py runserver

### **Additional information**

The database has been populated with 3 locations, 12 car types and 24 cars (one of each type at 2 locations). One location was intentionally left without any cars assigned to simulate no cars being available.

## **What is contained in each file**

### **[models.py](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/models.py)**

models.py contains models including:

#### **Abstract User**

#### **Booking model**

* Booking Reference - Unique 9 characters assigned using a helper function
* User - Foreign Key
* Car - Foreign Key
* Pickup - Date Time
* Dropoff - Date Time
* Price

#### **Car**

* Car type - Foreign Key
* Location - Foreign Key

#### **Car Type**

Details about the car type including Char, Positive small int, URL and float fields.

#### **Location**

Details about the location including Char, Text, URL and Float fields.

#### **Opening Times**

* Location - Foreign Key
* Day - Choices field from a list of  tuples
* To and from hours
* Meta to define ordering and unique together

### **[views.py](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/views.py)**

views.py contains views including:

#### **Index**

#### **Login_AJAX**

Login via AJAX POST request - csrf token sent in request header, with JsonResponse return.

#### **Logout_view**

#### **Register**

Register via AJAX POST request - csrf token sent in request header, with JsonResponse return.

Validation checks run on username, passwords and email fields.

#### **Update_user**

Update user credentials via AJAX POST request - csrf token sent in request header, with JsonResponse return.

Logged in status and current password required to make any changes.

Any other field with changes is validated and then saved to User model.

#### **Cars**

AJAX GET request for all CarTypes.

#### **Location view**

AJAX GET request with parameter "code" in URL.

Either limited details for all Location entries returned with JsonResponse or full details for specific site returned.

Opening Times for each location serialized and added to serialize location data before response is sent.

#### **Search**

AJAX POST request with csrf token sent in header file.

Date time values from the search form are made "aware" with Greenwich timezone, helper function "awareTime" used.

Price for each cartype calculated using helper function "rate_factor".

Car type availability checked using "check_type_availability" helper function.

The resulting data and database queries are collected and serialized to be returned via JsonResponse.

#### **Select_car**

AJAX POST request with csrf token sent in header file.

CarType, location and dates used to check car type is still available. Full car details serialized and returned via JsonResponse.

#### **Book_car**

AJAX POST request with csrf token sent in header file.

User must be logged in to make a booking. CarType, location and dates used alongside user.username to create a new booking.

Each booking is given a randomly generated unique booking reference created using helper function "id_generator"

#### **Booking**

Login required. AJAX POST request with csrf token sent in header file. POST request used in order to use message from book_cars if being redirected to booking confirmation.

Booking id used to retrieve booking information. Booking and Car details serialized and returned via JasonResponse.

#### **Profile view**

Login required for AJAX GET request.

Returns a list of all bookings made by the user and the user's details.

#### **Cancel_booking**

Login required for AJAX GET request. Deletes booking using booking id from URL parameter.

### **[helpers.py](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/helpers.py)**

helpers.py contains helper functions to streamline repeated calculations and requests.

#### **Check availability**

Checks the availability of an individual car between the pickup and dropoff date-times.

Returns true only if there are no clashes with any existing bookings.

#### **Check type availability**

Checks the availability of a type of car at the specified location between the pickup and dropoff date-times.

Uses "check_availability" function to check each car of specified type at specified location.

Returns true is any car is available for requested booking.

#### **Hire duration**

Calculates duration of booking in days - includes part days as a full day.

#### **Weekend days**

Calculates the number of weekend days in the booking.

#### **Rate factor**

A function used to calculate the price for a booking, depending on duration, weekend days, car type and location.

#### **Aware Time**

Converts a naive time to an aware time.

#### **ID generator**

Creates a random 9 character (Uppercase and digit) string then checks it for uniqueness against existing booking references.

### **URLs**

URL patterns for all views and API routs.

### **Templates**

#### **[Layout.html](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/templates/carhire/layout.html)**

Layout.html includes links to bootstrap5, stylesheet and favicon, scripts to JSX/Babel, Bootstrap Javascript, React and my javascript files.

Nav bar and search bar in the body.

#### **[Index.html](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/templates/carhire/index.html)**

Index.html extends layout.html.
Sections include:

* messages - Where error and conformation messages are rendered
* login-view - Login and Register forms
* update_user - Update user information form
* main section - Where main content is rendered
* Select_car - Where search results and selected car summary is rendered

### **[static/react/src](https://github.com/SailorGirl1234/CAPSTONE-CarHire/tree/main/carhire/static/carhire/react/src)**

React files written and saved in static/react/src are compiled using Babel and are saved in static/react.

#### **[index.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/index.js)**

Sets event listeners, shows/hived various sections, changes active links in nav bar, updates min and max values for pickup and dropoff date/times in search date-pickers.

getCookie function from Django documentation, retrieves a cookie by name. Used to get the csrf token details for AJAX PUSH requests.

cancel_booking function sends AJAX get request to cancel a booking using the booking id and a parameter in the URL.

#### **[home.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/home.js)**

index_page() displays the landing page with two cards for content.

#### **[all_locations.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/all_locations.js)**

show_locations() fetches an AJAX GET request with the location code as a URL parameter.

It uses the result to ReactDOM.render location details in the main section. If the code is "all" it renders a list of locations and their information. Both a single location or all location have the opening hours rendered within their information.

Window history is also updated using history.pushstate.

#### **[e-cars.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/e-cars.js)**

all_cars() fetches a GET request and renders a list of all the carTypes and their details. It then updates the window history.

#### **[login.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/login.js)**

login(), register() and update_user() all use AJAX PUSH requests, with the csrf token added to the request the headers. Any resulting error messages are displayed using error_message() function. If there are no errors the page is then refreshed for the login and register functions.

#### **[error_message.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/error_message.js)**

Displays any messages sent as props in the "messages" div on the index page.

#### **[search.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/search.js)**

Uses data from either the search form or if from a onpopstate event, uses history.state to populate a AJAX POST after several validation checks. Uses the result to render a list of the cars available for the search.

History is updated using pushState or replaceState depending on the previous history state.

#### **[select_car.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/select_car.js)**

Sends AJAX POST request with csrf token in the header and uses the results to render carType and booking specific data.

If user is logged in, shows a "book car" button, else shows the login/register section.

#### **[book_car.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/book_car.js)**

Sends 2 AJAX POST requests, one to book the car, the second to get and then render the booking confirmation page via the booking_summary() function. Both send the csrf token in the request header.

The booking_summary() displays a success message if it is passed via book_car().

#### **[profile.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/profile.js)**

Sends an AJAX GET request and uses the results to render the main profile page and a list of bookings made by the user.

#### **[history.js](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/react/src/history.js)**

Popstate event listener and function to direct to correct function in order to load content depending on the stateObject page title.

### **[static/style.sass](https://github.com/SailorGirl1234/CAPSTONE-CarHire/blob/main/carhire/static/carhire/style.scss)**

SASS style sheet compiled to style.scc.
Contains styles used and color variables.

### **db.sqlite3**

Database populated with some data. Cars only populated for City Airport and Gatwick Airport locations.

### **Future development**

Further development ideas include:

* Configuring the login function to return to history state prior to login.
* Create user groups, and develop a "staff" side to the web application displaying which cars are due to be picked up/returned at specific locations that day and in the future.
