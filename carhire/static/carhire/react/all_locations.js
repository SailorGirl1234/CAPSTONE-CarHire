// Opening hours
function Hours(props) {
    var day = props.value;
    return React.createElement(
        "tr",
        { className: "py-0" },
        React.createElement(
            "td",
            { className: "py-0 d-lg-block d-none mx-4" },
            " "
        ),
        React.createElement(
            "th",
            { className: "py-0" },
            day.day,
            ": "
        ),
        React.createElement(
            "td",
            { className: "py-0" },
            day.from,
            " - ",
            day.to
        ),
        React.createElement(
            "td",
            { className: "py-0 d-lg-block d-none mx-4" },
            " "
        )
    );
}

// Location from list
function Location(props) {
    var location = props.value;
    var hours = location.hours;
    var hoursElements = hours.map(function (day) {
        return React.createElement(Hours, { key: day.day, value: day });
    });
    return React.createElement(
        "div",
        { className: "container-fluid" },
        React.createElement(
            "div",
            { className: "row my-4 bg_blue justify-content-center" },
            React.createElement(
                "div",
                { className: "col-12" },
                React.createElement(
                    "h1",
                    { className: "display-6 m-4 mb-2" },
                    React.createElement(
                        "a",
                        { href: "#", onClick: function onClick() {
                                return show_locations(location.code);
                            }, className: "text-decoration-none" },
                        "London ",
                        location.site
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "col-sm-6 col-12 p-2 px-4" },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "table",
                        { className: "table table-borderless table-dark bg_blue" },
                        React.createElement(
                            "tbody",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    { scope: "row" },
                                    "Address:"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    location.address + ", ",
                                    React.createElement(
                                        "a",
                                        { href: "https://www.google.com/maps/place/" + location.postcode, target: "_blank" },
                                        location.postcode
                                    )
                                )
                            ),
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    { scope: "row" },
                                    "Telephone:"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    location.tel
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "a",
                            { className: "btn btn-outline-light bg_blue p-2 d-md-none", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapse" + location.code, "aria-expanded": "false", "aria-controls": "collapse" + location.code },
                            React.createElement(
                                "strong",
                                null,
                                "Opening Hours"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "d-md-block d-none px-2" },
                            React.createElement(
                                "strong",
                                null,
                                "Opening Hours:"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "collapse d-md-block", id: "collapse" + location.code },
                            React.createElement(
                                "div",
                                { className: "card card-body p-1 border-0" },
                                React.createElement(
                                    "table",
                                    { className: "table table-borderless table-dark bg_blue table-sm " },
                                    React.createElement(
                                        "tbody",
                                        null,
                                        hoursElements
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "col-sm-6 col-12 d-flex align-items-center" },
                React.createElement(
                    "div",
                    { className: "py-2 px-sm-4 pe-3" },
                    React.createElement(
                        "div",
                        { className: "d-md-block d-none p-2" },
                        React.createElement(
                            "small",
                            { className: "linebrk" },
                            location.info
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "d-flex justify-content-center mb-2" },
                        React.createElement(
                            "a",
                            { href: "https://www.google.com/maps/place/" + location.postcode, target: "_blank" },
                            React.createElement("img", { className: "map_img img-fluid m-2 border border-3", src: "/static/" + location.map })
                        )
                    )
                )
            )
        )
    );
}

// Location list 
function LocationsList(props) {
    var locationslist = props.locations;
    var locationElements = locationslist.map(function (location) {
        return React.createElement(Location, { key: location.code, value: location });
    });
    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "p-2 px-4 mx-2 container-fluid " },
            React.createElement(
                "h1",
                { className: "display-6" },
                "Hire electric from London"
            ),
            React.createElement(
                "p",
                null,
                "The future of motoring is electric and hiring one can offer you many advantages. Whether it is a short term hire for a holiday or a long term hire for your business, there is no time like the present to make the switch to an EV."
            ),
            React.createElement(
                "div",
                { id: "bonuses" },
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        null,
                        "No London Congestion Charge or ULEZ Charge for EVs"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "The fuel savings on EVs are huge compared to petrol or diesel cars"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "There are now more public electric car charging stations than petrol stations"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Help the environment and stop climate change by driving an EV"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Free parking for electric vehicles in many locations"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Autopilot capability \u2013 subject to vehicle and model"
                    )
                )
            )
        ),
        locationElements
    );
}

