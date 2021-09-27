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

const logOutBtn = document.getElementsByClassName("header__logout")[0];
logOutBtn.addEventListener("click",()=>{
  fetch("http://localhost:6000/logout")
  .then((response)=>{
    if (response.status == 200){
      window.location.href = "../login"
    }
  })
})


export default header;