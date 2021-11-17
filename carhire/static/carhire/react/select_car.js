function CarSelected(props) {
    var car = props.car;
    console.log(car);
    return React.createElement(
        "div",
        { className: "container-fluid mx-sm-4" },
        React.createElement("input", { hidden: true, readOnly: true, id: "booking_car", name: "booking_car", value: "${car.id}" }),
        React.createElement("input", { hidden: true, readOnly: true, id: "booking_price", name: "booking_price", value: parseFloat(car.total_price).toFixed(2) }),
        React.createElement(
            "div",
            { className: "row justify-content-between mt-4" },
            React.createElement(
                "div",
                { className: "col-12 col-sm-6" },
                React.createElement(
                    "h1",
                    { className: "display-6" },
                    React.createElement(
                        "strong",
                        null,
                        car.make,
                        " ",
                        car.model
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "row col-12 col-sm-6" },
                React.createElement(
                    "div",
                    { className: "col-auto d-flex align-items-end" },
                    React.createElement(
                        "h3",
                        { className: "display-6" },
                        React.createElement(
                            "small",
                            { id: "total_price" },
                            "\xA3 ",
                            parseFloat(car.total_price).toFixed(2)
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "col-auto d-flex align-items-end" },
                    React.createElement(
                        "span",
                        { className: "lead mx-4 mb-2 text-muted" },
                        "\xA3 ",
                        parseFloat(car.price).toFixed(2),
                        " /day"
                    )
                )
            )
        ),
        React.createElement(
            "div",
            { className: "row mt-4" },
            React.createElement(
                "div",
                { className: "col-sm-6 col-12 order-1 py-2" },
                React.createElement("img", { src: car.image, className: "car_image" })
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
                                "Model"
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
                ),
                React.createElement(
                    "div",
                    { id: "book_car" },
                    React.createElement(
                        "button",
                        { className: "btn btn-danger yellow mx-auto my-2", onClick: function onClick() {
                                return book_car(car.id);
                            } },
                        "Book this car now"
                    )
                )
            )
        ),
        React.createElement("hr", null)
    );
}

function select_car(id) {

    var location = document.querySelector("#booking_location").value;
    var pickup = document.querySelector("#booking_pickup").value;
    var dropoff = document.querySelector("#booking_dropoff").value;
    var factor = document.querySelector("#booking_factor").value;

    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone  - Book car";

    var csrftoken = getCookie('csrftoken');
    var request = new Request(
    /* URL */'/select_car', { headers: { 'X-CSRFToken': csrftoken } });
    fetch(request, {
        method: 'POST',
        mode: 'same-origin', // Do not send CSRF token to another domain.
        body: JSON.stringify({
            location: location,
            pickup: pickup,
            dropoff: dropoff,
            factor: factor,
            car: id
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

        var car = result.body[0];

        ReactDOM.render(React.createElement(CarSelected, { car: car }), document.getElementById('search-results'));

        show_login_section();

        if (document.body.contains(document.querySelector('#username_login'))) {
            document.getElementById('book_car').style.display = "none";
            var message = "Login or register to book a car.";
            error_message(message);
        }

        set_pickup_min();
        console.log(history.state);

        if (history.state.page == "search") {
            state_id++;
            info = history.state.stateObj;

            var stateObj = {
                "page": "book_car",
                "object": {
                    "car": id,
                    "location": location,
                    "pickup": pickup,
                    "dropoff": dropoff
                },
                "title": "Book Car",
                "state_id": state_id
            };
            var title = "book_car";

            window.history.pushState(stateObj, title, "#" + title);
            console.log(stateObj);
        }

        return false;
    });
}