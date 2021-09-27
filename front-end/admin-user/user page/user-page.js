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
];
function div_content(){
    return `<div class="main__item">
       <p>hebathaher1996@gmail.com</p>
      <button class="main__button-style"> delete</button>
    </div>
    <div class="main__item">
      <p>Ekram_1997@gmail.com</p>
      <div>
      <button class="main__button-style"> delete</button></div>
    </div>
      <div class="main__item">
      <p>shareef@gmail.com</p>
      <button class="main__button-style"> delete</button>
    </div>
    <div class="main__item">
      <p>Farah@gmail.com</p>
      <button class="main__button-style"> delete</button>
    </div>
      <div class="main__item">
      <p>Laith@gmail.com</p>
      <button class="main__button-style"> delete</button>
    </div>
    <div class="main__item">
      <p>Eman@gmail.com</p>
      <button class="main__button-style"> delete</button>
    </div>
      <div class="main__item">
      <p> Marwan@gmail.com</p>
      <button class="main__button-style"> delete</button>
      </div>
    <div class="main__item">
      <p> mohammed@gmail.com</p>
      <button class="main__button-style"> delete</button>
    </div>\
    <div class="main__item">
      <p> mohammed@gmail.com</p>
      <button class="main__button-style"> delete</button>
    </div>
    <div class="main__item">
      <p> mohammed@gmail.com</p>
      <button class="main__button-style"> delete</button>
    </div>`;
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
       ${div_content()}
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