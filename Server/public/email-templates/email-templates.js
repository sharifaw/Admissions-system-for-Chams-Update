// components
import header from "./components/header.js";
import nav from "./components/nav.js";
import popup from "./components/popup.js";

// page content
const subject = ["test_req", "intreview_req", "rejected", "accepted"]
let emails = []; /*["Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti perspiciatis magnam praesentium nulla vero suscipit","no","yes","noo"];*/

// functions
function renderEmailTemplates() {
  console.log('em = ',emails.length);
  return emails.reduce((result, email, index) => {
    result += `<textarea class="main__template" data-index=${index}>${email}</textarea>`;
    return result;
  }, "");
}

// event listener
function fetchEmails() {
  fetch("http://localhost:6000/chamsbootcamp/emails")
    .then((response) => {
      console.log(response.status);
      return response.json();
    })
    .then(result => {
      console.log('r = ', result);

      result.forEach((element, index) => {
        emails[index] = element.text_email
      });
      console.log('email = ',emails[0]);
    })
}

document.addEventListener("DOMContentLoaded", () => {
  fetchEmails();
  console.log('email',emails);
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
  ${header()}
  <main class="main">
    <div class="container">
      <div class="main__offset"></div>
      ${nav()}
      <div class="main__content main__email-template">
        ${renderEmailTemplates()}
      </div>
    </div>
  </main>
  `,
  );
  const mainContent = document.querySelector(".main__content");

  mainContent.addEventListener("change", (event) => {
    const element = event.target;

    if (element.tagName !== "TEXTAREA") {
      return;
    }

    if (element.value != emails[element.dataset.index]) {
      const popupContent = `
        <div class="popup__email-template">
          <h3>Do you want to save changes?</h3>
          <div class="popup__buttons-container">
            <button class="popup__normal-btn" id="popup__yes-btn">Yes</button>
            <button class="popup__normal-btn" id="popup__no-btn">NO</button>
          </div>
        </div>
      `;

      mainContent.insertAdjacentHTML("beforeend", popup(popupContent));

      const yesBtn = document.getElementById("popup__yes-btn");
      const noBtn = document.getElementById("popup__no-btn");

      yesBtn.addEventListener("click", () => {
        emails[element.dataset.index] = element.value;
        document.getElementById("popup").remove();
      });

      noBtn.addEventListener("click", () => {
        document.getElementById("popup").remove();
        element.value = emails[element.dataset.index];
      });
    }
  });

  const logOutBtn = document.getElementsByClassName("header__logout")[0];
  logOutBtn.addEventListener("click", () => {
    fetch("http://localhost:6000/logout")
      .then((response) => {
        if (response.status == 200) {
          window.location.href = "../login"
        }
      })
  })

});

// render



