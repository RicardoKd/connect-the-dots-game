import {
  LINE_WIDTH,
} from "./Play.fixtures";

export default class Line extends Phaser.GameObjects.Line {
  constructor(scene, color) {
    super(scene, 0, 0, 0, 0, 5, 0, color);
  }
}
