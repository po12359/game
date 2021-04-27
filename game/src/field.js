`use strict`;
import * as sound from "./sound.js";
const CARROT_SIZE = 80;
export default class Field {
  constructor() {
    this.field = document.querySelector(`.game__field`);
    this.fieldRect = this.field.getBoundingClientRect();
    this.field.addEventListener(`click`, (e) => {
      const target = e.target;
      if (target.matches(`.carrot`)) {
        target.remove();
        this.fieldOnClick && this.fieldOnClick(`carrot`);
        sound.carrot();
      } else if (target.matches(`.bug`)) {
        this.fieldOnClick && this.fieldOnClick(`bug`);
        sound.bug();
      }
    });
  }

  fieldOnClick = (onClick) => {
    this.fieldOnClick = onClick;
  };
  additem(className, count, src) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement(`img`);
      item.setAttribute(`class`, className);
      item.setAttribute(`src`, src);
      item.style.position = `absolute`;
      item.style.cursor = `pointer`;
      const x = randomNum(x1, x2);
      const y = randomNum(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }

  init(item) {
    this.field.innerHTML = ``;
    this.additem(`carrot`, item, `./img/carrot.png`);
    this.additem(`bug`, item, `./img/bug.png`);
  }
}

function randomNum(min, max) {
  return Math.random() * (max + min) - min;
}
