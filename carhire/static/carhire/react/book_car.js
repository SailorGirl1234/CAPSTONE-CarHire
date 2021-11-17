// Book car via AJAX POST request
function book_car(id) {
    // Get location, pickup, dropoff, price factor and price values
    var location = document.querySelector("#booking_location").value;
    var pickup = document.querySelector("#booking_pickup").value;
    var dropoff = document.querySelector("#booking_dropoff").value;
    var factor = document.querySelector("#booking_factor").value;
    var price = document.querySelector("#booking_price").value;

    // Set csrf token value in request header
    var csrftoken = getCookie('csrftoken');
    var request = new Request(
    /* URL */'/book_car', { headers: { 'X-CSRFToken': csrftoken } });
    fetch(request, {
        method: 'POST',
        body: JSON.stringify({
            location: location,
            pickup: pickup,
            dropoff: dropoff,
            factor: factor,
            car: id,
            price: price
        })
    }).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log(result);

        // If an error is returned
        if (result.error) {
            error_message(result.error);
            return false;
        }

        // Show confirmation page - result.message contained in result
        booking_summary(result);
    });
}

// Booking success message
function Message() {
    return React.createElement(
        "div",
        { className: "alert mt-2 alert-success", role: "alert" },
        React.createElement(
            "h4",
            { className: "alert-heading" },
            React.createElement(
                "svg",
                { xmlns: "http://www.w3.org/2000/svg", width: "38", height: "38", fill: "currentColor", className: "bi bi-check2-circle m-2 ms-0", viewBox: "0 0 16 16" },
                React.createElement("path", { d: "M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" }),
                React.createElement("path", { d: "M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" })
            ),
            "Success!"
        ),
        React.createElement(
            "p",
            { className: "mb-0" },
            "Your booking has been confirmed!",
            React.createElement("br", null),
            "Please check the booking details below carefully."
        )
    );
}

