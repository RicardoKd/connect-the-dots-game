import {
  COLORS,
  CIRCLE_SIZE,
  DISTANCE_BETWEEN_DOTS,
} from "../Game.fixtures.js";

export default class Dot extends Phaser.GameObjects.Ellipse {
  constructor(board) {
    const colorNum = Math.floor(Math.random() * COLORS.length);
    super(board.scene, 0, 0, CIRCLE_SIZE, CIRCLE_SIZE, COLORS[colorNum], 1);
    this.setInteractive();
    this.board = board;
    this.spriteNum = colorNum;
    this.colors = [...COLORS]; // not used
    this.circleSize = CIRCLE_SIZE; // not used
    this.distanceBetweenDots = DISTANCE_BETWEEN_DOTS;

    board.scene.input.on("gameobjectover", this.onMouseOverDot, this);
    board.scene.input.on("gameobjectdown", this.onDotMouseDown, this);
  }

  // TODO:
  // MAYBE move this func to Board class (will it still be able to catch target???)
  onDotMouseDown(pointer, target) {
    this.board.scoreList.push(target);
  }

  onMouseOverDot(pointer, target) {
    const scoreListSize = this.board.scoreList.length;
    const lastSelectedDot = this.board.scoreList[scoreListSize - 1];

    if (!scoreListSize) {
      return;
    }

    const currentDotPosition = {
      i: lastSelectedDot.x,
      j: lastSelectedDot.y,
    };

    const nextDotPosition = { i: target.x, j: target.y };

    if (this.dotsAreNotAdjacent(currentDotPosition, nextDotPosition)) {
      return;
    }

    const targetIsPreviousDot =
      target.id === this.board.scoreList[scoreListSize - 2].id;

    if (targetIsPreviousDot) {
      this.board.scoreList.pop();
      this.board.drawLines(target.fillColor);
    } else if (lastSelectedDot.fillColor === target.fillColor) {
      if (!this.board.scoreList.includes(target)) {
        this.board.scoreList.push(target);
      }

      this.board.drawLines(target.fillColor);
    }
  }

  dotsAreNotAdjacent(firstDotPosition, secondDotPosition) {
    if (
      secondDotPosition.i === firstDotPosition.i &&
      (secondDotPosition.j === firstDotPosition.j - this.distanceBetweenDots ||
        secondDotPosition.j === firstDotPosition.j + this.distanceBetweenDots)
    ) {
      return false;
    } else if (
      secondDotPosition.j === firstDotPosition.j &&
      (secondDotPosition.i === firstDotPosition.i - this.distanceBetweenDots ||
        secondDotPosition.i === firstDotPosition.i + this.distanceBetweenDots)
    ) {
      return false;
    } else {
      return true;
    }
  }
}
