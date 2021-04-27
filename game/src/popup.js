`use strict`;
import * as sound from "./sound.js";
export default class PopUp {
  constructor() {
    this.popUp = document.querySelector(`.pop-up`);
    this.popUpRefresh = document.createElement(`button`);
    this.popUpNextBtn = document.createElement(`button`);
    this.popUpMessage = document.querySelector(`.pop-up__message`);
    this.popUpRefresh.addEventListener(`click`, () => {
      this.onClickRefresh && this.onClickRefresh();
      //   level = 1;
      //   startGame();
      this.hide();
    });
    this.popUpNextBtn.addEventListener(`click`, () => {
      this.onClickNext && this.onClickNext();
      //   levelUp();
      //   startGame();
      this.hide();
    });
  }

  onClickRefresh(func) {
    this.onClickRefresh = func;
  }
  onClickNext(func) {
    this.onClickNext = func;
  }

  showWithText(reason) {
    this.popUp.classList.remove(`pop-up_hidden`);

    this.popUpMessage.textContent = reason;
  }

  refresh() {
    this.popUpNextBtn.style.display = `none`;
    this.popUpRefresh.style.display = `inline`;
    this.popUpRefresh.innerHTML = ``;
    this.popUpRefresh.setAttribute(`class`, `pop-up__refresh`);
    const icon = document.createElement(`i`);
    icon.setAttribute(`class`, "fas fa-reply-all");
    this.popUpRefresh.append(icon);
    this.popUp.appendChild(this.popUpRefresh);
  }

  nextStage() {
    this.popUpRefresh.style.display = `none`;
    this.popUpNextBtn.style.display = `inline`;
    this.popUpNextBtn.innerHTML = ``;
    this.popUpNextBtn.setAttribute(`class`, `pop-up__nextstage`);
    const icon = document.createElement(`i`);
    icon.setAttribute(`class`, "fab fa-canadian-maple-leaf");
    this.popUpNextBtn.append(icon);
    this.popUp.appendChild(this.popUpNextBtn);
  }
  hide() {
    this.popUp.classList.add(`pop-up_hidden`);
  }
}
