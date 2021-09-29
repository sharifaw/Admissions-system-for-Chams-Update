const firstNameInput = document.getElementById("first_name");
const lastNameInput = document.getElementById("last_name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("register_btn");
const errorMessageDiv = document.getElementById("register__error");

registerBtn.addEventListener("click", (event) => {
  event.preventDefault();
  errorMessageDiv.hidden = true;

  const postOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstname: `${firstNameInput.value}`,
      lastname: `${lastNameInput.value}`,
      email: `${emailInput.value}`,
      password: `${passwordInput.value}`,
    }),
  };
  fetch("http://localhost:6000/chamsbotcamp/register", postOption)
    .then((response) => {
      if (response.status == 400) {
        [passwordInput, emailInput, lastNameInput, firstNameInput].some((input) => {
          input.style.borderBottomColor = "var(--light-grey)";
          if (input.value.trim() == "") {
            input.style.borderBottomColor = "#f00";
            input.focus();
          }
        });
      } else if (response.status == 500) {
        errorMessageDiv.hidden = false;
        errorMessageDiv.innerHTML = "Please try again later";
      } else if (response.status == 401) {
        if (!isEmail(emailInput.value)) {
          errorMessageDiv.hidden = false;
          errorMessageDiv.innerHTML = "your email is not valid";
        } else {
          errorMessageDiv.hidden = false;
          errorMessageDiv.innerHTML = "Use at least 8 characters and must be Uppercase letters and numbers";
        }
      } else if (response.status == 402) {
        errorMessageDiv.hidden = false;
        errorMessageDiv.innerHTML = "your email is already in use";
      } else if (response.status == 201) {
        return response.json();
      }
    })
    .then((result) => {
      isCookie(result);
      if (result) {
        window.location = "/application-page";
      }
      /// move the candidate to the application page
    });
});

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isCookie(result) {
  for (const key in result) {
    document.cookie = `${key} = ${result[key]};path=/;Secure`;
  }
}
document.querySelector(".register__form").addEventListener("click", event => {
  // event.preventDefault();
  if (event.target.className == "register__input") {
    event.target.previousElementSibling.classList.add("formTop");
  }
  else if (event.target.className == "formLabel") {
    event.target.classList.add("formTop");
    event.target.nextElementSibling.focus();
  }
  // console.log(event.target.className );


})
document.querySelector(".register__form").addEventListener("keydown", event => {

  if (event.target.className == "register__input") {
    event.target.previousElementSibling.classList.add("formTop");
  }
  else if (event.target.className == "formLabel") {
    event.target.classList.add("formTop");
    event.target.nextElementSibling.focus();
  }
  // console.log(event.target.className );

})

document.body.addEventListener("click", event => {

  let label = document.querySelectorAll("p");
  for (let i = 0; i < label.length; i++) {
    if (label[i].className == "formLabel formTop") {
      if (label[i].nextElementSibling.value == "") {
        label[i].classList.remove("formTop");

      }
    }
  }

})