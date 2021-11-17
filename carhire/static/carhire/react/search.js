// Search summmary bar
function SearchSummary(props) {
    var info = props.info;
    return React.createElement(
        "div",
        { className: "row justify-content-center" },
        React.createElement("hr", { className: "my-3" }),
        React.createElement("input", { name: "booking_factor", id: "booking_factor", hidden: true, readOnly: true, value: info.factor }),
        React.createElement(
            "div",
            { className: "col-auto" },
            React.createElement(
                "strong",
                null,
                "Location:"
            ),
            " London ",
            info.location_name,
            " (",
            info.location_code,
            ")",
            React.createElement("input", { name: "booking_location_name", id: "booking_location_name", hidden: true, readOnly: true, value: info.location_name }),
            React.createElement("input", { name: "booking_location", id: "booking_location", hidden: true, readOnly: true, value: info.location_code })
        ),
        React.createElement(
            "div",
            { className: "col-auto" },
            React.createElement(
                "strong",
                null,
                "From: "
            ),
            " " + info.pickup,
            React.createElement("input", { name: "booking_pickup_str", id: "booking_pickup_str", hidden: true, readOnly: true, value: info.pickup }),
            React.createElement("input", { name: "booking_pickup", id: "booking_pickup", hidden: true, readOnly: true, value: info.pickup_value })
        ),
        React.createElement(
            "div",
            { className: "col-auto" },
            React.createElement(
                "strong",
                null,
                "To: "
            ),
            " " + info.dropoff,
            React.createElement("input", { name: "booking_dropoff_str", id: "booking_dropoff_str", hidden: true, readOnly: true, value: info.dropoff }),
            React.createElement("input", { name: "booking_dropoff", id: "booking_dropoff", hidden: true, readOnly: true, value: info.dropoff_value })
        ),
        React.createElement(
            "div",
            { className: "col-auto" },
            React.createElement(
                "strong",
                null,
                "Duration:"
            ),
            " " + info.duration,
            " days",
            React.createElement("input", { name: "booking_duration", id: "booking_duration", hidden: true, readOnly: true, value: info.duration })
        ),
        React.createElement("hr", { className: "my-3" })
    );
}

// Available car list items
function CarResult(props) {
    var car = props.value;
    return React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement(
            "div",
            { className: "row my-4 bg_blue justify-content-center" },
            React.createElement(
                "div",
                { className: "col-sm-4 col-12 order-1 order-sm-1" },
                React.createElement("img", { src: car.image, className: "m-4 align-middle d-block car_image" })
            ),
            React.createElement(
                "div",
                { className: "col-sm-5 col-12 d-flex align-items-center order-3 order-sm-2" },
                React.createElement(
                    "div",
                    { className: "m-2 px-2" },
                    React.createElement(
                        "h1",
                        { className: "display-6" },
                        car.make + " ",
                        car.model
                    ),
                    React.createElement(
                        "p",
                        { className: "lead" },
                        React.createElement("img", { src: "/static/carhire/images/range.png", className: "icon d-inline-block align-bottom me-1 mb-1" }),
                        "Range: ",
                        car.range,
                        " miles",
                        React.createElement("br", null),
                        React.createElement("img", { src: "/static/carhire/images/charge.png", className: "icon d-inline-block align-bottom me-1 mb-1" }),
                        "Fast Charge (80%): ",
                        car.charge_time,
                        " mins",
                        React.createElement("br", null),
                        React.createElement("img", { src: "/static/carhire/images/seat.png", className: "icon d-inline-block align-bottom me-1 mb-1" }),
                        "Seats: ",
                        car.seats,
                        " adults",
                        React.createElement("br", null),
                        React.createElement("img", { src: "/static/carhire/images/luggage.png", className: "icon d-inline-block align-bottom me-1 mb-1" }),
                        "Luggage: ",
                        car.storage,
                        "L"
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "col-sm-3 col-12 d-flex align-items-center justify-content-center order-2 order-sm-3" },
                React.createElement(
                    "div",
                    { className: "m-2 p-2 text-center" },
                    React.createElement(
                        "h3",
                        null,
                        "\xA3 ",
                        (car.duration * car.price).toFixed(2)
                    ),
                    React.createElement(
                        "p",
                        null,
                        "\xA3 ",
                        car.price.toFixed(2),
                        " / day"
                    ),
                    React.createElement(
                        "button",
                        { className: "btn btn-danger yellow", onClick: function onClick() {
                                return select_car(car.id);
                            }, value: car.id, name: "booking_car" },
                        "Book this car"
                    )
                )
            )
        )
    );
}

// List of available cars with sort input
function AvailableCars(props) {
    var allcars = props.cars;
    var carElement = allcars.map(function (car) {
        return React.createElement(CarResult, { key: car.id, value: car });
    });

    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "col-auto" },
                React.createElement(
                    "div",
                    { className: "input-group" },
                    React.createElement(
                        "div",
                        { className: "input-group-text", id: "sort_cars" },
                        "Sort by"
                    ),
                    React.createElement(
                        "select",
                        { className: "form-select col-auto", name: "sort_available_cars", id: "sort_available_cars", onChange: function onChange() {
                                return search();
                            } },
                        React.createElement(
                            "option",
                            { value: "price+" },
                            "Price low-high"
                        ),
                        React.createElement(
                            "option",
                            { value: "recommended" },
                            "Recommended"
                        ),
                        React.createElement(
                            "option",
                            { value: "price-" },
                            "Price high-low"
                        ),
                        React.createElement(
                            "option",
                            { value: "range" },
                            "Range high-low"
                        ),
                        React.createElement(
                            "option",
                            { value: "charge" },
                            "Charge time"
                        ),
                        React.createElement(
                            "option",
                            { value: "size+" },
                            "Size small-large"
                        ),
                        React.createElement(
                            "option",
                            { value: "size-" },
                            "Size large-small"
                        )
                    )
                )
            )
        ),
        carElement
    );
}

