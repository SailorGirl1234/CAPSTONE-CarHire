// Opening hours
function Hours(props) {
    const day = props.value
    return (
        <tr className="py-0">
            <td className="py-0 d-lg-block d-none mx-4"> </td>
            <th className="py-0">{day.day}: </th>
            <td className="py-0">{day.from} - {day.to}</td>
            <td className="py-0 d-lg-block d-none mx-4"> </td>
        </tr>
    )
}

// Location from list
function Location(props) {
    const location = props.value
    const hours = location.hours
    const hoursElements = hours.map((day) =>
        <Hours key={day.day} value={day} />
    );
    return (
        <div className="container-fluid">
            <div className="row my-4 bg_blue justify-content-center">
                <div className="col-12">
                    <h1 className="display-6 m-4 mb-2"><a href="#" onClick={() => show_locations(location.code)} className="text-decoration-none">London {location.site}</a></h1>
                </div>
                <div className="col-sm-6 col-12 p-2 px-4">
                    <div>
                        <table className="table table-borderless table-dark bg_blue">
                            <tbody>
                                <tr>
                                    <th scope="row">Address:</th>
                                    <td>{location.address+", "}
                                        <a href={"https://www.google.com/maps/place/" + location.postcode} target="_blank">
                                            {location.postcode}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Telephone:</th>
                                    <td>{location.tel}</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Opening hours dropdown if on small screen - table alwas shown if on md+ */}
                        <div>
                            <a className="btn btn-outline-light bg_blue p-2 d-md-none" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+location.code} aria-expanded="false" aria-controls={"collapse"+location.code}>
                                <strong>Opening Hours</strong>
                            </a>
                            <div className="d-md-block d-none px-2">
                                <strong>Opening Hours:</strong>
                            </div>
                            <div className="collapse d-md-block" id={"collapse"+location.code}>
                                <div className="card card-body p-1 border-0">           
                                    <table className="table table-borderless table-dark bg_blue table-sm ">
                                        <tbody>
                                            {hoursElements}
                                        </tbody>               
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* location info only shown on md+ screens */}
                <div className="col-sm-6 col-12 d-flex align-items-center">
                    <div className="py-2 px-sm-4 pe-3">
                        <div className="d-md-block d-none p-2">
                            <small className="linebrk">{location.info}</small>
                        </div>
                        {/* location map - picture --> */}
                        <div className="d-flex justify-content-center mb-2">
                            <a href={"https://www.google.com/maps/place/"+location.postcode} target="_blank">
                                <img className="map_img img-fluid m-2 border border-3" src={"/static/"+location.map}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
  }

// Location list 
function LocationsList(props) {
    const locationslist = props.locations
    const locationElements = locationslist.map((location) =>
        <Location key={location.code} value={location} />
    );
    return (
        <div>
            <div className="p-2 px-4 mx-2 container-fluid ">
                <h1 className="display-6">
                    Hire electric from London
                </h1>
                <p>
                    The future of motoring is electric and hiring one can offer you many advantages. 
                    Whether it is a short term hire for a holiday or a long term hire for your business, 
                    there is no time like the present to make the switch to an EV. 
                </p>
                <div id="bonuses" >
                    <ul>
                        <li>No London Congestion Charge or ULEZ Charge for EVs</li>
                        <li>The fuel savings on EVs are huge compared to petrol or diesel cars</li>
                        <li>There are now more public electric car charging stations than petrol stations</li>
                        <li>Help the environment and stop climate change by driving an EV</li>
                        <li>Free parking for electric vehicles in many locations</li>
                        <li>Autopilot capability – subject to vehicle and model</li>
                    </ul>
                </div>
            </div>
            {locationElements}
        </div>
    );
  }


