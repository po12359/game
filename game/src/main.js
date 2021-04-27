`use strict`;

import PopUp from "./popup.js";
import Toggle from "./toggle.js";
import * as sound from "./sound.js";
import { GameBuilder, Reason } from "./game.js";
//popup
const popUp = new PopUp();
const game = new GameBuilder().itemCount(6).duration(10).build();
// toggle
const toggle = new Toggle();

// game
game.popUpBtnListener((reason) => {
  let message = undefined;
  switch (reason) {
    case Reason.win:
      sound.win();
      popUp.nextStage();
      message = `You Won! You want to next Stage?`;
      break;
    case Reason.lose:
      sound.bug();
      popUp.refresh();
      message = `You Lose`;
      break;
    case Reason.cancel:
      sound.alert();
      popUp.refresh();
      message = `Replay?`;
      break;
    case Reason.endGame:
      sound.win();
      popUp.refresh();
      message = `Congratulation!`;
      break;
    default:
      throw new Error("unvalid mesage");
  }
  popUp.showWithText(message);
});

popUp.onClickRefresh(() => {
  game.levelOne();
  game.start();
});
popUp.onClickNext(() => {
  game.levelUp();
  game.start();
});
