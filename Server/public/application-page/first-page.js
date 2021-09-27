function renderRegistrationForm() {
  return `<div class='main__container'>
        <div class='container'>
            <h3 class="welcome-message">welcome ${getInformationFromCookies().first_name}</h3>
            <h1 class='regform'>Complete Your Application</h1>
            <form class='main'>
                <div class="main__input-group main__nationality main__register-input">
                    <h4>Nationality *</h4>
                    <input type="text" name="nationality" placeholder='Your Nationality'>
                </div>
                <div class="main__input-group main__nationality main__register-input">
                    <h4>Nationality Number (Optional)</h4>
                    <input type="text" name="nationality_number" class="optional-field" placeholder='Your Nationality Number'>
                </div>
                <div class="main__input-group main__birthday main__register-input">
                  <h4>Date of birth *</h4>
                  <input type="date" name="date_of_birth">
                </div>
                <div class='main__input-group radio'>
                    <h4>Gender *</h4>
                      <div class='main__radio'>
                        <input type="radio" id="Male" name="gender" value="Male">
                        <label for="Male">Male</label><br>
                        <input type="radio" id="Female" name="gender" value="Female">
                        <label for="Female">Female</label><br>
                    </div>
                </div>
                <div class='main__input-group main__UNHCR main__register-input'>
                  <h4>UNCHR number (Optional)</h4>
                  <input type="text" name="unchr_number" class="optional-field" placeholder="UNCHR number">
                </div>
                <div class='main__input-group main__address main__register-input'>
                  <h4>Address *</h4>
                  <input type="text" name="address" placeholder="Your Address" id="">
                </div>
                <div class='main__input-group radio'>
                    <h4>Marital State *</h4>
                    <div class='main__radio'>
                        <input type="radio" id="single" name="marital_status" value="Single" />
                        <label for="single">Single</label><br />
                        <input type="radio" id="married" name="marital_status" value="Married" />
                        <label for="married">Married</label><br />
                    </div>
                </div>

                <div class='main__input-group phone'>
                  <h4>Phone *</h4>
                  <div>
                    <input type="tel" placeholder='Area code and phone number' name="phone_number" class='main__number'>
                  </div>
                </div>

                <div class="main__input-group">
                  <h4>Highest degree earned *</h4>
                  <select class="main__select" name="highest_degree">
                    <option value="">Highest degree earned</option>
                    <option value="Less than high school" class="main__option">Less than high school</option>
                    <option value="High School">High School</option>
                    <option value="2-Year College">2-Year College</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="Doctoral Degree">Doctoral Degree</option>
                  </select>
                </div>

                <div class="main__input-group">
                  <h4>Field of study (Optional)</h4>
                  <select class="main__select optional-field" name="field_of_study">
                    <option value="none">Field of study</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Education">Education</option>
                    <option value="Science">Science</option>
                    <option value="Other Field">Other Field</option>
                  </select>
                </div>

                <div class='main__input-group radio'>
                    <h4>Employment status *</h4>
                    <div class='main__radio'>
                        <input type="radio" id="Employed" name="employment_status" value="Employed" />
                        <label for="Employed">Employed</label><br />
                        <input type="radio" id="Un-employed" name="employment_status" value="unemployed" />
                        <label for="Un-employed">Un-employed</label><br />
                    </div>
                </div>

                <div class="main__input-group">
                  <h4>How did you hear about Chams? *</h4>
                  <select class="main__select" name="hearing_about_chams">
                    <option value="">How did you hear about Chams?</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Google">Google</option>
                    <option value="Through A Friend">Through A Friend</option>
                    <option value="other">other</option>
                  </select>
                </div>

                <div class='main__input-group main__text '>
                    <h4>Tell us <br /> about your <br /> background *</h4>
                    <textarea cols="20" rows="7" placeholder="Your Story" name="candidate_background"></textarea>
                </div>

                <div class='main__input-group main__text'>
                    <h4>What is your<br /> plans for <br />the future? *</h4>
                    <textarea cols="20" rows="7" name="future_plans" placeholder="Your Plans"></textarea>
                </div>

                <div class='main__input-group radio'>
                    <h4>Are you fully available for the program? *</h4>
                    <div class='main__radio'>
                        <input type="radio" id="yes" name="programming_available" value="Yes" />
                        <label for="yes">Yes</label><br />
                        <input type="radio" id="no" name="programming_available" value="No" />
                        <label for="no">No</label><br />
                    </div>
                </div>

                <div class='main__input-group main__text'>
                    <h4> Coding experience *</h4>
                    <textarea cols="20" rows="7" name="coding_experience" placeholder="Your Experience in coding"></textarea>
                </div>
                <div class="error-message">
                  Please fill in all fields
                </div>
                <div class='main__input-group submission'>
                    <button id="submit-btn">Submit</button>
                    <button id="save-btn">Save</button>
                </div>
            </form>
        </div>
    </div>`;
}
function getFormFields() {
  const inputsElements = Array.from(document.querySelectorAll("input"));
  const selectsElements = Array.from(document.querySelectorAll("select"));
  const textareaElements = Array.from(document.querySelectorAll("textarea"));

  return [...inputsElements, ...selectsElements, ...textareaElements];
}
function getInformationFromCookies() {
  const cookiesInfo = document.cookie.split(";").map((info) => info.split("="));
  let convertToObject = {};

  for (let i = 0; i < cookiesInfo.length; i++) {
    convertToObject[cookiesInfo[i][0].trim()] = cookiesInfo[i][1];
  }

  return convertToObject;
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
function fillInInputsFromCookies() {
  const formFields = getFormFields();
  const cookiesInfo = Object.entries(getInformationFromCookies());

  for (let i = 0; i < cookiesInfo.length; i++) {
    const targetedInput = formFields.find((field) => field.name === cookiesInfo[i][0]);

    if (targetedInput) {
      if (targetedInput.type === "radio") {
        let inputRadios = Array.from(document.querySelectorAll(`input[name=${targetedInput.name}]`));
        inputRadios.find((input) => input.value == cookiesInfo[i][1]).click()

      } else {
        targetedInput.value = cookiesInfo[i][1];
      }
    }
  }
}
function sendToBackend() {
  const requiredFelids = getFormFields().filter((field) => !field.classList.contains("optional-field"));

  if (requiredFelids.some((field) => field.value == "")) {
    document.querySelector(".error-message").style.display = "block";

    requiredFelids.forEach((field) => {
      if (!field.value) {
        field.style.border = "3px solid #f00";
      } else {
        field.style.border = "1px solid var(--light-grey)";
      }

      // only inputs radius need to change the style if we didn't select any one of them
    });
    return;
  } else {
    document.querySelector(".error-message").style.display = "none";
  }

  let convertToObject = { student_id: getInformationFromCookies().id };


  const formFields = getFormFields();

  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i].type === "radio") {
      if (formFields[i].checked) {
        convertToObject[formFields[i].name] = formFields[i].value;
      }
      continue;
    }
    if (!formFields[i].value) {
      formFields[i].value = 99999;
    }
    convertToObject[formFields[i].name] = formFields[i].value;
  }
  function getTime() {
    const date = new Date();
    return date.getFullYear()
      + '-' +
      (date.getMonth() + 1)
      + '-' +
      date.getDate()
      + ' ' +
      date.getHours()
      + ':' +
      date.getMinutes()
      + ':' +
      date.getSeconds();
  }
  let today = getTime();
  convertToObject.application_date = today;
  const option = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(convertToObject),
  };
  fetch("http://localhost:6000/chamsbootcamp/candidate-application", option)
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      }
    })
    .then((result) => {
      console.log("result", result);
      if (result) {
        window.location = "/candidate-dashboard";
      }
    });
}

window.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:6000/chamsbootcamp/app-deadline")
    .then((response) => {
      if (response.status == 200) {
        return response.json();
      } else if ([500, 402, 401].some((statusNum) => statusNum == response.status)) {
        console.log("Process Failed");
      }
    })
    .then((result) => {
      if (result) {
        let fetchDate = result[0].application_deadline;
        const deadline = new Date(new Date(fetchDate).toISOString().slice(0, 10)).getTime();
        if (deadline > new Date().getTime()) {
          document.body.innerHTML = renderRegistrationForm();
          fillInInputsFromCookies();

          const submitBtn = document.getElementById("submit-btn");
          const saveBtn = document.getElementById("save-btn");

          submitBtn.addEventListener("click", (e) => {
            e.preventDefault();
            sendToBackend();
          });

          saveBtn.addEventListener("click", (e) => {
            e.preventDefault();
            saveInformationInCookies();
          });
        } else {
          document.body.style.marginTop = "0";

          document.body.innerHTML = `
              <main class='main-deadline'>
                <h1>Sorry, you passed the deadline</h1>
              </main>
            `;
        }
      }
    });
});