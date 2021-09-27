// components
import header from "./components/header.js";
import nav from "./components/nav.js";
import popup from "./components/popup.js";

// page content
const emails = ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti perspiciatis magnam praesentium nulla vero suscipit", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti perspiciatis magnam praesentium nulla perferendis id, vero suscipit explicabo a vitae beatae similique reiciendis corporis atque, non fugit est error nesciunt?", "Lorem ipsum dolor sit amet adipisicing elit. Deleniti perspiciatis magnam praesentium nulla atque, non fugit est error nesciunt?", "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti perspiciatis nulla."];

// functions
function renderEmailTemplates() {
  return emails.reduce((result, email, index) => {
    result += `<textarea class="main__template" data-index=${index}>${email}</textarea>`;
    return result;
  }, "");
}

// event listener

document.addEventListener("DOMContentLoaded", () => {
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
});

// render
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
