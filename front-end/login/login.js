const form = document.getElementById("main__form");
const emailInput = document.getElementById("main__email");
const passwordInput = document.getElementById("main__password");
const errorMessage = document.getElementsByClassName("error_message")[0];

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
  window.location.href = "../register/register-page.html";
  fetch("http://localhost:6000/chamsbotcamp/signin", postOption)
    .then(response => {
      if (response.status == 400 || response.status == 401) {
        errorMessage.innerHTML = "incorrect email or password";
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
        isCookie(result);
        if (result.email.includes("@chams.com")) {
          /// move the admin to the admin dashboard
           
        }
        else {
          /// move the admin to the user dashboard
          /// window.location.href = "../adminPage/index.html";
        }
      }

    })

});

function isCookie(result) {
  for (const key in result) {
    document.cookie = `${key} = ${result[key]};Secure`
  }
}