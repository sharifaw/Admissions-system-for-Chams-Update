
function header() {
  return `
    <header class="header">
      <div class="container">
       <div class="header__logo">
        <img src="https://static.wixstatic.com/media/5a7a9c_17899961619c4598b4820ec99dbf10a8~mv2.png/v1/fill/w_128,h_45,al_c,q_85,usm_0.66_1.00_0.01/chams-logo-blanc-08.webp" alt="">
      </div>
        <a class="header__user">Application</a>
        <a href="#" class="header__logout">
          Logout
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </header>
  `;
}
function content() {
  return `<div class="content__progress">
    <div class="step-progress">
        <div class="step">
            <p class="step-text">App Pending</p>
            <div class="bullet completed" id="first"> 1</div>
        </div>
        <div class="step">
            <p class="step-text">Test Request</p>
            <div class="bullet"> 2</div>
        </div>
        <div class="step">
            <p class="step-text">Interview Pending</p>
            <div class="bullet"> 3</div>
        </div>
        <div class="step">
            <p class="step-text">Rejected Or Accepted </p>
            <div class="bullet"> 4</div>
        </div>
    </div>
<div class="Details">
    <p id="content"class="content"> </p>     
</div>
</div>
`;
}
window.addEventListener("DOMContentLoaded", function () {
  const steps = document.querySelectorAll(".bullet");

  const messages = ["you're being reviewed",
    `you are application has been approved and you have moved to the tech test her is your instructions about new test :
1.  ..................
2.  ..................
3.  ..................
<form action="/upload" method="post" enctype="multipart/form-data">
<input type="file" name="inputUpload" multiple/>
<button>Submit</button>
</form>`,
    `the candidate has advanced to the interview stage and provide interview details such as 
date  : ...........
time : ............
duration:.............
content :..............`, "you're being reviewed"];
  let all_status = ["app_pending", "test_req", "intreview_req", "rejected"];
  let state = "test_req";

  const show_state = document.getElementById("content");

  // let index = all_status.findIndex((val) => val === state);
  function renderContent(steps) {
    let index = all_status.findIndex((val) => val === state);
    for (let i = 0; i < steps.length; i++) {
      if (i <= index) {
        steps[i].classList.add("completed");
      }
      if (index === i) {
        show_state.innerHTML = messages[i];
      }
    }
  }

  // renderContent(steps);
  // for (let i = 0; i < steps.length; i++) {
  //   if (i <= index) {
  //     steps[i].classList.add("completed");
  //   }
  //   if (index === i) {
  //     show_state.innerHTML = messages[i];
  //   }
  // }


  checkStudentStatus();
  function checkStudentStatus() {
    fetch("http://localhost:6000/candidatestatus")
      .then(response => {
        if (response.status == 200) {
          return response.json()
        }
      })
      .then(result => {
        state = result[0].status;
        // start
        if (state == "test_req") {
          console.log('res = ', result[0].assignment != "");
          console.log('assi = ', result[0].assignment);
          if (result[0].assignment != null && result[0].assignment !="") {
            console.log('yes');
            messages[1] = "your assignment was successfully assigned, now you are under reviewed";
            renderContent(steps);

          }
          else {
            messages[1] = `you are application has been approved and you have moved to the tech test her is your instructions about new test :
            1.  ..................
            2.  ..................
            3.  ..................
            <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="inputUpload" multiple/>
            <button>Submit</button>
            </form>`
            renderContent(steps);
          }
        }
        else if (state == "rejected") {
          messages[3] = "sorry for telling that you are rejected"
          renderContent(steps);
        }
        else if (state == "accepted") {
          all_status[3] = "accepted";
          messages[3] = "congratulations you have accepted"
          renderContent(steps);
        }
        //end
        renderContent(steps);

      })
  }
  
})
document.body.insertAdjacentHTML(
  "afterbegin",
  `
  ${header()}
   ${content()}
  `,
);
const logOutBtn = document.getElementsByClassName("header__logout")[0];
logOutBtn.addEventListener("click", () => {
  fetch("http://localhost:6000/logout")
    .then((response) => {
      if (response.status == 200) {
        window.location.href = "../login"
      }
    })
})
