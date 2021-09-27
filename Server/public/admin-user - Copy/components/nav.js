const pageInfo = [
  {
    icon: `<i class="fas fa-columns"></i>`,
    item: `<a id="dashboard" href="#">Dashboard</a>`,
  },
  {
    icon: `<i class="fas fa-envelope-open-text"></i>`,
    item: `<a id="email_templates" href="#">Email templates</a>`,
  },
  {
    icon: `<i class="fas fa-cog"></i>`,
    item: `<a id="settings" href="#">Settings</a>`,
  },
  {
     icon : `<i class="fas fa-users"></i>`,
     item: `<a id="users" href="#"> Users</a>`
  }
];

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
          <li class="main__list-item ${index === 3 && "main__list-item--bg"}">
            ${icon} ${item}
          </li>`;
    return result;
  }, "")}
      </ul>
    </nav>
  `;
}
window.addEventListener("DOMContentLoaded", () => {
  let dashboardLink = document.getElementById('dashboard');
  let emailTemplatesLink = document.getElementById('email_templates');
  let settingsLink = document.getElementById('settings');
  let usersLink = document.getElementById('users');

  dashboardLink.addEventListener('click', () => {
    fetch("http://localhost:6000/chamsbotcamp/tokenauth")
      .then(response => {
        if (response.status == 401 || response.status == 500) {
          window.location = `/login`;
        }
        else {
          return response.json();
        }
      })
      .then(result => {

        if (result) {
          window.location = "/admin-dashboard";
        }
      })
      ;
  })

  emailTemplatesLink.addEventListener('click', () => {
    fetch("http://localhost:6000/chamsbotcamp/tokenauth")
      .then(response => {
        if (response.status == 401 || response.status == 500) {
          window.location = `/login`;
        }
        else {
          return response.json();
        }
      })
      .then(result => {

        if (result) {
          window.location = "/email-templates";
        }
      })
      ;
  })

  settingsLink.addEventListener('click', () => {
    fetch("http://localhost:6000/chamsbotcamp/tokenauth")
      .then(response => {
        if (response.status == 401 || response.status == 500) {
          window.location = `/login`;
        }
        else {
          return response.json();
        }
      })
      .then(result => {

        if (result) {
          window.location = "/admin-settings";
        }
      })
      ;
  })

  usersLink.addEventListener('click', () => {
    fetch("http://localhost:6000/chamsbotcamp/tokenauth")
      .then(response => {
        if (response.status == 401 || response.status == 500) {
          window.location = `/login`;
        }
        else {
          return response.json();
        }
      })
      .then(result => {

        if (result) {
          window.location = "/admin-user";
        }
      })
      ;
  })
})

export default nav;
