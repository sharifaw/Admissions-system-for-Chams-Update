// import header from "../comp/header.js";
// import nav from "../comp/nav.js";

const users = [
{
ful_name:"heba muneer mohammed thaher",
nationality:"Jordanian",
age:25,
gender:"female",
},
{
ful_name:"farah",
nationality:"Jordanian",
age:25,
gender:"female",
},
{
ful_name:"Ekram",
nationality:"Syrian",
age:25,
gender:"female",
}
,
{
ful_name:"Laith",
nationality:"Jordanian",
age:25,
gender:"male",
},
{
ful_name:"shareef",
nationality:"Jordanian",
age:25,
gender:"male",
},
{
ful_name:"bashar",
nationality:"Jordanian",
age:25,
gender:"male",
}
,
{
ful_name:"7",
nationality:"Jordanian",
age:25,
gender:"male",
},
{
ful_name:"8",
nationality:"Jordanian",
age:25,
gender:"male",
},
{
ful_name:"9",
nationality:"Jordanian",
age:25,
gender:"male",
},
{ful_name:"9",
nationality:"Jordanian",
age:25,
gender:"male",
},{
ful_name:"10",
nationality:"Jordanian",
age:25,
gender:"male",
},{
ful_name:"11",
nationality:"Jordanian",
age:25,
gender:"male",
}

];
let allUsers = [];

for (let i = 0; i < users.length; i++) {
  allUsers[i] = users.slice(0, 9);
  console.log(allUsers);
}

// const allUsers = users.reduce((result, user) => {
//   if(subArray.length < 9) {
//     subArray.push();
//   }
//   return result;
// }, []);

/*
  [
    [],
    [],
    []
  ]
*/


function usersTemplates(users) {
  return users.reduce((result, user) => {
    const{ful_name,nationality,age,gender}=user;
    result += `
      <div class="main__item">
          <p>${ful_name}</p>
          <p>${nationality}</p>
          <p>${age}</p>
          <p>${gender}</p>
      </div>
    `;
    return result;
    var count=result;
 }, "");
}

function select() {
  return `
    <select class="main__select">
          <option class="main__option" disabled selected hidden>Choose test stage</option>
          <option class="main__option">First Stage</option>
          <option class="main__option"> Interview</option>
          <option class="main__option">Admitted</option>
          <option class="main__option">Rejected</option>
      </select>

      <select class="main__select">
          <option class="main__option" disabled selected hidden>Sort Registrants by </option>
          <option class="main__option">Full Name</option>
          <option class="main__option">Last Name</option>
          <option class="main__option">Nationality</option>
          <option class="main__option">Gender</option>
          <option class="main__option">Application Date</option>
          <option class="main__option">Education Level</option>
          <option class="main__option">Field Of Study</option>
      </select>
  `;
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
      <div class="main__content">
      <div class="main__select-div">
      ${select()}
      </div>
      <div id="details-registers"class="main__admin-template"> 
       ${usersTemplates(users.slice(0, 9))}
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


window.addEventListener("DOMContentLoaded", function() {
  const prev_btn= document.getElementById('previous');
  const next_btn = document.getElementById('next');
  const adminTemplate = document.querySelector(".main__admin-template");

  console.log(adminTemplate);

  // if(users.length > 9) {
  //   next_btn.removeAttribute('disabled')
  // }else{
  // next_btn.setAttribute('disabled', true) 
  // }

  
     if(adminTemplate.children.length > 8) {
    next_btn.removeAttribute('disabled')
  }else{
    next_btn.setAttribute('disabled', true) 
  }
  next_btn.addEventListener('click', function () {
    if (prev_btn.disabled==true) {
      prev_btn.removeAttribute('disabled')
    } else {
      prev_btn.setAttribute('disabled', true)
    }
  })


  
});
