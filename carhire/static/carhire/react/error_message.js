// Display error message in "messages section" at to of page in a warning alert

function ErrorMessage(props) {
    var error = props.error;

    return React.createElement(
        "div",
        { className: "alert mt-2 alert-warning", role: "alert" },
        error
    );
}

function error_message(error) {
    document.querySelector('#messages').style.display = "block";

    ReactDOM.render(React.createElement(ErrorMessage, { error: error }), document.getElementById('messages'));
    document.getElementById('messages').scrollIntoView({ behavior: 'smooth' });

    return;
}