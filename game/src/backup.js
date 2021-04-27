`use strict`;

const Reason = Object.freeze({
  win: `win`,
  lose: `lose`,
  cancel: `cancel`,
  endGame: `endGame`,
});

let ITEM_COUNT = 3;
const CARROT_SIZE = 80;
const TIME_SEC = 10;

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

let score = 0;
let timer;
let started = false;
let level = 1;
// game
const gameBtn = document.querySelector(`.game__button`);
const gameBox = document.querySelector(`.game__box`);
const gameScore = document.querySelector(`.game__score`);
const gameTimer = document.querySelector(`.game__timer`);
const gameLevel = document.querySelector(`.game__level`);
// field
const field = document.querySelector(`.game__field`);
const fieldRect = field.getBoundingClientRect();
//popup
const popUp = document.querySelector(`.pop-up`);
// const popUpRefresh = document.querySelector(`.pop-up__refresh`);
const popUpRefresh = document.createElement(`button`);
const popUpNextBtn = document.createElement(`button`);
const popUpMessage = document.querySelector(`.pop-up__message`);
// toggle
const toggleBtn = document.querySelector(`.toggle__btn`);
const toggle = document.querySelector(`.toggle_content`);
const closeBtn = document.querySelector(`.js_toggle`);
toggleBtn.addEventListener(`click`, () => {
  setTimeout(() => {
    showToggle();
  }, 1000);
});
function showToggle() {
  toggle.classList.toggle(`non_display`);
}
closeBtn.addEventListener(`click`, () => {
  setTimeout(() => {
    shadowToggle();
  }, 1000);
});
function shadowToggle() {
  toggle.classList.toggle(`non_display`);
}
function refresh() {
  popUpNextBtn.style.display = `none`;
  popUpRefresh.style.display = `inline`;
  popUpRefresh.innerHTML = ``;
  popUpRefresh.setAttribute(`class`, `pop-up__refresh`);
  const icon = document.createElement(`i`);
  icon.setAttribute(`class`, "fas fa-reply-all");
  popUpRefresh.append(icon);
  popUp.appendChild(popUpRefresh);
}

function nextStageBtn() {
  popUpRefresh.style.display = `none`;
  popUpNextBtn.style.display = `inline`;
  popUpNextBtn.innerHTML = ``;
  popUpNextBtn.setAttribute(`class`, `pop-up__nextstage`);
  const icon = document.createElement(`i`);
  icon.setAttribute(`class`, "fab fa-canadian-maple-leaf");
  popUpNextBtn.append(icon);
  popUp.appendChild(popUpNextBtn);
}

// 필드에 아이템 넣기!!!

function additem(className, count, src) {
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - CARROT_SIZE;
  const y2 = fieldRect.height - CARROT_SIZE;
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
    field.appendChild(item);
  }
}

function randomNum(min, max) {
  return Math.random() * (max + min) - min;
}

function initGame(level) {
  if (level === 1) {
    ITEM_COUNT = 6;
  }
  if (level === 2) {
    ITEM_COUNT = 8;
  }
  if (level === 3) {
    ITEM_COUNT = 12;
  }

  if (level === 4) {
    ITEM_COUNT = 14;
  }
  if (level === 5) {
    ITEM_COUNT = 16;
  }
  score = 0;
  field.innerHTML = ``;
  gameScore.textContent = ITEM_COUNT;
  additem(`carrot`, ITEM_COUNT, `./img/carrot.png`);
  additem(`bug`, ITEM_COUNT, `./img/bug.png`);
}

// game start

function startGame() {
  started = true;
  showStopBtn();
  showBox();
  startTimer();
  initGame(level);
  updateTitle();
  playSound(bgSound);
}

function showStopBtn() {
  const icon = document.querySelector(`.fas`);
  icon.classList.add(`fa-hand-paper`);
  icon.classList.remove(`fa-play`);
  gameBtn.style.visibility = `visible`;
}

function showBox() {
  gameBox.style.visibility = `visible`;
}

function startTimer() {
  let reminingTime = TIME_SEC;
  updateTime(TIME_SEC);
  timer = setInterval(() => {
    if (reminingTime <= 0) {
      clearInterval(timer);
      refresh();
      finishGame(Reason.lose);
      return;
    }
    updateTime(--reminingTime);
  }, 1000);
}

function updateTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.textContent = `${minutes}:${seconds}`;
}

gameBtn.addEventListener(`click`, () => {
  if (started) {
    refresh();
    stopGame(Reason.cancel);
  } else if (!started) {
    startGame();
  }
});

function stopGame(reason) {
  started = false;
  hideStopBtn();
  stopTimer();
  showPopupWithText(reason);
  stopSound(bgSound);
}

function finishGame(reason) {
  started = false;
  hideStopBtn();
  stopTimer();
  showPopupWithText(reason);
  stopSound(bgSound);
}

function hideStopBtn() {
  gameBtn.style.visibility = `hidden`;
}
function stopTimer() {
  clearInterval(timer);
}
function showPopupWithText(reason) {
  popUp.classList.remove(`pop-up_hidden`);
  let message = undefined;
  switch (reason) {
    case Reason.win:
      playSound(winSound);
      message = `You Won! You want to next Stage?`;
      break;
    case Reason.lose:
      playSound(bugSound);
      message = `You Lose`;
      break;
    case Reason.cancel:
      playSound(alertSound);
      message = `Replay?`;
      break;
    case Reason.endGame:
      playSound(winSound);
      message = `Congratulation!`;
      break;
    default:
      throw new Error("unvalid mesage");
  }
  popUpMessage.textContent = message;
}
field.addEventListener(`click`, (e) => {
  const target = e.target;
  if (target.matches(`.carrot`)) {
    target.remove();
    playSound(carrotSound);
    ++score;
    updateScoreBoard();
    if (ITEM_COUNT === score) {
      if (level === 5) {
        refresh();
        finishGame(Reason.endGame);
      } else {
        nextStageBtn();
        finishGame(Reason.win);
      }
    }
  } else if (target.matches(`.bug`)) {
    refresh();
    playSound(bugSound);
    finishGame(Reason.lose);
  }
});
function updateScoreBoard() {
  gameScore.textContent = ITEM_COUNT - score;
}
popUpRefresh.addEventListener(`click`, () => {
  level = 1;
  startGame();
  hidePopUp();
});
popUpNextBtn.addEventListener(`click`, () => {
  levelUp();
  startGame();
  hidePopUp();
});

function levelUp() {
  level++;
}
function hidePopUp() {
  popUp.classList.add(`pop-up_hidden`);
}
function updateTitle() {
  gameLevel.textContent = `Level ${level}`;
}
