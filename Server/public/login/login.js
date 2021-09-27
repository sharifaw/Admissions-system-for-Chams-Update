const form = document.getElementById("main__form");
const emailInput = document.getElementById("main__email");
const passwordInput = document.getElementById("main__password");
const errorMessage = document.getElementsByClassName("error_message")[0];
const forgetPasswordLink = document.getElementById("forget_password_link");
const registerLink = document.getElementById("register_link");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const postOption = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": `${emailInput.value}`,
      "password": `${passwordInput.value}`,
    })
  }
  errorMessage.innerHTML = "";

  fetch("http://localhost:6000/chamsbotcamp/signin", postOption)
    .then(response => {
      console.log(response.status);
      if (response.status == 400 || response.status == 401) {
        errorMessage.innerHTML = "incorrect email or password";
        // maybe we should focus on the empty or wrong input faileds
      }

      if (response.status == 500) {
        errorMessage.innerHTML = "please try again later";
      }

      if (response.status == 200) {
        return response.json();
      }
    })
    .then(result => {

      if (result) {
        console.log(result)
        isCookie(result);
        if (result.email.includes("@gmail.com")) {
          /// move the admin to the admin dashboard
          window.location = "/admin-dashboard";
        }
        else {
          if (result.status_id == 6) {
            /// move the candidate to the application because his status is no_application
            window.location = "/application-page";
          }
          else {
            /// move the candidate to the user dashboard
            window.location = "/candidate-dashboard";
          }

        }
      }

    })

});

forgetPasswordLink.addEventListener('click', event => {
  window.location = "/passwordreset"
})

registerLink.addEventListener('click', event => {
  window.location = "/register"
})

function isCookie(result) {
  for (const key in result) {
    document.cookie = `${key} = ${result[key]};Secure`
  }
}

document.addEventListener("DOMContentLoaded", event => {


  document.querySelectorAll(".main__form")[0].addEventListener("click", event => {
    // event.preventDefault();
    if (event.target.className == "main__input") {
      event.target.previousElementSibling.classList.add("formTop");
    }
    else if (event.target.className == "formLabel") {
      event.target.classList.add("formTop");
      event.target.nextElementSibling.focus();
    }
    // console.log(event.target.className );

  })

  document.querySelectorAll(".main__form")[0].addEventListener("keydown", event => {

    if (event.target.className == "main__input") {
      event.target.previousElementSibling.classList.add("formTop");
    }
    else if (event.target.className == "formLabel") {
      event.target.classList.add("formTop");
      event.target.nextElementSibling.focus();
    }
    // console.log(event.target.className );

  })

  document.querySelectorAll(".main__input")[0].addEventListener("focusout", event => {
    if (event.target.value == "") {
      event.target.previousElementSibling.classList.remove("formTop");
    }
  })

  document.querySelectorAll(".main__input")[1].addEventListener("focusout", event => {
    if (event.target.value == "") {
      event.target.previousElementSibling.classList.remove("formTop");
    }
  })


})
