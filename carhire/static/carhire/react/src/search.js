// Search summmary bar
function SearchSummary(props) {
    const info = props.info;
    return (
        <div className="row justify-content-center">
            <hr className="my-3" />
            <input name="booking_factor" id="booking_factor" hidden readOnly value={info.factor} />
            <div className="col-auto">
                <strong>Location:</strong> London {info.location_name} ({info.location_code})
                <input name="booking_location_name" id="booking_location_name" hidden readOnly value={info.location_name} />
                <input name="booking_location" id="booking_location" hidden readOnly value={info.location_code} />
            </div>
            <div className="col-auto">
                <strong>From: </strong>{" "+info.pickup}
                <input name="booking_pickup_str" id="booking_pickup_str" hidden readOnly value={info.pickup} />
                <input name="booking_pickup" id="booking_pickup" hidden readOnly value={info.pickup_value} />
            </div>
            <div className="col-auto">
                <strong>To: </strong>{" "+info.dropoff}
                <input name="booking_dropoff_str" id="booking_dropoff_str" hidden readOnly value={info.dropoff} />
                <input name="booking_dropoff" id="booking_dropoff" hidden readOnly value={info.dropoff_value} />
            </div>
            <div className="col-auto">
                <strong>Duration:</strong>{" "+info.duration} days
                <input name="booking_duration" id="booking_duration" hidden readOnly value={info.duration} />
            </div>
            <hr className="my-3" />
        </div> 
    );
}

