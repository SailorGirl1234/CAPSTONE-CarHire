

function login() {

    {/* Get login form data and set csrf cookie value in headder */}
    formData = new FormData(login_form);
    var csrftoken = getCookie('csrftoken');
    var request = new Request(
    /* URL */'login_AJAX', { headers: { 'X-CSRFToken': csrftoken } });
    fetch(request, {
        method: 'POST',
        mode: 'same-origin', // Do not send CSRF token to another domain.
        body: formData
    }).then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log(result);

        if (result.error) {
            error_message(result.error);
            return false;
        }
        window.location.href = '/';
    }).catch(function (error) {
        console.error('Error:', error);
    });
}

function register() {
    formData = new FormData(register_form);
    var csrftoken = getCookie('csrftoken');
    var request = new Request(
    /* URL */'register', { headers: { 'X-CSRFToken': csrftoken } });
    fetch(request, {
        method: 'POST',
        mode: 'same-origin', // Do not send CSRF token to another domain.
        body: formData
    }).then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log(result);

        if (result.error) {
            error_message(result.error);
            return false;
        }
        window.location.href = '/';
    }).catch(function (error) {
        console.error('Error:', error);
    });
}

// Show update user section
function update_user_details() {
    document.getElementById('update_user').style.display = 'block';
    document.getElementById('main-section').style.display = 'none';
    document.getElementById('select_car').style.display = 'none';
    document.getElementById('messages').style.display = 'none';

    // update history api
    if (!history.state || history.state.page != "update") {
        state_id++;
        stateObj = { "page": "update", "object": "", "title": "Update", "state_id": state_id };
        title = "update";
        window.history.pushState(stateObj, title, "#" + title);
    }
}

function update_user() {

    // Get login form data and set csrf cookie value in header
    formData = new FormData(update_user_form);
    var csrftoken = getCookie('csrftoken');
    var request = new Request(
    /* URL */'update_user', { headers: { 'X-CSRFToken': csrftoken } });
    fetch(request, {
        method: 'POST',
        mode: 'same-origin', // Do not send CSRF token to another domain.
        body: formData
    }).then(function (response) {
        return response.json();
    }).then(function (result) {
        console.log(result);

        // If success - update username in nav bar
        if (result.error == "Changes saved succesfully.") {
            var user = result.body.username;
            document.getElementById('current_username').value = user;
            document.getElementById('username_profile').innerHTML = user;
        }

        // Display any messages and clear all passwords and new username inputs
        if (result.error) {
            error_message(result.error);
            document.getElementById('current_password').value = "";
            document.getElementById('new_password').value = "";
            document.getElementById('confirm_password').value = "";
            document.getElementById('new_username').value = "";
        }
    }).catch(function (error) {
        console.error('Error:', error);
    });
}