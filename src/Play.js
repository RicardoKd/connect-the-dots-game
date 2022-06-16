import Board from "./Board.js";
export default class Play extends Phaser.Scene {
  constructor() {
    super();
    this.points = 0;
  }

  create() {
    this.scoreCountText = this.add.text(7, 0, `Points: ${this.points}`);
    let board = new Board(this);
    board.initialize();
  }

  update() {
    this.scoreCountText.setText(`Score: ${this.points}`);
  }
}
