import header from "./components/header.js";
import nav from "./components/nav.js";

let pageIndex = 0;
// users variable will contain all users object information from database
let users = [];

let subArraysOfEmails = [];

window.addEventListener("DOMContentLoaded", function () {
  const stageSelect = document.getElementById("stage-select");
  stageSelect.addEventListener("change", (event) => filterCandidatesStage(event));

  const informationSelect = document.getElementById("sort-by-select");

  informationSelect.addEventListener("change", (event) => sortCandidates(event));

  fetch("http://localhost:6000/candidates")
    .then((response) => response.json())
    .then((result) => {
      users = result;
      return users;
    })
    .then((users) => {
      createSubArraysOfEmails(users);
      renderUsersInfo(subArraysOfEmails[pageIndex]);
      if (users.length > 9) {
        renderPreviousNextButtons();
      }
      selectItem();
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
      <div class="main__content">
      <div class="main__select-div">
      ${createSelectElements()}
      </div>
      <div id="details-registers"class="main__admin-template"> 
      
      </div>
      <div class="main__button-div">
          <button id="previous" class="main__Button" disabled> Previous</button>
          <button id="next" class="main__Button" disabled>Next</button>
      </div>
      </div>
      
    </div>
    
  </main>
  `,
);
function selectItem() {
  const adminTemplateElement = document.querySelector(".main__admin-template");

  adminTemplateElement.addEventListener("click", (event) => storeCandidateInfoInCookies(event));
}
function storeCandidateInfoInCookies(event) {
  let candidateItem = "";

  if (event.target.classList.contains("main__item")) {
    candidateItem = event.target;
  } else if (event.target.closest(".main__item")) {
    candidateItem = event.target.closest(".main__item");
  } else {
    return;
  }

  let targetedCandidate = users.find((user) => user.id == candidateItem.dataset.index);

  const keys = Object.keys(targetedCandidate);
  const values = Object.values(targetedCandidate);

  for (let i = 0; i < keys.length; i++) {
    document.cookie = `${keys[i]}=${values[i]}; path=/;Secure`;
  }

  window.location = "http://localhost:6000/admin-application-details";
}
function saveInformationInCookies() {
  const formFields = getFormFields();

  for (const element of formFields) {
    if (element.type === "radio") {
      if (element.checked) {
        document.cookie = `${element.name} = ${element.value};Path=/;Secure`;
      }
      continue;
    }

    if (element.value) {
      document.cookie = `${element.name} = ${element.value};Path=/;Secure`;
    }
  }
}

function renderUsersInfo(users) {
  const adminTemplateElement = document.querySelector(".main__admin-template");

  return (adminTemplateElement.innerHTML = users.reduce((result, user) => {
    const { date_of_birth, first_name, gender, id, last_name, nationality } = user;
    result += `
      <div class="main__item" data-index=${id}>
          <p>${first_name} ${last_name}</p>
          <p>${nationality}</p>
          <p>${formatDateOfBirth(date_of_birth)}</p>
          <p>${gender}</p>
      </div>
    `;
    return result;
  }, ""));
}
function createSelectElements() {
  const stages = [
    ["all stages", [7]],
    ["app pending", [1]],
    [["test"], [2]],
    [["interview"], [3]],
    [["rejected"], [4]],
    [["accepted"], [5]],
    [["no application"], [6]],
  ];

  const sortList = [
    ["''", "Sort By"],
    ["first_name", "First Name"],
    ["last_name", "Last Name"],
    [["nationality"], "Nationality"],
    [["gender"], "Gender"],
    [["application_date"], ["Application Date"]],
  ];

  return `
      <select class="main__select" id="stage-select">
          ${stages.reduce((result, stage) => {
            result += `<option value=${stage[1]} class='main__option'>${stage[0]}</option>`;

            return result;
          }, "")}
      </select>

      <select class="main__select" id="sort-by-select">
          ${sortList.reduce((result, type) => {
            result += `<option value=${type[0]} class='main__option'>${type[1]}</option>`;
            return result;
          }, "")}
      </select>

  `;
}
function formatDateOfBirth(dateBirth) {
  return dateBirth ? dateBirth.slice(0, 10) : "null";
}
function filterCandidatesStage(event) {
  let stage = "";
  const detailsRegisters = document.getElementById("details-registers");

  if (event.target.value == 7) {
    stage = users;
  } else {
    stage = users.filter((user) => user.status_id == event.target.value);
  }

  createSubArraysOfEmails(stage);
  pageIndex = 0;
  enabledDisabledButtons(pageIndex);
  detailsRegisters.innerHTML = renderUsersInfo(subArraysOfEmails[pageIndex]);
}
function sortCandidates(event) {
  const sortValue = event.target.value;
  const detailsRegisters = document.getElementById("details-registers");

  subArraysOfEmails = subArraysOfEmails.flat(Infinity).sort((a, b) => {
    if (!a[sortValue]) {
      a[sortValue] = String(a[sortValue]);
    }

    if (!b[sortValue]) {
      b[sortValue] = String(b[sortValue]);
    }

    let aValue = a[sortValue].toUpperCase();
    let bValue = b[sortValue].toUpperCase();

    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  createSubArraysOfEmails(subArraysOfEmails);
  pageIndex = 0;
  enabledDisabledButtons(pageIndex);
  detailsRegisters.innerHTML = renderUsersInfo(subArraysOfEmails[pageIndex]);
}
function createSubArraysOfEmails(emails) {
  let candidatesEmails = emails.map((email) => email);
  subArraysOfEmails = [];

  while (candidatesEmails.length) {
    subArraysOfEmails.push(candidatesEmails.splice(0, 9));
  }
}
function renderPreviousNextButtons() {
  const previousBtn = document.getElementById("previous");
  const nextBtn = document.getElementById("next");

  if (pageIndex < subArraysOfEmails.length - 1) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }

  previousBtn.addEventListener("click", previousPage);
  nextBtn.addEventListener("click", nextPage);
}
function previousPage() {
  pageIndex = pageIndex - 1;

  enabledDisabledButtons(pageIndex);
}
function nextPage() {
  pageIndex = pageIndex + 1;

  enabledDisabledButtons(pageIndex);
}
function enabledDisabledButtons(pageIndex) {
  // previous button
  const previousBtn = document.getElementById("previous");

  renderUsersInfo(subArraysOfEmails[pageIndex]);
  previousBtn.disabled = false;

  if (pageIndex == 0) {
    previousBtn.disabled = true;
  }

  // next button
  const nextBtn = document.getElementById("next");
  renderUsersInfo(subArraysOfEmails[pageIndex]);
  nextBtn.disabled = false;

  if (pageIndex == subArraysOfEmails.length - 1) {
    nextBtn.disabled = true;
  }
}

const logOutBtn = document.getElementsByClassName("header__logout")[0];
logOutBtn.addEventListener("click",()=>{
  fetch("http://localhost:6000/logout")
  .then((response)=>{
    if (response.status == 200){
      window.location.href = "../login"
    }
  })
})