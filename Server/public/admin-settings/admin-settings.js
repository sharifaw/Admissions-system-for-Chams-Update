// components
import header from "./components/header.js";
import nav from "./components/nav.js";
import popup from "./components/popup.js";

let editing = false;
let editing2 = false;

// functions

function renderBootcampSettings() {
  const emailSettings = document.querySelector("#email-settings");
  const bootcampSettings = document.querySelector("#bootcamp-settings");
  emailSettings.innerHTML = "";
  if (bootcampSettings.innerHTML == "") {
    bootcampSettings.innerHTML = "";
    bootcampSettings.insertAdjacentHTML("afterbegin", `
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
  </div>`);
    fetch("http://localhost:6000/chamsbootcamp/app-deadline").then(response => {
      if (response.status == 200) {
        return response.json()
      }
    })
      .then(result => {

        if (result) {
          const inputs = Array.from(document.querySelectorAll("input"));
          inputs[0].value = result[0].bootcamp_name;
          inputs[1].value = result[0].start_date.substring(0, 10);
          inputs[2].value = result[0].end_date.substring(0, 10);
          inputs[3].value = result[0].application_deadline.substring(0, 10);
          convertInputsIntoDivs();
          editing = true;
        }

      })
    const editBtn = document.querySelector(".edit-btn");
    const saveBtn = document.querySelector(".save-btn");
    saveBtn.addEventListener("click", saveInputs);

    editBtn.addEventListener("click", editInputs);
    return ("d");
  }
  return bootcampSettings.innerHTML = "";

}


function renderEmailSetting() {
  const emailSettings = document.querySelector("#email-settings");
  const bootcampSettings = document.querySelector("#bootcamp-settings");
  bootcampSettings.innerHTML = "";
  if (emailSettings.innerHTML == "") {
    emailSettings.innerHTML = "";
    emailSettings.insertAdjacentHTML("afterbegin", `
    <div>
    <div id="note"></div>
    <label for="email">Email</label>
    <input type="email" id="email" />
    </div>
    <div id="pass-div">
    <label for="password" >Password</label>
    <input type="password" id="password" />
    </div>
    <button id="edit-btn" hidden="false">Edit</button>
    <button class="save">Save</button>`);
    fetch("http://localhost:6000/chamsbootcamp/admin-email")
      .then(response => response.json())
      .then(result => {
        if (result[0].email !== null) {
          const inputs = Array.from(document.querySelectorAll("input"));
          inputs[0].value=result[0].email;
          convertEmailSettingInputToDiv()
        }
        
      })
    const editBtn=document.querySelector("#edit-btn");
    const saveBtn = document.querySelector(".save");
    saveBtn.addEventListener("click", saveInputsEmailSetting);
    editBtn.addEventListener("click", editInputsEmailSetting);

    return ("");

  }
  return emailSettings.innerHTML = "";
}
function saveInputsEmailSetting() {
  const inputs = Array.from(document.querySelectorAll("input"));
  const note = document.querySelector("#note");
  const email = inputs[0].value;
  const password = inputs[1].value;
  const requestOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      {
        email: email,
        password: password
      }

    ),
  };
  if (!email || !password) {
    note.innerHTML = "";
    note.insertAdjacentHTML('afterbegin', '<p>*fill field</p>');

  }
  else {
    note.innerHTML = "";
    fetch("http://localhost:6000/getemailsettings", requestOption)
      .then(response => {
        console.log(response.status);
        convertEmailSettingInputToDiv();
      })
  }
  

}
function editInputsEmailSetting() {
  convertEmailSettingDivToInput();
}
function convertEmailSettingDivToInput(){
  const div=document.querySelector(".form__item-value");
  const inputId="email";
  const inputValue=div.textContent;
  const input = document.createElement("input");
  input.id = inputId;
  input.type="email";
  input.style.border = "none";
  input.value = inputValue;
  input.style.border = "1px solid var(--light-grey)";
  document.querySelector("#pass-div").hidden=false;
  document.querySelector(".save").hidden = false;
  document.querySelector("#edit-btn").hidden = true;

  div.replaceWith(input);

}

function convertEmailSettingInputToDiv(){
  const input = document.querySelectorAll("input");
    const inputValue = input[0].value;
    const div = document.createElement("div");

    div.className = "form__item-value";
    div.style.border = "none";
    div.textContent = inputValue;

   input[0].replaceWith(div);
  document.querySelector("#pass-div").hidden=true
  document.querySelector(".save").hidden = true;
  document.querySelector("#edit-btn").hidden = false;
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
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  if (!editing) {
    fetch("http://localhost:6000/chamsbootcamp/setting", requestOption)
      .then(response => {
        if (response.status == 200) {
          convertInputsIntoDivs();
          editing = true;
        }
      })
  } else {
    fetch("http://localhost:6000/chamsbootcamp/setting/edit", requestOption)
      .then((response) => {
        if (response.status == 201) {
          convertInputsIntoDivs();
          document.querySelector(".edit-btn").disabled = false;

        }
      })
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

  const emailSettingsBtn = document.querySelectorAll(".button_setting")[0];
  const bootCampsSettingBtn = document.querySelectorAll(".button_setting")[1];


  emailSettingsBtn.addEventListener("click", renderEmailSetting);
  bootCampsSettingBtn.addEventListener("click", renderBootcampSettings);

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
      
         <button class="button_setting">Email Settings</button>
         <div id="email-settings"></div>
         <button class="button_setting">Bootcamp Settings</button>
         <div id="bootcamp-settings"></div>‏
      </div>
    </div>
  </main>
  `,
);



const logOutBtn = document.getElementsByClassName("header__logout")[0];
logOutBtn.addEventListener("click",()=>{
  fetch("http://localhost:6000/logout")
  .then((response)=>{
    if (response.status == 200){
      window.location.href = "../login"
    }
  })
})