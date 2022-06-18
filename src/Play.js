import Board from "./Board.js";
import { SCORE_TEXT_POSITION } from "./constants.js";

export default class Play extends Phaser.Scene {
  constructor() {
    super();
    this.points = 0;
  }

  create() {
    this.scoreCountText = this.add.text(
      SCORE_TEXT_POSITION.X,
      SCORE_TEXT_POSITION.Y,
      `Points: ${this.points}`
    );
    let board = new Board(this);
    board.initialize();
  }

  update() {
    this.scoreCountText.setText(`Score: ${this.points}`);
  }
}