// Single location
function OneLocation(props) {
    const location = props.locations
    const hours = location.hours
    const hoursElements = hours.map((day) =>
        <Hours key={day.day} value={day} />
    );
    
    return (
        <div>
            <div className="pt-4 p-2">
                <h1 className="display-6">Hire a car from London {location.site} </h1>
            </div>
            <div className="row my-2">
                <div className="col-12 col-sm-6 ms-2 ">
                    <p className="linebrk">{ location.info}</p>
                    <p className="linebrk">{ location.details.about}</p>
                </div>
                <div className="d-none d-md-block col-5 mx-auto my-auto">
                    <img src={location.details.photo} style={{width: 100+"%", height: "auto"}}/>
                </div>
            </div>
            <hr/>
            <div className="row my-4">
                <div className="col-12 col-md-5 mx-auto my-auto">
                <div className="d-flex justify-content-center mb-2">
                    <a href={"https://www.google.com/maps/place/"+location.postcode} target="_blank">
                        <img className="map_img img-fluid m-2 border border-3" src={"/static/"+location.map}/>
                    </a>
                </div>
                </div>
                <div className="col-12 col-sm-5 mx-auto my-auto">
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th scope="row">Address:</th>
                                <td>
                                    {location.address+", "}
                                    <a href={"https://www.google.com/maps/place/"+location.postcode} target="_blank">
                                        {location.postcode}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">Telephone:</th>
                                <td>{location.tel}</td>
                            </tr>
                        </tbody>
                    </table>
                    {/* Opening hours dropdown if on small screen - table alwas shown if on md+ */}
                    <div>
                        <a className="btn btn-outline-dark p-2 d-md-none" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse"+location.code} aria-expanded="false" aria-controls={"collapse"+location.code}>
                            <strong>Opening Hours</strong>
                        </a>
                        <div className="d-md-block d-none px-2">
                            <strong>Opening Hours:</strong>
                        </div>
                        <div className="collapse d-md-block" id={"collapse"+location.code}>
                            <div className="card card-body p-1 border-0">      
                                <table className="table table-borderless table-sm ">
                                    <tbody>
                                        {hoursElements}
                                    </tbody>               
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="p-2 container-fluid">
                <h1 className="display-6">
                    Hire electric from London
                </h1>
                <p>
                    The future of motoring is electric and hiring one can offer you many advantages. 
                    Whether it is a short term hire for a holiday or a long term hire for your business, 
                    there is no time like the present to make the switch to an EV. 
                </p>
                <div id="bonuses" >
                    <ul>
                        <li>No London Congestion Charge or ULEZ Charge for EVs</li>
                        <li>The fuel savings on EVs are huge compared to petrol or diesel cars</li>
                        <li>There are now more public electric car charging stations than petrol stations</li>
                        <li>Help the environment and stop climate change by driving an EV</li>
                        <li>Free parking for electric vehicles in many locations</li>
                        <li>Autopilot capability – subject to vehicle and model</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


function show_locations(code) {
    // set active status to link in nav bar
    active("navbarDropdown")
    // Show main section and hide all others
    document.querySelector('#main-section').style.display='block';
    document.querySelector('#select_car').style.display='none';
    document.querySelector('#login-view').style.display = "none";
    document.getElementById('update_user').style.display = 'none';
    document.querySelector('#messages').style.display = "none";

    //Update title
    document.getElementsByTagName("TITLE")[0].innerHTML = "Capstone  - "+ code

    // AJAX GET request for data for location section
    fetch('/location/'+code, {
        method: 'GET',  
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)

        // If error in result display at top of page
        if(result.error) {
            error_message(result.error)         
            return
        }

        // Render the all locations list in the main-section
        var locationList= result.body
        if (result.code == "all") {
            ReactDOM.render(
                <LocationsList locations={locationList} />,
                document.getElementById('main-section')
            );
            
        } else {
            // Render the specific location in the main-section
            ReactDOM.render(
                <OneLocation locations={locationList} />,
                document.getElementById('main-section')
            )
        }

        // Update pickip minimum value in search bar
        set_pickup_min()

        // Update history api
        if (!history.state.object.code || history.state.object.code != code) {
            state_id++;
            stateObj = {"page": "locations", "object": {"code": code}, "title": "Location - "+code, "state_id": state_id}
            title = "location-"+code
            
            window.history.pushState(stateObj, title, "#"+title);

        }

        return
        
    });
}