// Book car via AJAX POST request
function book_car(id) {
    // Get location, pickup, dropoff, price factor and price values
    const location = document.querySelector("#booking_location").value;
    const pickup = document.querySelector("#booking_pickup").value;
    const dropoff = document.querySelector("#booking_dropoff").value;
    const factor = document.querySelector("#booking_factor").value;
    const price = document.querySelector("#booking_price").value;

    // Set csrf token value in request header
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        /* URL */'/book_car',
        {headers: {'X-CSRFToken': csrftoken}}
    );
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
    })
    .then(response => response.json())
    .then(result => {

        console.log(result)

        // If an error is returned
        if (result.error) {
            error_message(result.error)
            return false
        }

        // Show confirmation page - result.message contained in result
        booking_summary(result)
    })
}


// Booking success message
function Message() {
    return (
        <div className="alert mt-2 alert-success" role="alert">
            <h4 className="alert-heading">
                {/* Confirmation tick */}
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-check2-circle m-2 ms-0" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                </svg>            
                Success!
            </h4>
            <p className="mb-0">
                Your booking has been confirmed!<br/>
                Please check the booking details below carefully.
            </p>
        </div>
    )
}


// Booking confirmation page
function BookingElement(props) {
    const booking = props.result.booking;
    const car = props.result.car;
    const p = new Date(booking.pickup)
    const pickup = p.toUTCString();
    const d = new Date(booking.dropoff)
    const dropoff = d.toUTCString();

    const tick = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="green" fill="currentColor" className="bi bi-check-circle me-2" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
        </svg>
    )

    return (
        <div className="mx-2">
            <div className="row">
                <div className="col-sm-8 col-12">
                    <h1 className="display-6">Hi {booking.user}, </h1>
                    <h1 className="display-6 mb-4">Your reservation is confirmed.</h1>
                </div>
                {/* Cancel booking button */}
                <div className="col-sm-3 col-12 mb-4 mt-auto d-flex justify-content-center justify-content-sm-start">
                    <button className="btn btn-danger yellow btn-lg" onClick={() => cancel_booking(booking.id)}>Cancel Booking</button>
                </div>
            </div>
            <hr/>
            {/* Booking summary */}
            <div className="row mb-4 d-flex align-items-center">
                <div className="col-sm-6 col-12 mb-2">
                    <dl className="row lead">
                        <dt className="col-sm-5">Booking Reference:</dt>
                        <dt className="col-sm-7 mb-2">{booking.ref}</dt>
                        <dt className="col-sm-5">Price:</dt>
                        <dd className="col-sm-7">£ {booking.price}</dd>
                        <dt className="col-sm-5">Location:</dt>
                        <dd className="col-sm-7"><a onClick={() => show_locations(booking.location_code)} className="link-secondary">London {booking.location_site}</a></dd>
                        <dt className="col-sm-5">Pickup:</dt>
                        <dd className="col-sm-7">{pickup}</dd>
                        <dt className="col-sm-5">Dropoff:</dt>
                        <dd className="col-sm-7">{dropoff}</dd>
                        <dt className="col-sm-5">Car:</dt>
                        <dd className="col-sm-7">{car.make} {car.model}</dd>
                    </dl>
                </div>
                {/* Booking checklist - what to bring */}
                <div className="col-auto mx-auto" >
                    <div className="border border-2 p-4">
                        <h4 className="text-center">Your car pick-up checklist</h4>
                        <h5 className="text-muted">You'll need these to pick up the car:</h5>
                        <ul className="list-unstyled">
                            <li>{tick} Credit card in main driver's name</li>
                            <li>{tick} Driving Licence Identification</li>
                            <li>{tick} Booking Reference</li>
                        </ul>		            
                    </div>
                </div>
            </div>
            <hr/>
            {/* Car details */}
            <div className="row mt-4">
                <div className="col-sm-6 col-12 order-1 py-2 text-center text-sm-start">
                    <a href={car.image}><img src={car.image} className="car_image" /></a>
                </div>
                <div className="col-sm-6 col-12 order-2">
                    <table className="table table-hover">
                        <tbody>
                            <tr><th>Car</th><td>{car.make} {car.model}</td></tr>
                            <tr><th>Range</th><td>{car.range} miles</td></tr>
                            <tr><th>Charge Time<br/>(0-80%)</th><td>{car.charge_time} mins</td></tr>
                            <tr><th>Charger</th><td>Included</td></tr>
                            <tr><th>Full seats</th><td>{car.seats}</td></tr>
                            <tr><th>Luggage space</th><td>{car.storage} L</td></tr>
                            <tr><th>Milage</th><td>150 miles per day</td></tr>
                            <tr><th>Theft Waiver</th><td>Included<sup>*</sup></td></tr>
                            <tr><th>Colision Damage Waiver</th><td>Included<sup>*</sup></td></tr>
                        </tbody>    
                    </table>
                </div>
            </div>
        </div>
    )

}

// Booking confirmation/details page
function booking_summary(id) {

    // Show main section, hide all others
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('select_car').style.display = 'none';
    document.getElementById('messages').style.display = 'none';
    document.getElementById('update_user').style.display = 'none';

    // Update title
    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone - Booking Confirmation"

    // If booking confirmation - show message passed "request.message"
    if (id.message){
        body = {
            booking_id: id.booking_id,
            message: id.message
        }
        id = id.booking_id
    // else if viewing from profile page - no message
    } else {
        body = {booking_id: id}
    } 

    // Set csrf token in request header
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        /* URL */'/booking/'+body.booking_id,
        {headers: {'X-CSRFToken': csrftoken}}
    );
    fetch(request, {
        method: 'POST',
        mode: 'same-origin',  // Do not send CSRF token to another domain.
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(result => {

        console.log(result)

        // If an error is returned
        if (result.error) {
            error_message(result.error);
            return
        }

        // Display confirmation message if car has just been booked
        if (result.message) {
            document.querySelector('#messages').style.display = "block";
            ReactDOM.render(
                <Message />, document.getElementById('messages')
            );
        }

        // Display booking confirmation in main section
        ReactDOM.render(
            <BookingElement result={result} />,
            document.getElementById('main-section')
        );

        // Scroll to top of page
        document.getElementById('messages').scrollIntoView({behavior: 'smooth'});
        
        // Update search bar min pickup value
        set_pickup_min()

        // Update history api
        if (!history.state || history.state.page != "booking_confirmation" || history.state.object.id != id) {
            state_id++;
            stateObj = {"page": "booking_confirmation", "object": {"id": id}, "title": "Booking Confirmation", "state_id": state_id}
            title = "booking_confirmation"
        
            window.history.pushState(stateObj, title, "#"+title);

        }

        
    });
}
