function CarSelected(props) {
    const car = props.car
    console.log(car)
    return (
        <div className="container-fluid mx-sm-4">
            <input hidden readOnly id="booking_car" name="booking_car" value="${car.id}"/>
            <input hidden readOnly id="booking_price" name="booking_price" value={(parseFloat(car.total_price)).toFixed(2)}/>
            <div className="row justify-content-between mt-4">
                <div className="col-12 col-sm-6">
                    <h1 className="display-6">
                        <strong>{car.make} {car.model}</strong>
                    </h1>
                </div>
                <div className="row col-12 col-sm-6">
                <div className="col-auto d-flex align-items-end">
                    <h3 className="display-6">
                        <small id="total_price">£ {(parseFloat(car.total_price)).toFixed(2)}</small>
                    </h3>
                </div>
                <div className="col-auto d-flex align-items-end">
                    <span className="lead mx-4 mb-2 text-muted">
                        £ {(parseFloat(car.price)).toFixed(2)} /day
                    </span>
                </div>
            </div>
        </div>  
        <div className="row mt-4">
            <div className="col-sm-6 col-12 order-1 py-2">
                <img src={car.image} className="car_image" />
            </div>
            <div className="col-sm-6 col-12 order-2">
                <table className="table table-hover">
                    <tbody>
                        <tr>
                            <th>Model</th>
                            <td>{car.make} {car.model}</td>
                        </tr>
                        <tr>
                            <th>Range</th>
                            <td>{car.range} miles</td>
                        </tr>
                        <tr>
                            <th>Charge Time<br/>(0-80%)</th>
                            <td>{car.charge_time} mins</td>
                        </tr>
                        <tr>
                            <th>Charger</th>
                            <td>Included</td>
                        </tr>
                        <tr>
                            <th>Full seats</th>
                            <td>{car.seats}</td>
                        </tr>
                        <tr>
                            <th>Luggage space</th>
                            <td>{car.storage} L</td>
                        </tr>
                        <tr>
                            <th>Milage</th>
                            <td>150 miles per day</td>
                        </tr>
                        <tr>
                            <th>Theft Waiver</th>
                            <td>Included<sup>*</sup></td>
                        </tr>
                        <tr>
                            <th>Colision Damage Waiver</th>
                            <td>Included<sup>*</sup></td>
                        </tr>
                    </tbody>    
                </table>
                <div id="book_car">
                    <button className="btn btn-danger yellow mx-auto my-2" onClick={() => book_car(car.id)}>
                        Book this car now
                    </button>
                </div>

            </div>
        </div>
        <hr/>
    </div>
    )
}


function select_car(id) {

    const location = document.querySelector("#booking_location").value;
    const pickup = document.querySelector("#booking_pickup").value;
    const dropoff = document.querySelector("#booking_dropoff").value;
    const factor = document.querySelector("#booking_factor").value;


    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone  - Book car"

    const csrftoken = getCookie('csrftoken');
    const request = new Request(
        /* URL */'/select_car',
        {headers: {'X-CSRFToken': csrftoken}}
    );
    fetch(request, {
        method: 'POST',
        mode: 'same-origin',  // Do not send CSRF token to another domain.
        body: JSON.stringify({
            location: location,
            pickup: pickup,
            dropoff: dropoff,
            factor: factor,
            car: id
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

        const car = result.body[0]

        ReactDOM.render(
            <CarSelected car={car} />,
            document.getElementById('search-results')
        );

        show_login_section()
        
        if (document.body.contains(document.querySelector('#username_login'))) {
            document.getElementById('book_car').style.display = "none";
            const message = "Login or register to book a car."
            error_message(message)
        }

        set_pickup_min()
        console.log(history.state)


        if (history.state.page == "search") {
            state_id++;
            info = history.state.stateObj

            const stateObj = {
                "page": "book_car", 
                "object": {
                    "car": id, 
                    "location": location, 
                    "pickup": pickup, 
                    "dropoff": dropoff,
                }, 
                "title": "Book Car",
                "state_id": state_id
            }
            const title = "book_car";
            
            window.history.pushState(stateObj, title, "#"+title);
            console.log(stateObj)
        }

        return false
    })
}