function search() {
    // Show search result section
    document.querySelector('#select_car').style.display = 'block';
    document.querySelector('#main-section').style.display = 'none';
    document.querySelector('#messages').style.display = "none";
    document.getElementById('update_user').style.display = 'none';

    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone  - Search";
    // Update min pickup time in search bar
    set_pickup_min();

    // If search results are being loaded from history api use StateObj, else get data from search bar
    var location = "";
    var pickup = "";
    var dropoff = "";
    if (history.state && history.state.page == "search" && history.state.state_id != state_id || history.state.page == "book_car") {
        location = history.state.object.location;
        pickup = history.state.object.pickup;
        dropoff = history.state.object.dropoff;
    } else {
        // Get search form data
        location = document.getElementById('location').value;
        pickup = document.getElementById('pickup').value;
        dropoff = document.getElementById('dropoff').value;
    }

    // Check form validation
    // Check location is selected
    if (location == "") {
        error = "Please select a location.";
        error_message(error);
        return false;
    }
    // Check droppoff/pickup date-times selected
    if (pickup == "" || dropoff == "") {
        error = "Invalid pickup/dropoff date.";
        error_message(error);
        return false;
    }
    // Check datetime format is valid
    if (Date.parse(pickup) == NaN || Date.parse(dropoff) == NaN) {
        error = "Pickup/Dropoff date in wrong format.";
        error_message(error);
        return false;
    }
    // Check dropoff is after pickup
    if (Date.parse(pickup) >= Date.parse(dropoff)) {
        error = "Dropoff date must be after pickup time.";
        error_message(error);
        return false;
    }

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var min = tomorrow.toJSON().substring(0, 11);
    min += "08:00";

    if (Date.parse(pickup) <= Date.parse(min)) {
        error = "Earliest possible pickup time is 08:00 tomorrow.";
        error_message(error);
        return false;
    }

    {/* Set csrf cookie value in headder */}
    var csrftoken = getCookie('csrftoken');
    var request = new Request(
    /* URL */'/search', { headers: { 'X-CSRFToken': csrftoken } });
    fetch(request, {
        method: 'POST',
        mode: 'same-origin', // Do not send CSRF token to another domain.
        body: JSON.stringify({
            location: location,
            pickup: pickup,
            dropoff: dropoff
        })
    }).then(function (responce) {
        return responce.json();
    }).then(function (result) {
        // Print available cars
        console.log(result);

        hide_login_section();

        // Display any errors
        if (result.error) {
            error_message(result.error);
            return false;
        }

        var carList = result.body;

        // sort carList
        if (document.body.contains(document.getElementById('sort_available_cars'))) {
            var sort_type = document.getElementById('sort_available_cars').value;
            console.log("sort");
            if (sort_type == "price+") {
                carList.sort(function (a, b) {
                    return a.price - b.price;
                });
            } else if (sort_type == "price-") {
                carList.sort(function (a, b) {
                    return b.price - a.price;
                });
            } else if (sort_type == "range") {
                carList.sort(function (a, b) {
                    return b.range - a.range;
                });
            } else if (sort_type == "charge") {
                carList.sort(function (a, b) {
                    return a.charge_time - b.charge_time;
                });
            } else if (sort_type == "size+") {
                carList.sort(function (a, b) {
                    return a.storage - b.storage;
                });
            } else if (sort_type == "size-") {
                carList.sort(function (a, b) {
                    return b.storage - a.storage;
                });
            }
            // If recommended - dont sort
        } else {
            // initially sort by price low-high
            carList.sort(function (a, b) {
                return a.price - b.price;
            });
        }

        // Add search summary ay top of search results
        var info = result.info;
        ReactDOM.render(React.createElement(SearchSummary, { info: info }), document.getElementById('search_summary'));

        // If no cars available - show error message
        if (carList.length == 0) {
            var _error = "No cars available, please try a different location or try changing the dates.";
            error_message(_error);
            return false;
        }

        // Render car list
        ReactDOM.render(React.createElement(AvailableCars, { cars: carList }), document.getElementById('search-results'));

        // Update history api
        if (!history.state || history.state.page != "search") {
            state_id++;
            stateObj = { "page": "search", "object": { "location": location, "pickup": pickup, "dropoff": dropoff }, "title": "Search", "state_id": state_id };
            title = "search";

            window.history.pushState(stateObj, title, "#" + title);
        } else if (history.state.page == "search" && history.state.object.state_id != state_id) {
            // Replace previous search
            state_id++;
            stateObj = { "page": "search", "object": { "location": location, "pickup": pickup, "dropoff": dropoff }, "title": "Search", "state_id": state_id };
            title = "search";

            window.history.replaceState(stateObj, title, "#" + title);
        }
    });
}