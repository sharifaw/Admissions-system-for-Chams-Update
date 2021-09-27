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
    item: `<a href="#">Sings</a>`,
  },
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
          <li class="main__list-item ${index === 0 && "main__list-item--bg"}">
            ${icon} ${item}
          </li>`;
          return result;
        }, "")}
      </ul>
    </nav>
  `;
}

export default nav;
