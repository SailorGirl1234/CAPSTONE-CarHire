// Select content to render depending on page name in stateObj
function updateContent(stateObj) {
    if (stateObj) {
        var page = stateObj.page;
        var object = stateObj.object;
        // Choose function and AJAX request depending on page name
        if (page == "locations") {
            show_locations(object.code);
        } else if (page == "booking_confirmation") {
            booking_summary(object.id);
        } else if (page == "e-cars") {
            all_cars();
        } else if (page == "search") {
            search();
        } else if (page == "profile") {
            profile_page();
        } else if (page == "book_car") {
            select_car(object.car);
        } else if (page == "update") {
            update_user_details();
        }
    }
}

// Update the page content when the popstate event is called.
window.addEventListener('popstate', function (event) {
    updateContent(event.state);
});