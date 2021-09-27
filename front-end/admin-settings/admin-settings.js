// components
import header from "./components/header.js";
import nav from "./components/nav.js";
import popup from "./components/popup.js";

let editing = false;

// functions

function renderAdminSettings() {
  return `
    <div class="admin-settings__container">
      <div class="admin-settings__btn-container">
        <button class="normal-btn edit-btn">Edit</button>
      </div>
      <form class="main__form-settings">
        <div class="form__form-group">
          <label for="boot-camp-name" class="form__label">Boot camp name</label>
          <input type="text" name="boot-camp-name" id="boot-camp-name" class="form__item-value"/>
        </div>
        <div class="form__form-group">
          <label for="start-date" class="form__label">Start date</label>
          <input type="date" name="start-date" id="start-date" class="form__item-value"/>
        </div>
        <div class="form__form-group">
          <label for="end-date" class="form__label">End date</label>
          <input type="date" name="end-date" id="end-date" class="form__item-value"/>
        </div>
        <div class="form__form-group">
          <label for="application-deadline" class="form__label">Application deadline</label>
          <input type="date" name="application-deadline" id="application-deadline" class="form__item-value"/>
        </div>
      </form>
    <div class="admin-settings__btn-container">
      <button class="normal-btn save-btn">Save</button>
    </div>
    </div>
  `;
}

function closePopup() {
  document.getElementById("popup").remove();
}

function checkEmptyInputs(inputs) {
  if (
    inputs.some((input) => {
      input.focus();
      return input.value.trim() === "";
    })
  ) {
    return true;
  } else {
    return false;
  }
}

function convertInputsIntoDivs() {
  const formGroup = Array.from(document.querySelectorAll(".form__form-group"));

  for (let i = 0; i < formGroup.length; i++) {
    const inputValue = formGroup[i].querySelector("input").value;
    const div = document.createElement("div");

    div.className = "form__item-value";
    div.style.border = "none";
    div.textContent = inputValue;

    formGroup[i].querySelector("input").replaceWith(div);
  }

  document.querySelector(".save-btn").style.display = "none";
  document.querySelector(".edit-btn").style.display = "inline";
}

function convertDivsIntoInputs() {
  const formGroup = Array.from(document.querySelectorAll(".form__form-group"));

  const inputIds = ["boot-camp-name", "start-date", "end-date", "application-deadline"];

  for (let i = 0; i < formGroup.length; i++) {
    const itemValue = formGroup[i].querySelector(".form__item-value").textContent;

    const input = document.createElement("input");

    if (i === 0) {
      input.type = "text";
    } else {
      input.type = "date";
    }

    input.id = inputIds[i];
    input.className = "form__item-value";
    input.style.border = "none";
    input.value = itemValue;
    input.style.border = "1px solid var(--light-grey)";

    formGroup[i].querySelector(".form__item-value").replaceWith(input);
  }

  document.querySelector(".save-btn").style.display = "inline";
}

function saveInputs() {
  const inputs = Array.from(document.querySelectorAll("input"));

  if (checkEmptyInputs(inputs)) {
    const main = document.querySelector("main");

    main.insertAdjacentHTML("beforeend", popup("Please fill in all inputs"));

    document.getElementById("popup__close").addEventListener("click", closePopup);
    return;
  }

  const bootCampName = inputs[0];
  const startDate = inputs[1];
  const endDate = inputs[2];
  const applicationDeadline = inputs[3];

  const requestBody = {
    bootCampName: bootCampName.value,
    startDate: startDate.value,
    endDate: endDate.value,
    applicationDeadline: applicationDeadline.value,
  };

  const requestOption = {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  if (!editing) {
    console.log("save a new item");
    // fetch("url", requestOption)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result.status === 201) {
    convertInputsIntoDivs();
    //     }
    //   });
  } else {
    // fetch("url", requestOption)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     if (result.status === 200) {
    convertInputsIntoDivs();
    //     }
    //   });
    console.log("edit item");
    editing = false;
    document.querySelector(".edit-btn").disabled = false;
  }
}

function editInputs() {
  editing = true;
  document.querySelector(".edit-btn").disabled = true;
  console.log();
  convertDivsIntoInputs();
}

// event listeners
window.addEventListener("DOMContentLoaded", () => {
  const editBtn = document.querySelector(".edit-btn");
  const saveBtn = document.querySelector(".save-btn");

  saveBtn.addEventListener("click", saveInputs);

  editBtn.addEventListener("click", editInputs);
});

// render
document.body.insertAdjacentHTML(
  "afterbegin",
  `
  ${header()}
  <main class="main admin-settings">
    <div class="container">
      <div class="main__offset"></div>
      ${nav()}
      <div class="main__content main__admin-settings">
      ${renderAdminSettings()}
      </div>
    </div>
  </main>
  `,
);
