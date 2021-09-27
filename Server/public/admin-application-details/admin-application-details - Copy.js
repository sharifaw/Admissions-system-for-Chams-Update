// components
import header from "./components/header.js";
import nav from "./components/nav.js";
import popup from "./components/popup.js";

function getInformationFromCookies() {
  const cookiesInfo = document.cookie.split(";").map((info) => info.split("="));
  let convertToObject = {};

  for (let i = 0; i < cookiesInfo.length; i++) {
    convertToObject[cookiesInfo[i][0].trim()] = cookiesInfo[i][1];
  }

  return convertToObject;
}


fetch("http://localhost:6000/chamsbootcamp/admin-email")
  .then(response => {
    if (response.status == 200) {
      return response.json()
    }
  })
  .then(result => {
    
  })

fetch("http://localhost:6000/user")
  .then(response => {
    if (response.status == 200) {
      return response.json()
    }
  })
  .then(result => {
    addCookie(result[0])
  })

function addCookie(result) {
  for (const key in result) {
    document.cookie = `${key} = ${result[key]};Secure`
  }
}
// functions
function renderAdminApplicationDetails() {
  const { email, id, first_name, last_name, nationality, unchr, gender,
    marital_status, phone, field_of_study, employment_status, hearing_about_chams,
    candidate_background, future_plans, programming_available, coding_experience } = getInformationFromCookies();
  return `
    <div class="main__content main__admin-application-details">
        <div id="${id}" class="main__summery">
          <div class="main__single-info">
            <h3>First Name Last Name: </h3>${first_name} ${last_name}
          </div>
          <div class="main__single-info">
            <h3>Email: </h3> ${email}
          </div>
          <div class="main__single-info">
            <h3>Nationality: </h3> ${nationality}
          </div>
          <div class="main__single-info">
          
            <h3>UNHCR : </h3> ${unchr}
          </div>
          <div class="main__single-info">
            <h3>Date of registration: </h3> 1/1/2021
          </div>
          <div class="main__single-info">
            <h3>Gender: </h3> ${gender}
          </div>
          <div class="main__single-info">
            <h3>Marital State: </h3> ${marital_status}
          </div>
          <div class="main__single-info">
            <h3>Phone: </h3> ${phone}
          </div>
          <div class="main__single-info">
            <h3>Highest degree earned: </h3> High School
          </div>
          <div class="main__single-info">
            <h3>Field of study if applicable: </h3> ${field_of_study}
          </div>
          <div class="main__single-info">
            <h3>Employment Status: </h3> ${employment_status}
          </div>
          <div class="main__single-info">
            <h3>How Did you hear about Chams? </h3> ${hearing_about_chams}
          </div>
          <div class="main__single-info">
            <h3>About the candidate: </h3> 
            <p>Tell us about your background</p> ${candidate_background}
            <p>What is your plans for the future?</p> ${future_plans}
            <p>Are you fully available for the program?</p> ${programming_available}
            <p>Coding experience</p> ${coding_experience}
          </div>
        </div>
        <div class="main__file-container">
          <a href="text.txt" download class="main__download-file" title="download this file">
            <i class="fas fa-file-download"></i> file name
          </a>
          <textarea class="main__comment" id="main__comment" name="" id="" placeholder="Type your comment then click on add comment"></textarea>
          <button class="main__comment-btn">Add comment</button>
          
        </div>
      </div>
  `;
}

function deletePopup() {
  document.getElementById("popup").remove();
}
function selectNav() {
  return document.querySelector("nav");
}
function addComment() {
  const fileContainer = document.querySelector(".main__file-container");
  const commentArea = document.querySelector(".main__comment");

  if (!commentArea.value.trim()) {
    return;
  }

  fileContainer.insertAdjacentHTML("beforeend", createComment(commentArea.value.trim()));
  commentArea.value = "";
  commentArea.focus();
}
let commentId = 0;
function createComment(text) {
  let result1 = false;
  const { id } = getInformationFromCookies();
  // fetch to save the comment on the backend
  const postOption = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "student_id": `${id}`,
      "comment": `${text}`,
    })
  }

  fetch("http://localhost:6000/chamsbootcamp/application-details/comment", postOption)
    .then(response => {
      console.log('tes');
      if (response.status == 200) {
        result1 = true;
        console.log('ress = ', result1);

      }
    })
  if (result) {
    return `
      <div class="main__comment-content" data-comment-id=${commentId++}>
        <p>${text}</p>
        <i class="fas fa-trash main__comment-delete-icon"></i>
      </div>
    `;
  }
  console.log("commentId = ", commentId);
}
function deleteComment(commentId) {
  // fetch to delete the comment

}
// render
document.body.insertAdjacentHTML(
  "afterbegin",
  `
  ${header()}
  <main class="main">
    <div class="container">
      <div class="main__offset"></div>
      ${nav()}
      ${renderAdminApplicationDetails()}
    </div>
  </main>
  `,
);

window.addEventListener("DOMContentLoaded", () => {
  //only for testing
  fetch("http://localhost:6000/chamsbootcamp/admin-comments/4")
    .then(response => {
      console.log(response.status);
      return response.json();
    })
    .then(result =>{
      console.log(result);
    })
    
    //ending of testing routes
  const commentBtn = document.querySelector(".main__comment-btn");
  commentBtn.addEventListener("click", addComment);

  const fileContainer = document.querySelector(".main__file-container");
  fileContainer.addEventListener("click", (event) => {
    const deleteCommentBtn = event.target;

    if (!deleteCommentBtn.classList.contains("main__comment-delete-icon")) {
      return;
    }

    deleteComment(deleteCommentBtn.parentElement.dataset.commentId);


  });
});
const logOutBtn = document.getElementsByClassName("header__logout")[0];
console.log(logOutBtn);
logOutBtn.addEventListener("click", () => {
  fetch("http://localhost:6000/logout")
    .then((response) => {
      if (response.status == 200) {
        window.location.href = "../login"
      }
    })
})
