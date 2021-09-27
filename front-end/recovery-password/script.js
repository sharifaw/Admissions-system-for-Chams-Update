const submitButton = document.getElementById("submitButton");
const email = document.getElementById("email");
const message = document.getElementById("message");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();

    const option = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            email: `${email.value}`
        })
    }
    message.innerHTML=""; 
    
    fetch('http://localhost:6000/chamsbotcamp/recoverypassword', option)
        .then(response => {
         if (response.status == 500) {
                message.innerHTML = "*try again later";
            }
         else if (response.status == 404) {
                message.innerHTML = "*sorry your email doesn't exist";

            }
         else if(response.status==200){  
            message.innerHTML = "*check your email because we have been sent a password reset to your email";
            }
        })
});