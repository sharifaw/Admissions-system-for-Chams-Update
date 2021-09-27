import popup from "./popup.js";
let usersFromDB = [];
// fetch("http://localhost:6000/users")
//   .then(response => {
//     console.log(response.status);
//     if (response.status == 404 || response.status == 500) {
//       console.log("failed")
//     }
//     else if (response.status == 200) {
//       return response.json();
//     }
//   })
//   .then(result => {
//     usersFromDB = result
//   })

let allEmails = [];
let pageIndex = 0;
const pageInfo = [
  {
    icon: `<i class="fas fa-columns"></i>`,
    item: `<a href="#">Dashboard</a>`,
  },
  {
    icon: `<i class="fas fa-envelope-open-text"></i>`,
    item: `<a href="#">Email templates</a>`,
  },
  {
    icon: `<i class="fas fa-cog"></i>`,
    item: `<a href="#">Settings</a>`,
  },
  {
    icon: `<i class="fas fa-users"></i>`,
    item: `<a href="#">Users</a>`,
  },
];
function createSubArraysOfEmails(emails) {
  console.log(emails);
  let candidatesEmails = emails.map((email) => email);

  while (candidatesEmails.length) {
    allEmails.push(candidatesEmails.splice(0, 9));
  }
}

function deleteEmail() {
  const adminTemplate = document.querySelector(".main__admin-template");

  adminTemplate.addEventListener("click", (event) => {
    if (!event.target.classList.contains("main__button-style")) {
      return;
    }

    const deleteBtn = event.target;
    const main = document.querySelector("main");
    const popupContent = `
        <div class="popup__email-template">
          <h3>Are you sure to delete this email?</h3>
          <div class="popup__buttons-container">
            <button class="popup__normal-btn" id="popup__yes-btn">Yes</button>
            <button class="popup__normal-btn" id="popup__no-btn">NO</button>
          </div>
        </div>
      `;

    main.insertAdjacentHTML("beforeend", popup(popupContent));

    document.getElementById("popup__no-btn").addEventListener("click", closePopup);
    document.getElementById("popup__close").addEventListener("click", closePopup);

    document.getElementById("popup__yes-btn").addEventListener("click", (event) => {
      // we have two requests delete and get, get request will be after deleting the email
      // fetch("https://jsonplaceholder.typicode.com/todos", { method: "DELETE" })

      fetch(`http://localhost:6000/chamsbootcamp/register/${deleteBtn.parentElement.dataset.index}`,
        { method: "DELETE" })
        .then((response) => {
          console.log(response.status);
          if (response.status == 201) {
            // console.log(allEmails);
            usersFromDB = usersFromDB.filter((user) => user.id != deleteBtn.parentElement.dataset.index);
            deleteBtn.parentElement.remove();
            // allEmails = [];
            // console.log("usersFromDB = ", usersFromDB);
            // return usersFromDB;
          }
        })
      .then((arr) => {
        fetch("http://localhost:6000/users")
        .then(response => {
          console.log(response.status);
          if (response.status == 404 || response.status == 500) {
            console.log("failed")
          }
          else if (response.status == 200) {
            return response.json();
          }
        })
        .then((result) => {
          usersFromDB = result;
          createSubArraysOfEmails(usersFromDB);
          renderEmails(allEmails[pageIndex]);
          renderPreviousNextButtons();
          deleteEmail();
        })
        // createSubArraysOfEmails(arr);
        // console.log("allEmails = ", allEmails);
        // renderEmails(allEmails);
        // createSubArraysOfEmails(result)
      });

    

      closePopup();
    });
  });
}

function renderPreviousNextButtons() {
  const previousBtn = document.getElementById("previous");
  const nextBtn = document.getElementById("next");

  if (pageIndex < allEmails.length - 1) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }

  previousBtn.addEventListener("click", previousPage);
  nextBtn.addEventListener("click", nextPage);
}
//
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

  renderEmails(allEmails[pageIndex]);
  previousBtn.disabled = false;

  if (pageIndex == 0) {
    previousBtn.disabled = true;
  }

  // next button
  const nextBtn = document.getElementById("next");
  renderEmails(allEmails[pageIndex]);
  nextBtn.disabled = false;

  if (pageIndex == allEmails.length - 1) {
    nextBtn.disabled = true;
  }
}

function closePopup() {
  document.getElementById("popup").remove();
}

function renderEmails(emails) {
  const adminTemplateHTML = document.querySelector(".main__admin-template");
  adminTemplateHTML.innerHTML ="";
  return (adminTemplateHTML.innerHTML = emails.reduce((result, userEmail) => {
    const { id, email } = userEmail;

    result += `
      <div class="main__item" data-index=${id}>
        <p>${email}</p>
        <button class="main__button-style">Delete</button>
      </div>
    `;
    return result;
  }, ""));
}

function header() {
  return `
    <header class="header">
      <div class="container">
        <p class="header__user">username / admin</p>
        <a href="#" class="header__logout">
          Logout
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </header>
  `;
}

function nav() {
  return `
    <nav class="main__nav">
      <div class="main__logo">
        <img src="https://static.wixstatic.com/media/5a7a9c_17899961619c4598b4820ec99dbf10a8~mv2.png/v1/fill/w_128,h_45,al_c,q_85,usm_0.66_1.00_0.01/chams-logo-blanc-08.webp" alt="">
      </div>
      <ul>
        ${pageInfo.reduce((result, info, index) => {
    const { icon, item } = info;

    result += `
          <li class="main__list-item ${index === 0 && "main__list-item--bg"}">
            ${icon} ${item}
          </li>`;
    return result;
  }, "")}
      </ul>
    </nav>
  `;
}

document.body.insertAdjacentHTML(
  "afterbegin",
  `
  ${header()}
  <main class="main">
    <div class="container">
      <div class="main__offset"></div>
      ${nav()}
      <div class="main__content">
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

window.addEventListener("DOMContentLoaded", () => {
  // inside fetch, replace this URL with ours
  fetch("http://localhost:6000/users")
    .then(response => {
      console.log(response.status);
      if (response.status == 404 || response.status == 500) {
        console.log("failed")
      }
      else if (response.status == 200) {
        return response.json();
      }
    })
    .then((result) => {
      usersFromDB = result;
      /* 
        pass the result from fetch to this function --> createSubArraysOfEmails(result)
        delete the line that call this function with fake array of emails --> createSubArraysOfEmails(["1user@gmail.com", "2user@gmail.com", ... ,"20user@gmail.com"]);
      */
      //
      // createSubArraysOfEmails(["1user@gmail.com", "2user@gmail.com", "3user@gmail.com", "4user@gmail.com", "5user@gmail.com", "6user@gmail.com", "7user@gmail.com", "8user@gmail.com", "9user@gmail.com", "10user@gmail.com", "11user@gmail.com", "12user@gmail.com", "13user@gmail.com", "14user@gmail.com", "15user@gmail.com", "16user@gmail.com", "17user@gmail.com", "18user@gmail.com", "19user@gmail.com", "20user@gmail.com"]);
      createSubArraysOfEmails(usersFromDB);
      renderEmails(allEmails[pageIndex]);
      renderPreviousNextButtons();
      deleteEmail();
    })
    // .then(() => {
    //   renderEmails(allEmails[pageIndex]);
    //   renderPreviousNextButtons();
    //   deleteEmail();
    // });
});
