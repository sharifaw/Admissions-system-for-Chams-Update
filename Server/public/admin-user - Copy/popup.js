function popup(popupContent) {
  return `
    <div id="popup" class="popup">
      <div id="popup__container" class="popup__container">
        <div id="popup__content" class="popup__body">
          ${popupContent}
        </div>
        <i id="popup__close" class="far fa-times-circle popup__close"></i>
      </div>
    </div>
  `;
}

export default popup;