// Single location
function OneLocation(props) {
    var location = props.locations;
    var hours = location.hours;
    var hoursElements = hours.map(function (day) {
        return React.createElement(Hours, { key: day.day, value: day });
    });

    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            { className: "pt-4 p-2" },
            React.createElement(
                "h1",
                { className: "display-6" },
                "Hire a car from London ",
                location.site,
                " "
            )
        ),
        React.createElement(
            "div",
            { className: "row my-2" },
            React.createElement(
                "div",
                { className: "col-12 col-sm-6 ms-2 " },
                React.createElement(
                    "p",
                    { className: "linebrk" },
                    location.info
                ),
                React.createElement(
                    "p",
                    { className: "linebrk" },
                    location.details.about
                )
            ),
            React.createElement(
                "div",
                { className: "d-none d-md-block col-5 mx-auto my-auto" },
                React.createElement("img", { src: location.details.photo, style: { width: 100 + "%", height: "auto" } })
            )
        ),
        React.createElement("hr", null),
        React.createElement(
            "div",
            { className: "row my-4" },
            React.createElement(
                "div",
                { className: "col-12 col-md-5 mx-auto my-auto" },
                React.createElement(
                    "div",
                    { className: "d-flex justify-content-center mb-2" },
                    React.createElement(
                        "a",
                        { href: "https://www.google.com/maps/place/" + location.postcode, target: "_blank" },
                        React.createElement("img", { className: "map_img img-fluid m-2 border border-3", src: "/static/" + location.map })
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "col-12 col-sm-5 mx-auto my-auto" },
                React.createElement(
                    "table",
                    { className: "table table-borderless" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { scope: "row" },
                                "Address:"
                            ),
                            React.createElement(
                                "td",
                                null,
                                location.address + ", ",
                                React.createElement(
                                    "a",
                                    { href: "https://www.google.com/maps/place/" + location.postcode, target: "_blank" },
                                    location.postcode
                                )
                            )
                        ),
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { scope: "row" },
                                "Telephone:"
                            ),
                            React.createElement(
                                "td",
                                null,
                                location.tel
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "a",
                        { className: "btn btn-outline-dark p-2 d-md-none", type: "button", "data-bs-toggle": "collapse", "data-bs-target": "#collapse" + location.code, "aria-expanded": "false", "aria-controls": "collapse" + location.code },
                        React.createElement(
                            "strong",
                            null,
                            "Opening Hours"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "d-md-block d-none px-2" },
                        React.createElement(
                            "strong",
                            null,
                            "Opening Hours:"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "collapse d-md-block", id: "collapse" + location.code },
                        React.createElement(
                            "div",
                            { className: "card card-body p-1 border-0" },
                            React.createElement(
                                "table",
                                { className: "table table-borderless table-sm " },
                                React.createElement(
                                    "tbody",
                                    null,
                                    hoursElements
                                )
                            )
                        )
                    )
                )
            )
        ),
        React.createElement("hr", null),
        React.createElement(
            "div",
            { className: "p-2 container-fluid" },
            React.createElement(
                "h1",
                { className: "display-6" },
                "Hire electric from London"
            ),
            React.createElement(
                "p",
                null,
                "The future of motoring is electric and hiring one can offer you many advantages. Whether it is a short term hire for a holiday or a long term hire for your business, there is no time like the present to make the switch to an EV."
            ),
            React.createElement(
                "div",
                { id: "bonuses" },
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        null,
                        "No London Congestion Charge or ULEZ Charge for EVs"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "The fuel savings on EVs are huge compared to petrol or diesel cars"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "There are now more public electric car charging stations than petrol stations"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Help the environment and stop climate change by driving an EV"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Free parking for electric vehicles in many locations"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Autopilot capability \u2013 subject to vehicle and model"
                    )
                )
            )
        )
    );
}

function show_locations(code) {
    // set active status to link in nav bar
    active("navbarDropdown");
    // Show main section and hide all others
    document.querySelector('#main-section').style.display = 'block';
    document.querySelector('#select_car').style.display = 'none';
    document.querySelector('#login-view').style.display = "none";
    document.getElementById('update_user').style.display = 'none';
    document.querySelector('#messages').style.display = "none";

    //Update title
    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone  - " + code;

    // AJAX GET request for data for location section
    fetch('/location/' + code, {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log(result);

        // If error in result display at top of page
        if (result.error) {
            error_message(result.error);
            return;
        }

        // Render the all locations list in the main-section
        var locationList = result.body;
        if (result.code == "all") {
            ReactDOM.render(React.createElement(LocationsList, { locations: locationList }), document.getElementById('main-section'));
        } else {
            // Render the specific location in the main-section
            ReactDOM.render(React.createElement(OneLocation, { locations: locationList }), document.getElementById('main-section'));
        }

        // Update pickip minimum value in search bar
        set_pickup_min();

        // Update history api
        if (!history.state.object.code || history.state.object.code != code) {
            state_id++;
            stateObj = { "page": "locations", "object": { "code": code }, "title": "Location - " + code, "state_id": state_id };
            title = "location-" + code;

            window.history.pushState(stateObj, title, "#" + title);
        }

        return;
    });
}