// Booking confirmation page
function BookingElement(props) {
    var booking = props.result.booking;
    var car = props.result.car;
    var p = new Date(booking.pickup);
    var pickup = p.toUTCString();
    var d = new Date(booking.dropoff);
    var dropoff = d.toUTCString();

    var tick = React.createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", color: "green", fill: "currentColor", className: "bi bi-check-circle me-2", viewBox: "0 0 16 16" },
        React.createElement("path", { d: "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" }),
        React.createElement("path", { d: "M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" })
    );

    return React.createElement(
        "div",
        { className: "mx-2" },
        React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col-sm-8 col-12" },
                React.createElement(
                    "h1",
                    { className: "display-6" },
                    "Hi ",
                    booking.user,
                    ", "
                ),
                React.createElement(
                    "h1",
                    { className: "display-6 mb-4" },
                    "Your reservation is confirmed."
                )
            ),
            React.createElement(
                "div",
                { className: "col-sm-3 col-12 mb-4 mt-auto d-flex justify-content-center justify-content-sm-start" },
                React.createElement(
                    "button",
                    { className: "btn btn-danger yellow btn-lg", onClick: function onClick() {
                            return cancel_booking(booking.id);
                        } },
                    "Cancel Booking"
                )
            )
        ),
        React.createElement("hr", null),
        React.createElement(
            "div",
            { className: "row mb-4 d-flex align-items-center" },
            React.createElement(
                "div",
                { className: "col-sm-6 col-12 mb-2" },
                React.createElement(
                    "dl",
                    { className: "row lead" },
                    React.createElement(
                        "dt",
                        { className: "col-sm-5" },
                        "Booking Reference:"
                    ),
                    React.createElement(
                        "dt",
                        { className: "col-sm-7 mb-2" },
                        booking.ref
                    ),
                    React.createElement(
                        "dt",
                        { className: "col-sm-5" },
                        "Price:"
                    ),
                    React.createElement(
                        "dd",
                        { className: "col-sm-7" },
                        "\xA3 ",
                        booking.price
                    ),
                    React.createElement(
                        "dt",
                        { className: "col-sm-5" },
                        "Location:"
                    ),
                    React.createElement(
                        "dd",
                        { className: "col-sm-7" },
                        React.createElement(
                            "a",
                            { onClick: function onClick() {
                                    return show_locations(booking.location_code);
                                }, className: "link-secondary" },
                            "London ",
                            booking.location_site
                        )
                    ),
                    React.createElement(
                        "dt",
                        { className: "col-sm-5" },
                        "Pickup:"
                    ),
                    React.createElement(
                        "dd",
                        { className: "col-sm-7" },
                        pickup
                    ),
                    React.createElement(
                        "dt",
                        { className: "col-sm-5" },
                        "Dropoff:"
                    ),
                    React.createElement(
                        "dd",
                        { className: "col-sm-7" },
                        dropoff
                    ),
                    React.createElement(
                        "dt",
                        { className: "col-sm-5" },
                        "Car:"
                    ),
                    React.createElement(
                        "dd",
                        { className: "col-sm-7" },
                        car.make,
                        " ",
                        car.model
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "col-auto mx-auto" },
                React.createElement(
                    "div",
                    { className: "border border-2 p-4" },
                    React.createElement(
                        "h4",
                        { className: "text-center" },
                        "Your car pick-up checklist"
                    ),
                    React.createElement(
                        "h5",
                        { className: "text-muted" },
                        "You'll need these to pick up the car:"
                    ),
                    React.createElement(
                        "ul",
                        { className: "list-unstyled" },
                        React.createElement(
                            "li",
                            null,
                            tick,
                            " Credit card in main driver's name"
                        ),
                        React.createElement(
                            "li",
                            null,
                            tick,
                            " Driving Licence Identification"
                        ),
                        React.createElement(
                            "li",
                            null,
                            tick,
                            " Booking Reference"
                        )
                    )
                )
            )
        ),
        React.createElement("hr", null),
        React.createElement(
            "div",
            { className: "row mt-4" },
            React.createElement(
                "div",
                { className: "col-sm-6 col-12 order-1 py-2 text-center text-sm-start" },
                React.createElement(
                    "a",
                    { href: car.image },
                    React.createElement("img", { src: car.image, className: "car_image" })
                )
            ),
            React.createElement(
                "div",
                { className: "col-sm-6 col-12 order-2" },
                React.createElement(
                    "table",
                    { className: "table table-hover" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Car"
                            ),
                            React.createElement(
                                "td",
                                null,
                                car.make,
                                " ",
                                car.model
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Range"
                            ),
                            React.createElement(
                                "td",
                                null,
                                car.range,
                                " miles"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Charge Time",
                                React.createElement("br", null),
                                "(0-80%)"
                            ),
                            React.createElement(
                                "td",
                                null,
                                car.charge_time,
                                " mins"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Charger"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "Included"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Full seats"
                            ),
                            React.createElement(
                                "td",
                                null,
                                car.seats
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Luggage space"
                            ),
                            React.createElement(
                                "td",
                                null,
                                car.storage,
                                " L"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Milage"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "150 miles per day"
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Theft Waiver"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "Included",
                                React.createElement(
                                    "sup",
                                    null,
                                    "*"
                                )
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "Colision Damage Waiver"
                            ),
                            React.createElement(
                                "td",
                                null,
                                "Included",
                                React.createElement(
                                    "sup",
                                    null,
                                    "*"
                                )
                            )
                        )
                    )
                )
            )
        )
    );
}

// Booking confirmation/details page
function booking_summary(id) {

    // Show main section, hide all others
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('select_car').style.display = 'none';
    document.getElementById('messages').style.display = 'none';
    document.getElementById('update_user').style.display = 'none';

    // Update title
    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone - Booking Confirmation";

    // If booking confirmation - show message passed "request.message"
    if (id.message) {
        body = {
            booking_id: id.booking_id,
            message: id.message
        };
        id = id.booking_id;
        // else if viewing from profile page - no message
    } else {
        body = { booking_id: id };
    }

    // Set csrf token in request header
    var csrftoken = getCookie('csrftoken');
    var request = new Request(
    /* URL */'/booking/' + body.booking_id, { headers: { 'X-CSRFToken': csrftoken } });
    fetch(request, {
        method: 'POST',
        mode: 'same-origin', // Do not send CSRF token to another domain.
        body: JSON.stringify(body)
    }).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log(result);

        // If an error is returned
        if (result.error) {
            error_message(result.error);
            return;
        }

        // Display confirmation message if car has just been booked
        if (result.message) {
            document.querySelector('#messages').style.display = "block";
            ReactDOM.render(React.createElement(Message, null), document.getElementById('messages'));
        }

        // Display booking confirmation in main section
        ReactDOM.render(React.createElement(BookingElement, { result: result }), document.getElementById('main-section'));

        // Scroll to top of page
        document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });

        // Update search bar min pickup value
        set_pickup_min();

        // Update history api
        if (!history.state || history.state.page != "booking_confirmation" || history.state.object.id != id) {
            state_id++;
            stateObj = { "page": "booking_confirmation", "object": { "id": id }, "title": "Booking Confirmation", "state_id": state_id };
            title = "booking_confirmation";

            window.history.pushState(stateObj, title, "#" + title);
        }
    });
}