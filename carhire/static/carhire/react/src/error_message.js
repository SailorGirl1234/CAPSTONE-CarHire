// Display error message in "messages section" at to of page in a warning alert

function ErrorMessage(props) {
    var error = props.error

    return (
        <div className="alert mt-2 alert-warning" role="alert">
            {error}
        </div>
    );
}

function error_message(error) {
    document.querySelector('#messages').style.display = "block";

    ReactDOM.render(
        <ErrorMessage error={error} />,
        document.getElementById('messages')
    );
    document.getElementById('messages').scrollIntoView({behavior: 'smooth'});

    return
}

