// Once document is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Hide update user section
    document.getElementById('update_user').style.display = 'none';

    // Set minimum pick up date-time for search bar
    set_pickup_min();

    // If user is not logged in, add event listner to login button
    if (document.body.contains(document.querySelector('#login_form'))) {
        var login_form = document.querySelector('#login_form');
        login_form.addEventListener("submit", function (e) {
            e.preventDefault();
            login();
        });
    }
    // If user is not logged in, add event listner to rigester button
    if (document.body.contains(document.querySelector('#register_form'))) {
        var register_form = document.querySelector('#register_form');
        register_form.addEventListener("submit", function (e) {
            e.preventDefault();
            register();
        });
    }
    // If user is logged in add event listner to update user info button
    if (document.body.contains(document.querySelector('#update_user_form'))) {
        var _register_form = document.querySelector('#update_user_form');
        _register_form.addEventListener("submit", function (e) {
            e.preventDefault();
            update_user();
        });
    }

    var search_button = document.querySelector('#search');
    search_button.addEventListener('click', function () {
        return search();
    });

    // Show landing page
    index_page();
});

// History state tracker
var state_id = 1;

// Show login section
function show_login_section() {
    document.querySelector('#login-view').style.display = "block";
    document.getElementById('login-view').scrollIntoView({ behavior: 'smooth' });
}

// Close login section
function hide_login_section() {
    document.querySelector('#login-view').style.display = "none";
}

// Update active status of navbar links
function active(e) {
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function (el) {
        el.classList.remove("active");
    });
    var element = document.getElementById(e);
    if (element) {
        element.classList.add("active");
    }
}

// Set search bar min pickup value to tomorrow 08:00
function set_pickup_min() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var text = tomorrow.toJSON().substring(0, 11);
    text += "08:00";
    document.getElementById('pickup').min = text;
}

// Update min drop off time to = pickup time - cant drop off before pickup
function updateDropoff() {
    var pickup = document.getElementById('pickup').value;
    document.getElementById('dropoff').min = pickup;
}

// Update max pickup time to = dropoff time - cant pick up after dropoff
function updatePickup() {
    var dropoff = document.getElementById('dropoff').value;
    document.getElementById('pickup').max = dropoff;
}

// Cancel booking
function cancel_booking(id) {

    fetch('cancel_booking/' + id, {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log(result);

        // If an error is returned
        if (result.error) {
            error_message(result.error);
            return;
        }
        // Return to profile page and display booking canceled confirmation
        if (result.message) {
            profile_page();
            error_message(result.message);
            return;
        }
    });
}

/* from django documentation - get csrf token from cookie */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === name + '=') {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}