// components
import header from "./components/header.js";
import nav from "./components/nav.js";
function getInformationFromCookies() {
  const cookiesInfo = document.cookie.split(";").map((info) => info.split("="));
  let convertToObject = {};
  for (let i = 0; i < cookiesInfo.length; i++) {
    convertToObject[cookiesInfo[i][0].trim()] = cookiesInfo[i][1];
  }
  return convertToObject;
}
// functions
function renderAdminApplicationDetails() {
  const { email, id, first_name, last_name, nationality, unchr, gender, marital_status, phone, field_of_study, employment_status, hearing_about_chams, candidate_background, future_plans, programming_available, coding_experience } = getInformationFromCookies();
  return `
  
    <div class="main__content main__admin-application-details">
      <p id="header">Candidate Details</p>
      <div id="${id}" class="main__summery">
          <div id="info">
          <div class="main__single-info">
         
            <h4>Candidate Name: </h4>
            <snap>${first_name} ${last_name}</snap>
          </div>
          <div class="main__single-info">
            <h4>Email: </h4>
            <snap>${email}</snap>
          </div>
          <div class="main__single-info">
            <h4>Nationality: </h4> 
            <snap>${nationality}</snap>
          </div>
          <div class="main__single-info">
            <h4>UNHCR : </h4> 
            <snap>${unchr}</snap>
          </div>
          <div class="main__single-info">
            <h4>Date of registration: </h4> 1/1/2021
          </div>
          <div class="main__single-info">
            <h4>Gender: </h4>
            <snap> ${gender}</snap>
          </div>
          <div class="main__single-info">
            <h4>Marital State: </h4> 
            <snap>${marital_status}</snap>
          </div>
          <div class="main__single-info">
            <h4>Phone: </h4> 
            <snap>${phone}</snap>
          </div>
          <div class="main__single-info">
            <h4>Highest degree earned: </h4> High School
          </div>
          <div class="main__single-info">
            <h4>Field of study if applicable: </h4>
            <snap> ${field_of_study}</snap>
          </div>
          <div class="main__single-info">
            <h4>Employment Status: </h4> 
            <snap>${employment_status}</snap>
          </div>
          <div class="main__single-info">
            <h4>How Did you hear about Chams? </h4>
            <snap>${hearing_about_chams}</snap>
          </div>
          <div class="main__single-info">
            <h4>About the candidate: </h4>
            <p>Tell us about your background</p> 
            <snap>${candidate_background}</snap>
            <p>What is your plans for the future?</p> 
            <snap>${future_plans}</snap>
            <p>Are you fully available for the program?</p>
            <snap>${programming_available}</snap>
            <p>Coding experience</p>
            <snap>${coding_experience}</snap>
          </div>
          </div>
          <div class="main__file-container">
          <div class="main__file-container-top">
            <div id="assignment">
              <p>assignment path : </p>
            </div>
          ${renderSelectElement()}
          </div>
          <textarea class="main__comment" id="main__comment" name="" id="" placeholder="Type your comment then click on add comment"></textarea>
          <button class="main__comment-btn">Add comment</button>
        </div>
        </div>
        
      </div>
  `;
}
function renderSelectElement() {
  const candidateStatuses = [
    ["app_pending", 1, "App Pending"],
    ["test_req", 2, "Test"],
    ["interview_req", 3, "Interview"],
    ["rejected", 4, "Rejected"],
    ["accepted", 5, "Accepted"],
    ["no_application", 6, "No Application"],
  ];
  return `
    <select name='' id='select'>
      ${candidateStatuses.reduce((result, status) => {
    //getInformationFromCookies().status_id;
    let option = `<option value=${status[1]}>${status[2]}</option>`;
    if (status[0] == "rejected") {
      option.checked;
    }
    result += option;
    return result;
  }, "")}
    </select>
  `;
}
function addComment() {
  const commentArea = document.querySelector(".main__comment");
  if (!commentArea.value.trim()) {
    return;
  }
  createComment(commentArea.value.trim());
  commentArea.value = "";
  commentArea.focus();
}
function createComment(text) {
  const { id } = getInformationFromCookies();
  const postOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student_id: `${id}`,
      comment: `${text}`,
    }),
  };
  fetch("http://localhost:6000/chamsbootcamp/application-details/comment", postOption).then((response) => {
    if (response.status == 200) {
      const fileContainer = document.querySelector(".main__file-container");
      fileContainer.insertAdjacentHTML("beforeend", renderComment(text, id));
    }
  });
}
function renderComment(text, id) {
  return `
      <div class="main__comment-content" data-comment-id=${id}>
        <p>${text}</p>
        <i class="fas fa-trash main__comment-delete-icon"></i>
      </div>
    `;
}
function deleteComment(commentId) {
  // fetch to delete the comment
  fetch(`http://localhost:6000/chamsbootcamp/application-details/comment/${commentId}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.status == 201) {
      deleteCommentFromDOM(commentId);
    }
  });
}
function deleteCommentFromDOM(commentId) {
  const commentsElements = Array.from(document.querySelectorAll(".main__comment-content"));
  const targetedComment = commentsElements.find((comment) => comment.dataset.commentId == commentId);
  targetedComment.remove();

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
  const { id } = getInformationFromCookies();
  let candidateStatus = getInformationFromCookies().status_id;
  let selectElement = document.querySelector("select");
  selectElement.value = candidateStatus;



  fetch(`http://localhost:6000/get-assignments/${id}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then(result => {
      if (result) {
        let assignment = document.getElementById('assignment');
        assignment.innerHTML = `<p>assignment path : <strong>${result[0].assignment}</strong>`;
      }
    })

  fetch(`http://localhost:6000/chamsbootcamp/admin-comments/${getInformationFromCookies().id}`)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((result) => {
      return result;
    })
    .then((candidateComments) => {
      const fileContainer = document.querySelector(".main__file-container");
      fileContainer.insertAdjacentHTML(
        "beforeend",
        candidateComments.reduce((result, comment) => {

          result += renderComment(comment.comment, comment.id);
          return result;
        }, ""),
      );
    });
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

let select = document.querySelector("select");
select.addEventListener("change", () => {
  const { id } = getInformationFromCookies();
  const statusId = select.value;

  let changed = false;

  const postOption = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "status_id": `${statusId}`,
      "email": `${getInformationFromCookies().email}`
    })
  }

  fetch(`http://localhost:6000/candidate-status/${id}`, postOption)
    .then(response => {
      console.log(response.status);
      if (response.status == 200 || response.status ==201) {
        changed = true;
        document.cookie = `status_id = ${statusId};Secure;path=/`;
        console.log("done");
      }
    })
})


const logOutBtn = document.getElementsByClassName("header__logout")[0];
logOutBtn.addEventListener("click", () => {
  fetch("http://localhost:6000/logout")
    .then((response) => {
      if (response.status == 200) {
        window.location.href = "../login"
      }
    })
})