export default class Line extends Phaser.GameObjects.Line {
  constructor(board, color) {
    super(board.scene, 0, 0, 0, 0, 5, 0, color);
  }
}
