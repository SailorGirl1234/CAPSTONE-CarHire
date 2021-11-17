// Individual car item
function Car(props) {
    var car = props.value;
    return React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement(
            "div",
            { className: "row my-4 bg_blue justify-content-center" },
            React.createElement(
                "div",
                { className: "col-sm-6 col-12" },
                React.createElement("img", { src: car.image, className: "m-4 align-middle d-block car_image" })
            ),
            React.createElement(
                "div",
                { className: "col-sm-6 col-12 d-flex align-items-center" },
                React.createElement(
                    "div",
                    { className: "m-2 px-2" },
                    React.createElement(
                        "h1",
                        { className: "display-6" },
                        car.make,
                        " ",
                        car.model
                    ),
                    React.createElement(
                        "p",
                        { className: "lead" },
                        React.createElement("img", { src: "/static/carhire/images/range.png", alt: "", width: "25", height: "auto", className: "icon d-inline-block align-text-bottom me-2" }),
                        "Range: ",
                        car.range,
                        " miles",
                        React.createElement("br", null),
                        React.createElement("img", { src: "/static/carhire/images/charge.png", alt: "", width: "25", height: "auto", className: "icon d-inline-block align-text-bottom me-2 mb-1" }),
                        "Fast Charge (80%): ",
                        car.charge_time,
                        " mins",
                        React.createElement("br", null),
                        React.createElement("img", { src: "/static/carhire/images/seat.png", alt: "", width: "25", height: "auto", className: "icon d-inline-block align-text-bottom me-2" }),
                        "Seats: ",
                        car.seats,
                        " adults",
                        React.createElement("br", null),
                        React.createElement("img", { src: "/static/carhire/images/luggage.png", alt: "", width: "25", height: "auto", className: "icon d-inline-block align-text-top me-2" }),
                        "Luggage: ",
                        car.storage,
                        "L"
                    )
                )
            )
        )
    );
}

// Display list of cars
function CarList(props) {
    var carlist = props.cars;
    var carElements = carlist.map(function (car) {
        return React.createElement(Car, { key: car.id, value: car });
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
                        { className: "form-select col-auto", name: "sort_cars", id: "sort_all_cars", onChange: function onChange() {
                                return all_cars();
                            } },
                        React.createElement(
                            "option",
                            { value: "recommended" },
                            "Recommended"
                        ),
                        React.createElement(
                            "option",
                            { value: "price+" },
                            "Price low-high"
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
        carElements
    );
}

// Display list of all cars in fleet
function all_cars() {
    // Set e-cars nav link to active
    active("e-cars-link");
    // Show main-section
    document.querySelector('#select_car').style.display = 'none';
    document.querySelector('#main-section').style.display = 'block';
    document.querySelector('#login-view').style.display = "none";
    document.getElementById('update_user').style.display = 'none';
    document.querySelector('#messages').style.display = "none";

    // Update title
    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone - All E-Cars";

    // AJAX GET request for all car type details
    fetch('/cars', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (result) {

        console.log(result);
        var carlist = result.body;

        // sort carlist
        if (document.body.contains(document.getElementById('sort_all_cars'))) {
            var sort_type = document.getElementById('sort_all_cars').value;
            if (sort_type == "price+") {
                carlist.sort(function (a, b) {
                    return a.price - b.price;
                });
            } else if (sort_type == "price-") {
                carlist.sort(function (a, b) {
                    return b.price - a.price;
                });
            } else if (sort_type == "range") {
                carlist.sort(function (a, b) {
                    return b.range - a.range;
                });
            } else if (sort_type == "charge") {
                carlist.sort(function (a, b) {
                    return a.charge_time - b.charge_time;
                });
            } else if (sort_type == "size+") {
                carlist.sort(function (a, b) {
                    return a.storage - b.storage;
                });
            } else if (sort_type == "size-") {
                carlist.sort(function (a, b) {
                    return b.storage - a.storage;
                });
            }
        }
        // Render the car list in the main-section
        ReactDOM.render(React.createElement(CarList, { cars: carlist }), document.getElementById('main-section'));

        // Update search bar min pickup value
        set_pickup_min();

        // Update history api
        if (!history.state || history.state.page != "e-cars") {
            state_id++;
            stateObj = { "page": "e-cars", "object": "", "title": "All E-Cars", "state_id": state_id };
            title = "all_cars";

            window.history.pushState(stateObj, title, "#" + title);
        }
    });
}