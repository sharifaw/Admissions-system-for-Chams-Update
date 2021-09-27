const submitButton = document.getElementById("submitBtn");
const firstInputPass = document.getElementById("firstInputPass");
const secondInputPass = document.getElementById("secondInputPass");
const message = document.getElementById("p_error_message");

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const option = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            password1: `${firstInputPass.value}`,
            password2: `${secondInputPass.value}`
        })
    }
    message.innerHTML = "";
    console.log("teeeest");
    fetch('http://localhost:6000/chamsbotcamp/resetpassword', option)
        .then(response => {
            if (response.status == 400) {
                message.innerHTML = "passwords does not match";
                console.log(response);
            }
            if (response.status == 200) {
                message.innerHTML = "your password has been changed";
                setTimeout(function () {
                    window.location = "/login";
                }, 2000);
            }
            return response.json()
        })

        .then(result => {
            console.log('result ', result);
        })
})

/*
fetch("http://localhost:6000/passwordreset")
    .then(response => {
        console.log(response.status)
        console.log('query ',response.query)
        if (response.status == 401) {
            // move the user to the log in page because the user does not have a token
            console.log("401")
            //window.location = "/login";
        }
        else if (response.status == 408) {
            errorSpan.innerHTML = "your time has been expired. Please try again";
            setTimeout(function () {
                window.location.href = "../../login/index.html";
            }, 2000);
        }
        else if (response.status == 200) {
            console.log('response status ', response.status)
            response.json();
        }

    })
*/