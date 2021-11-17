

function profile_page() {

    // Change remove all active links in nav bar 
    active("profile-button")

    // Show main section
    document.getElementById('main-section').style.display = 'block';
    document.getElementById('update_user').style.display = 'none';
    document.getElementById('select_car').style.display = 'none';
    document.getElementById('messages').style.display = 'none';

    document.getElementById('main-section').scrollIntoView({behavior: 'smooth'});
    // Update title
    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone  - Profile"

    // AJAX GET request profile info
    fetch('/profile', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        // Render profile page
        ReactDOM.render(
            <ProfileElement user={result.info} bookings={result.body} />,
            document.getElementById('main-section')
        );
    });
    // Update search bar pick up min value
    set_pickup_min()
    // Update history api
    if (!history.state || history.state.page != "profile") {
        state_id++;
        stateObj = {"page": "profile", "object": "", "title": "Profile", "state_id": state_id}
        title = "profile"
        
        window.history.pushState(stateObj, title, "#"+title);

    }

}

// Profile page display
function ProfileElement(props) {
    const user = props.user;
    var name = user.name;
    if (name == "")  {
        name = user.username;
    }
    // If user has made any bookings - list bookings 
    const bookingList = props.bookings;
    const bookingElement = bookingList.map((booking) => 
        <BookingSummary key={booking.ref} value={booking} />
    );
    return (
        <div className="mx-2">
            <div className="row">
                <div className="col-12 col-sm-auto">
                    <h1 className="display-6">Hi {name} </h1>
                </div>
                <div className="col-12 col-sm-auto ms-sm-auto">
                    <button type="button" className="btn btn-danger yellow" onClick={() => update_user_details()}>Update personal details</button>
                </div>
            </div>
            <hr/>
            <div>
                <h3 className="lead fs-2">Your bookings:</h3>
                    {bookingElement}
            </div>
        </div>
    )
}

// Booking list element
function BookingSummary(props) {
    const booking = props.value;
    const p = new Date(booking.pickup)
    
    const pickup = p.toUTCString().slice(0, -7);
    const d = new Date(booking.dropoff)
    const dropoff = d.toUTCString().slice(0, -7);
    // if dropoff is in past - show different background colors to future/current bookings
    var status = "bg_blue"
    if (d < new Date()) {
        status = "historical_booking"
   }
    return (
        <div className={"my-4 row "+status} onClick={() => booking_summary(booking.id)}>
            <div className="col-12 col-md-8 ps-md-5">
                <div className="row fw-bold p-2 pt-4 lead">
                    <div className="col-8 col-sm order-sm-1">Ref: {booking.ref}</div>
                    <div className="col-4 col-sm text-end order-sm-3">£{booking.price}</div>
                    <div className="col-12 col-sm text-sm-center order-sm-2"><small>London {booking.location_site}</small></div>
                </div>
                <div className="row p-2 pb-4">
                    <div className="col-12 col-sm-auto"><strong>Pickup: </strong>{pickup}</div>
                    <div className="col-12 col-sm-auto text-sm-center"><strong>Dropoff: </strong>{dropoff}</div>
                    <div className="col-12 col-sm text-sm-end"><strong>Car: </strong>{booking.car}</div>
                </div>
            </div>
            <div className="col-md-4 p-2 text-center text-md-end">
                <img src={booking.photo} className="thumbnail ms-md-auto m-md-2 "></img>
            </div>
        </div>
    )
}
