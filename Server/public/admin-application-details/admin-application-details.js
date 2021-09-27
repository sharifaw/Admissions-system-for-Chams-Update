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
        <div id="${id}" class="main__summery">
          <div class="main__single-info">
            <h3>Candidate Name: </h3>${first_name} ${last_name}
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
          <div class="main__file-container-top">
            <div id="assignment">
              <a href="text.txt" download class="main__download-file" title="download this file">
                <i class="fas fa-file-download"></i> file name
              </a>
            </div>
          ${renderSelectElement()}
          </div>
          <textarea class="main__comment" id="main__comment" name="" id="" placeholder="Type your comment then click on add comment"></textarea>
          <button class="main__comment-btn">Add comment</button>
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
    <select name='' id=''>
      ${candidateStatuses.reduce((result, status) => {
        let option = `<option value=${status[1]}>${status[2]}</option>`;
        // getInformationFromCookies().status_id
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
  
  fetch(`http://localhost:6000/get-assignments/${id}`)
  .then((response) => {
    
    return response.json();
  })
  .then(result => {
    if (result){
      const assignment = document.getElementById('assignment');
      
      assignment.innerHTML = `<p>assignment path : <strong>${result[1].assignment}</strong>`;
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

let select=document.querySelector("select");
select.addEventListener("change",()=>{
  
  const postOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: `${getInformationFromCookies().email}`,
    }),
  };
  fetch("http://localhost:6000/chamsbootcamp/sending-email",postOption).
  then(response=>{
    if(response.status==200){
      
    }
    return response.text();
  })
  .then(result=>{
    
  })
})


const logOutBtn = document.getElementsByClassName("header__logout")[0];
logOutBtn.addEventListener("click",()=>{
  fetch("http://localhost:6000/logout")
  .then((response)=>{
    if (response.status == 200){
      window.location.href = "../login"
    }
  })
})