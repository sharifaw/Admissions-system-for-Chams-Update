// function fetchData() {
// fetch("https://api.publicapis.org/entries")
//   .then((response) => response.json())
//   .then((result) => {
//     console.log("from fetch");
//     console.log(result.entries[1].API);
//     header(result.entries[1].API);
//   });
// }

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

export default header;
