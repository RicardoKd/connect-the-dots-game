import Dot from "./Dot";
import Line from "./Line";

export default class AbstractFactory {
  constructor(board) {
    this.board = board;
    this.idCount = 0;
  }

  createDot() {
    let dot = new Dot(this.board);
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

  createLine() {

  }
}
