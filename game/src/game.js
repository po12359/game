`use strict`;
import Field from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: `win`,
  lose: `lose`,
  cancel: `cancel`,
  endGame: `endGame`,
});
export class GameBuilder {
  itemCount(item) {
    this.item = item;
    return this;
  }
  duration(item) {
    this.duration = item;
    return this;
  }
  build() {
    return new Game(this.item, this.duration);
  }
}
class Game {
  constructor(itemCount, duration) {
    this.itemCount = itemCount;
    this.duration = duration;
    this.gameBtn = document.querySelector(`.game__button`);
    this.gameBox = document.querySelector(`.game__box`);
    this.gameScore = document.querySelector(`.game__score`);
    this.gameTimer = document.querySelector(`.game__timer`);
    this.gameLevel = document.querySelector(`.game__level`);
    //
    this.gameBtn.addEventListener(`click`, () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else if (!this.started) {
        this.start();
      }
    });
    //
    this.score = 0;
    this.timer;
    this.started = false;
    this.level = 1;
    //
    this.field = new Field();
    this.field.fieldOnClick((e) => {
      this.onFieldClickListener(e);
    });
  }
  popUpBtnListener(func) {
    this.popUpBtnListener = func;
  }
  start = () => {
    this.started = true;
    this.showStopBtn();
    this.showBox();
    this.startTimer();
    this.initGame(this.level);
    this.updateTitle();
    sound.bg();
  };

  stop = (reason) => {
    this.started = false;
    this.hideStopBtn();
    this.stopTimer();
    this.popUpBtnListener && this.popUpBtnListener(reason);
    sound.bgStop();
  };
  showStopBtn() {
    const icon = document.querySelector(`.fas`);
    icon.classList.add(`fa-hand-paper`);
    icon.classList.remove(`fa-play`);
    this.gameBtn.style.visibility = `visible`;
  }

  showBox() {
    this.gameBox.style.visibility = `visible`;
  }

  startTimer() {
    let reminingTime = this.duration;
    this.updateTime(reminingTime);
    this.timer = setInterval(() => {
      if (reminingTime <= 0) {
        clearInterval(this.timer);
        this.stop(Reason.lose);
        return;
      }
      this.updateTime(--reminingTime);
    }, 1000);
  }

  updateTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.textContent = `${minutes}:${seconds}`;
  }

  onFieldClickListener(item) {
    if (!this.started) {
      return;
    }
    if (item === `carrot`) {
      ++this.score;
      this.updateScoreBoard();
      if (this.itemCount === this.score) {
        if (this.level === 5) {
          this.stop(Reason.endGame);
        } else {
          this.stop(Reason.win);
        }
      }
    } else if (item === `bug`) {
      this.stop(Reason.lose);
    }
  }

  initGame(level) {
    if (level === 1) {
      this.itemCount = 6;
    }
    if (level === 2) {
      this.itemCount = 8;
    }
    if (level === 3) {
      this.itemCount = 12;
    }

    if (level === 4) {
      this.itemCount = 14;
    }
    if (level === 5) {
      this.itemCount = 16;
    }
    this.score = 0;
    this.gameScore.textContent = this.itemCount;
    this.field.init(this.itemCount);
  }

  hideStopBtn() {
    this.gameBtn.style.visibility = `hidden`;
  }
  stopTimer() {
    clearInterval(this.timer);
  }
  updateScoreBoard() {
    this.gameScore.textContent = this.itemCount - this.score;
  }

  levelUp = () => {
    this.level++;
  };
  levelOne = () => {
    this.level = 1;
  };
  updateTitle() {
    this.gameLevel.textContent = `Level ${this.level}`;
  }
}
