// Show main landing page
function index_page() {
    // Make "home" active link in nav bar
    active("home-link");
    // SHow main section hide all others
    document.querySelector('#login-view').style.display = "none";
    document.getElementById('update_user').style.display = 'none';
    document.querySelector('#select_car').style.display = 'none';
    document.querySelector('#main-section').style.display = 'block';
    document.querySelector('#messages').style.display = "none";
    document.getElementById('update_user').style.display = 'none';

    // Update the minimum value for pickup date
    set_pickup_min();

    // Display landing page cards
    ReactDOM.render(React.createElement(Cards, null), document.getElementById('main-section'));

    // Update history api
    if (!history.state || history.state.page != "index") {
        state_id++;
        stateObj = { "page": "index", "object": "", "title": "Index", "state_id": state_id };
        title = "index";
        window.history.pushState(stateObj, title, " ");
    }
}

// Display landing page cards
function Cards() {
    return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
            "div",
            { className: "row justify-content-evenly" },
            React.createElement(Card1, null),
            React.createElement(Card2, null)
        )
    );
}

// Landing page card 1
function Card1() {
    return React.createElement(
        "div",
        { className: "card col-12 col-sm-5 my-2" },
        React.createElement("img", { src: "https://www.accenture.com/t20201125T093227Z__w__/us-en/_acnmedia/Accenture/Redesign-Assets/DotCom/Images/Global/Featured/16/Accenture-Electric-Vehicle-FAO-Featured-768x432.jpeg", className: "card-img-top p-3", alt: "Car charing" }),
        React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
                "h5",
                { className: "card-title" },
                "Electric Car Fleet"
            ),
            React.createElement(
                "p",
                { className: "card-text" },
                "At Capstone we offer a modern and reliable fleet of electric cars. "
            ),
            React.createElement(
                "p",
                { className: "card-text" },
                "Eco-conscious drivers out there have the opportunity to hire electric cars in London, where electric cars are exempt from the congestion charge meaning you can save money when driving in the capital. "
            ),
            React.createElement(
                "p",
                { className: "card-text" },
                "If you're looking to make a greener choice with your next car hire, capstone is the company to choose."
            ),
            React.createElement(
                "a",
                { onClick: function onClick() {
                        return all_cars();
                    }, className: "btn btn-danger bg_red red_hover " },
                "See our fleet"
            )
        )
    );
}

// Landing page card 2
function Card2() {
    return React.createElement(
        "div",
        { className: "card col-12 col-sm-5 my-2" },
        React.createElement("img", { src: "https://secretldn.com/wp-content/uploads/2020/10/london-november-1-730x427.jpg", className: "card-img-top p-3", alt: "Car charing" }),
        React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
                "h5",
                { className: "card-title" },
                "London based"
            ),
            React.createElement(
                "p",
                { className: "card-text" },
                "Are you looking to navigate one of the most popular cities in the world, or set off on a road trip into the country?"
            ),
            React.createElement(
                "p",
                { className: "card-text" },
                "Capstone is here to help. With locations around London at Heathrow, Gatwick and City Airports, picking up your hire car is easy."
            ),
            React.createElement(
                "p",
                { className: "card-text" },
                "Rent a car that best suits your trip using our straightforward booking panel. Hiring a car has never been easier."
            ),
            React.createElement(
                "a",
                { onClick: function onClick() {
                        return show_locations('all');
                    }, className: "btn btn-danger bg_red red_hover" },
                "See our locations"
            )
        )
    );
}