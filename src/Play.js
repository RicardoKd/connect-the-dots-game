import Board from "./Board";
export default class Play extends Phaser.Scene {
  constructor() {
    super();
    this.points = 0; // FIXME: Does this thingy has to be here or in Board.js ???
  }

  create() {
    this.scoreCountText = this.add.text(20, 16, `Points: ${this.points}`);
    let board = new Board(this);
    board.initialize();
  }

  update() {
    this.scoreCountText.setText(`Score: ${this.points}`);
  }
}