// Available car list items
function CarResult(props) {
    const car = props.value;
    return (
        <div className="container-fluid">
            <div className="row my-4 bg_blue justify-content-center">
                <div className="col-sm-4 col-12 order-1 order-sm-1">
                    <img src={car.image } className="m-4 align-middle d-block car_image" />
                </div>
                <div className="col-sm-5 col-12 d-flex align-items-center order-3 order-sm-2">
                    <div className="m-2 px-2">
                        <h1 className="display-6">{car.make+" "}{car.model}</h1>
                        <p className="lead">
                            <img src="/static/carhire/images/range.png" className="icon d-inline-block align-bottom me-1 mb-1"/>
                                Range: {car.range} miles<br/>
                            <img src="/static/carhire/images/charge.png" className="icon d-inline-block align-bottom me-1 mb-1"/>
                            Fast Charge (80%): {car.charge_time} mins<br/>
                            <img src="/static/carhire/images/seat.png" className="icon d-inline-block align-bottom me-1 mb-1"/>
                            Seats: {car.seats} adults<br/>
                            <img src="/static/carhire/images/luggage.png" className="icon d-inline-block align-bottom me-1 mb-1"/>
                            Luggage: { car.storage }L
                        </p>
                    </div>
                </div>
                <div className="col-sm-3 col-12 d-flex align-items-center justify-content-center order-2 order-sm-3">
                    <div className="m-2 p-2 text-center">
                        <h3>£ {(car.duration * car.price).toFixed(2) }</h3>
                        <p>£ {car.price.toFixed(2)} / day</p>
                        <button className="btn btn-danger yellow" onClick={() => select_car(car.id)} value={car.id} name="booking_car">
                            Book this car
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// List of available cars with sort input
function AvailableCars(props) {
    const allcars = props.cars;
    const carElement = allcars.map((car) => 
        <CarResult key={car.id} value={car} />
    );

    return (
        <div>
            <div className="row"><div className="col-auto"><div className="input-group">
                <div className="input-group-text" id="sort_cars">Sort by</div>
                <select className="form-select col-auto" name="sort_available_cars" id="sort_available_cars" onChange={()=>search()}>
                    <option value="price+">Price low-high</option>
                    <option value="recommended">Recommended</option>
                    <option value="price-">Price high-low</option>
                    <option value="range">Range high-low</option>
                    <option value="charge">Charge time</option>
                    <option value="size+">Size small-large</option>
                    <option value="size-">Size large-small</option>
                </select>
            </div></div></div>
            {carElement}
        </div>
    )
}

function search() {
    // Show search result section
    document.querySelector('#select_car').style.display='block';
    document.querySelector('#main-section').style.display='none';
    document.querySelector('#messages').style.display = "none";
    document.getElementById('update_user').style.display = 'none';

    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone  - Search"
    // Update min pickup time in search bar
    set_pickup_min()

    // If search results are being loaded from history api use StateObj, else get data from search bar
    var location = "";
    var pickup = "";
    var dropoff = "";
    if (history.state && history.state.page == "search" && history.state.state_id != state_id || history.state.page == "book_car") {
        location = history.state.object.location
        pickup = history.state.object.pickup
        dropoff = history.state.object.dropoff
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
        error= "Invalid pickup/dropoff date.";
        error_message(error)  ;       
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
    tomorrow.setDate(tomorrow.getDate()+1);
    var min = tomorrow.toJSON().substring(0, 11);
    min += "08:00";

    if (Date.parse(pickup) <=  Date.parse(min)) {
        error = "Earliest possible pickup time is 08:00 tomorrow.";
        error_message(error);    
        return false;
    }

    {/* Set csrf cookie value in headder */}
    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        /* URL */'/search',
        {headers: {'X-CSRFToken': csrftoken}}
    );
    fetch(request, {
        method: 'POST',
        mode: 'same-origin',  // Do not send CSRF token to another domain.
        body: JSON.stringify({
            location: location,
            pickup: pickup,
            dropoff: dropoff,
        })
    })
    .then(responce => responce.json())
    .then(result => {
        // Print available cars
        console.log(result);

        hide_login_section()

        // Display any errors
        if (result.error) {
            error_message(result.error);
            return false;
        }

        const carList = result.body

        // sort carList
        if (document.body.contains(document.getElementById('sort_available_cars'))) {
            const sort_type = document.getElementById('sort_available_cars').value;
            console.log("sort")
            if (sort_type == "price+") {
                carList.sort(function(a, b){return a.price - b.price});
            } else if (sort_type == "price-") {
                carList.sort(function(a, b){return b.price - a.price});
            } else if (sort_type == "range") {
                carList.sort(function(a, b){return b.range - a.range});
            } else if (sort_type == "charge") {
                carList.sort(function(a, b){return a.charge_time - b.charge_time});
            } else if (sort_type == "size+") {
                carList.sort(function(a, b){return a.storage - b.storage});
            } else if (sort_type == "size-") {
                carList.sort(function(a, b){return b.storage - a.storage});
            }
            // If recommended - dont sort
        } else {
            // initially sort by price low-high
            carList.sort(function(a, b){return a.price - b.price});
        }

        // Add search summary ay top of search results
        const info = result.info
        ReactDOM.render(
            <SearchSummary info={info} />,
            document.getElementById('search_summary')
        );
        
        // If no cars available - show error message
        if (carList.length == 0) {
            const error = "No cars available, please try a different location or try changing the dates."
            error_message(error);
            return false;
        }

        // Render car list
        ReactDOM.render(
            <AvailableCars cars={carList} />,
            document.getElementById('search-results')
        );

        // Update history api
        if (!history.state || history.state.page != "search")  {
            state_id ++;
            stateObj = {"page": "search", "object": {"location": location, "pickup": pickup, "dropoff": dropoff}, "title": "Search", "state_id": state_id}
            title = "search"
            
            window.history.pushState(stateObj, title, "#"+title);
        } else if (history.state.page == "search" && history.state.object.state_id != state_id) {
            // Replace previous search
            state_id ++;
            stateObj = {"page": "search", "object": {"location": location, "pickup": pickup, "dropoff": dropoff}, "title": "Search", "state_id": state_id}
            title = "search"
            
            window.history.replaceState(stateObj, title, "#"+title);

        }

    });
}


