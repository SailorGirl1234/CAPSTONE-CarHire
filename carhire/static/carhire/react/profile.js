

function profile_page() {

    // Change remove all active links in nav bar 
    active("profile-button");

    // Show main section
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('update_user').style.display = 'none';
    document.getElementById('select_car').style.display = 'none';
    document.getElementById('messages').style.display = 'none';

    document.getElementById('main-section').scrollIntoView({ behavior: 'smooth' });
    // Update title
    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone  - Profile";

    // AJAX GET request profile info
    fetch('/profile', {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log(result);
        // Render profile page
        ReactDOM.render(React.createElement(ProfileElement, { user: result.info, bookings: result.body }), document.getElementById('main-section'));
    });
    // Update search bar pick up min value
    set_pickup_min();
    // Update history api
    if (!history.state || history.state.page != "profile") {
        state_id++;
        stateObj = { "page": "profile", "object": "", "title": "Profile", "state_id": state_id };
        title = "profile";

        window.history.pushState(stateObj, title, "#" + title);
    }
}

// Profile page display
function ProfileElement(props) {
    var user = props.user;
    var name = user.name;
    if (name == "") {
        name = user.username;
    }
    // If user has made any bookings - list bookings 
    var bookingList = props.bookings;
    var bookingElement = bookingList.map(function (booking) {
        return React.createElement(BookingSummary, { key: booking.ref, value: booking });
    });
    return React.createElement(
        'div',
        { className: 'mx-2' },
        React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-12 col-sm-auto' },
                React.createElement(
                    'h1',
                    { className: 'display-6' },
                    'Hi ',
                    name,
                    ' '
                )
            ),
            React.createElement(
                'div',
                { className: 'col-12 col-sm-auto ms-sm-auto' },
                React.createElement(
                    'button',
                    { type: 'button', className: 'btn btn-danger yellow', onClick: function onClick() {
                            return update_user_details();
                        } },
                    'Update personal details'
                )
            )
        ),
        React.createElement('hr', null),
        React.createElement(
            'div',
            null,
            React.createElement(
                'h3',
                { className: 'lead fs-2' },
                'Your bookings:'
            ),
            bookingElement
        )
    );
}

// Booking list element
function BookingSummary(props) {
    var booking = props.value;
    var p = new Date(booking.pickup);

    var pickup = p.toUTCString().slice(0, -7);
    var d = new Date(booking.dropoff);
    var dropoff = d.toUTCString().slice(0, -7);
    // if dropoff is in past - show different background colors to future/current bookings
    var status = "bg_blue";
    if (d < new Date()) {
        status = "historical_booking";
    }
    return React.createElement(
        'div',
        { className: "my-4 row " + status, onClick: function onClick() {
                return booking_summary(booking.id);
            } },
        React.createElement(
            'div',
            { className: 'col-12 col-md-8 ps-md-5' },
            React.createElement(
                'div',
                { className: 'row fw-bold p-2 pt-4 lead' },
                React.createElement(
                    'div',
                    { className: 'col-8 col-sm order-sm-1' },
                    'Ref: ',
                    booking.ref
                ),
                React.createElement(
                    'div',
                    { className: 'col-4 col-sm text-end order-sm-3' },
                    '\xA3',
                    booking.price
                ),
                React.createElement(
                    'div',
                    { className: 'col-12 col-sm text-sm-center order-sm-2' },
                    React.createElement(
                        'small',
                        null,
                        'London ',
                        booking.location_site
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row p-2 pb-4' },
                React.createElement(
                    'div',
                    { className: 'col-12 col-sm-auto' },
                    React.createElement(
                        'strong',
                        null,
                        'Pickup: '
                    ),
                    pickup
                ),
                React.createElement(
                    'div',
                    { className: 'col-12 col-sm-auto text-sm-center' },
                    React.createElement(
                        'strong',
                        null,
                        'Dropoff: '
                    ),
                    dropoff
                ),
                React.createElement(
                    'div',
                    { className: 'col-12 col-sm text-sm-end' },
                    React.createElement(
                        'strong',
                        null,
                        'Car: '
                    ),
                    booking.car
                )
            )
        ),
        React.createElement(
            'div',
            { className: 'col-md-4 p-2 text-center text-md-end' },
            React.createElement('img', { src: booking.photo, className: 'thumbnail ms-md-auto m-md-2 ' })
        )
    );
}