import Dot from "./gameObjects/Dot.js";
import Line from "./gameObjects/Line.js";
import { LINE_WIDTH } from "./constants.js";

export default class AbstractFactory {
  constructor(board) {
    this.board = board;
    this.idCount = 0;
  }

  createDot() {
    const dot = new Dot(this.board);
    dot.id = this.idCount;
    this.idCount++;

    return dot;
  }

  createDotMatrix(width, height) {
    const dotMatrix = [];
    for (let i = 0; i < width; i++) {
      let column = [];

      for (let j = 0; j < height; j++) {
        let dot = this.createDot();
        column.push(dot);
      }

      dotMatrix.push(column);
    }

    return dotMatrix;
  }

  createLine(color, x1, y1, x2, y2) {
    const line = new Line(this.board, color);
    line.setLineWidth(LINE_WIDTH);
    line.setTo(x1, y1, x2, y2);

    return line;
  }
}
