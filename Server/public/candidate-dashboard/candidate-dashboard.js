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
        <div class="bullet completed" id="first"> 1</div>
        <p class="step-text">App Pending</p>
        </div>
        <div class="line second">
        ...
        </div>
        <div class="step">
        <div class="bullet"> 2</div>
        <p class="step-text">Test Request</p>
        </div>
        <div class="line third">
        ...
        </div>
        <div class="step">
        <div class="bullet"> 3</div>
        <p class="step-text">Interview Pending</p>
        </div>
        <div class="line final">
        ...
        </div>
        <div class="step">
        <div class="bullet"> 4</div>
        <p class="step-text">Rejected Or Accepted </p>
        </div>
    </div>
<div class="Details">
    <p id="content"class="content"> </p>     
</div>
</div>
`;
}

function checkLineProcess(state) {
    const secondLine = document.querySelector(".second");
    const thirdLine = document.querySelector(".third");
    const finalLine = document.querySelector(".final");
    if (state == "test_req") {
        secondLine.classList.add("line_completed");
    } else if (state == "intreview_req") {
        secondLine.classList.add("line_completed");
        thirdLine.classList.add("line_completed");
    } else if (state == "rejected" || state == "accepted") {
        secondLine.classList.add("line_completed");
        thirdLine.classList.add("line_completed");
        finalLine.classList.add("line_completed");
    }
}

window.addEventListener("DOMContentLoaded", function() {
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
content :..............`, "you're being reviewed"
    ];
    let all_status = ["app_pending", "test_req", "intreview_req", "rejected"];
    let state = "test_req";

    const show_state = document.getElementById("content");

    // let index = all_status.findIndex((val) => val === state);
    function renderContent(steps) {
        let index = all_status.findIndex((val) => val === state);
        for (let i = 0; i < steps.length; i++) {
            if (i <= index) {
                steps[i].classList.add("completed");
                steps[i].nextElementSibling.classList.add("completed-text");
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
                    if (result[0].assignment != null && result[0].assignment != "") {
                        console.log('yes');
                        messages[1] = "your assignment was successfully assigned, now you are under reviewed";
                        renderContent(steps);

                    } else {
                        messages[1] = `your application has been approved and you have moved to the tech test her is your instructions about new test :
            1.  ..................
            2.  ..................
            3.  ..................
            <form class="form" action="/upload" method="post" enctype="multipart/form-data">
            <p> for uploading your assignment</p>
            <input class="upload__class" type="file" name="inputUpload" id="files" multiple/>
            <label class="upload__class" for="files">Upload</label>
            <button class="upload__class">Submit</button>
            </form>`
                        renderContent(steps);
                    }
                } else if (state == "rejected") {
                    let rejectedText = document.querySelectorAll(".step-text")[3];
                    rejectedText.innerHTML = "Rejected";
                    rejectedText.classList.remove("completed-text");
                    rejectedText.classList.add("rejected-text");
                    messages[3] = "sorry for telling that you are rejected"
                    renderContent(steps);
                } else if (state == "accepted") {
                    let acceptedText = document.querySelectorAll(".step-text")[3];
                    acceptedText.innerHTML = "Accepted";
                    acceptedText.classList.remove("completed-text");
                    acceptedText.classList.add("accepted-text");
                    all_status[3] = "accepted";
                    messages[3] = "congratulations you have accepted"
                    renderContent(steps);
                }
                //end
                checkLineProcess(state);
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