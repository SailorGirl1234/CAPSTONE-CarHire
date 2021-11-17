// Individual car item
function Car(props) {
    const car = props.value
    return (
        <div className="container-fluid">
            <div className="row my-4 bg_blue justify-content-center">
                <div className="col-sm-6 col-12">
                    <img src={ car.image } className="m-4 align-middle d-block car_image"/>
                </div>
                <div className="col-sm-6 col-12 d-flex align-items-center">
                    <div className="m-2 px-2">
                        <h1 className="display-6">{ car.make } { car.model }</h1>
                        <p className="lead">
                        <img src="/static/carhire/images/range.png" alt="" width="25" height="auto" className="icon d-inline-block align-text-bottom me-2"/>
                        Range: { car.range } miles<br/>
                        <img src="/static/carhire/images/charge.png" alt="" width="25" height="auto" className="icon d-inline-block align-text-bottom me-2 mb-1"/>
                        Fast Charge (80%): { car.charge_time } mins<br/>
                        <img src="/static/carhire/images/seat.png" alt="" width="25" height="auto" className="icon d-inline-block align-text-bottom me-2"/>
                        Seats: { car.seats } adults<br/>
                        <img src="/static/carhire/images/luggage.png" alt="" width="25" height="auto" className="icon d-inline-block align-text-top me-2"/>
                        Luggage: { car.storage }L
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  // Display list of cars
  function CarList(props) {
    const carlist = props.cars
    const carElements = carlist.map((car) =>
        <Car key={car.id} value={car} />
    );
    return (
        <div>
            {/* Sort select input */}
            <div className="row"><div className="col-auto"><div className="input-group">
                <div className="input-group-text" id="sort_cars">Sort by</div>
                <select className="form-select col-auto" name="sort_cars" id="sort_all_cars" onChange={()=>all_cars()}>
                    <option value="recommended">Recommended</option>
                    <option value="price+">Price low-high</option>
                    <option value="price-">Price high-low</option>
                    <option value="range">Range high-low</option>
                    <option value="charge">Charge time</option>
                    <option value="size+">Size small-large</option>
                    <option value="size-">Size large-small</option>
                </select>
            </div></div></div>
            {carElements}
        </div>
    );
  }

// Display list of all cars in fleet
function all_cars() {
    // Set e-cars nav link to active
    active("e-cars-link")
    // Show main-section
    document.querySelector('#select_car').style.display='none';
    document.querySelector('#main-section').style.display='block';
    document.querySelector('#login-view').style.display = "none";
    document.getElementById('update_user').style.display = 'none';
    document.querySelector('#messages').style.display = "none";

    // Update title
    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone - All E-Cars"
    
    // AJAX GET request for all car type details
    fetch('/cars', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(result => {

        console.log(result)
        const carlist= result.body
        
        // sort carlist
        if (document.body.contains(document.getElementById('sort_all_cars'))) {
            const sort_type = document.getElementById('sort_all_cars').value;
            if (sort_type == "price+") {
                carlist.sort(function(a, b){return a.price - b.price});
            } else if (sort_type == "price-") {
                carlist.sort(function(a, b){return b.price - a.price});
            } else if (sort_type == "range") {
                carlist.sort(function(a, b){return b.range - a.range});
            } else if (sort_type == "charge") {
                carlist.sort(function(a, b){return a.charge_time - b.charge_time});
            } else if (sort_type == "size+") {
                carlist.sort(function(a, b){return a.storage - b.storage});
            } else if (sort_type == "size-") {
                carlist.sort(function(a, b){return b.storage - a.storage});
            }
        }
        // Render the car list in the main-section
        ReactDOM.render(
            <CarList cars={carlist} />,
            document.getElementById('main-section')
        );
        
        // Update search bar min pickup value
        set_pickup_min()

        // Update history api
        if (!history.state || history.state.page != "e-cars") {
            state_id++;
            stateObj = {"page": "e-cars", "object": "", "title": "All E-Cars", "state_id": state_id}
            title = "all_cars"
            
            window.history.pushState(stateObj, title, "#"+title);

        }
    });
}
