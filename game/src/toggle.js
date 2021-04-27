`use strict`;

export default class Toggle {
  constructor() {
    this.toggleBtn = document.querySelector(`.toggle__btn`);
    this.toggle = document.querySelector(`.toggle_content`);
    this.closeBtn = document.querySelector(`.js_toggle`);
    this.toggleBtn.addEventListener(`click`, () => {
      setTimeout(() => {
        this.show();
      }, 1000);
    });
    this.closeBtn.addEventListener(`click`, () => {
      setTimeout(() => {
        this.shadow();
      }, 1000);
    });
  }

  show() {
    this.toggle.classList.toggle(`non_display`);
  }
  shadow() {
    this.toggle.classList.toggle(`non_display`);
  }
}
