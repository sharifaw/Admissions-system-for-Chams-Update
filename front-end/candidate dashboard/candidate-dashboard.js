
/*const Next_button=document.getElementById('next-btn');
const finish_button=document.getElementById('finish-btn');
const content=document.getElementById('content');
const bullets=[...document.querySelectorAll('.bullet')];
const text_App_pending=`you're being reviewed`;
const text_test_request=`you are application has been approved and you have moved to the tech test her is your instructions about new test :
1.  ..................
2.  ..................
3.  ..................`;
const text_interview_req=`the candidate has advanced to the interview stage and provide interview detalis such as 
date  : ...........
time : ............
duration:.............
content :..............`;
const text_reject_or_accept=`you're being reviewed`;

const steps=4;
let current_step=1;
*/
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


document.body.insertAdjacentHTML(
  "afterbegin",
  `
  ${header()}

  `,
);
/*Next_button.addEventListener('click',()=>{
  const current_Bullet= bullets[current_step-1] ;
current_Bullet.classList.add('completed');
current_step++;
//prev_button.disabled=false;
if(current_step ==steps){
    Next_button.disabled=true;
    finish_button.disabled=false;
}
if(current_step==2){
   content.innerText=` ${text_test_request}`;
}
if(current_step==3){
   content.innerText=` ${text_interview_req}`;
}
if(current_step==4){
   content.innerText=` ${text_reject_or_accept}`;
}
})
*/
/*prev_button.addEventListener('click',()=>{
const previousBullet=bullets[current_step-2];
previousBullet.classList.remove('completed');
current_step--;
Next_button.disabled=false;
finish_button.disabled=true;
if(current_step==1){
    previousBullet.disabled=true;
}
if(current_step==1){
    content.innerText=` ${text_App_pending}`;
}
if(current_step==2){
   content.innerText=` ${text_test_request}`;
}
if(current_step==3){
   content.innerText=` ${text_interview_req}`;
}
if(current_step==4){
   content.innerText=` ${text_reject_or_accept}`;
}
})*/

/*finish_button.addEventListener('click',()=>{
    location.reload();
})

*/
