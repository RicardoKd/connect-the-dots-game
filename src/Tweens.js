import {
  CANVAS_OFFSET,
  ANIMATION_DURATION_MS,
  DISTANCE_BETWEEN_DOTS,
  BOARD_DIMENSIONS,
} from "./Play.fixtures";

export default class TweensManager {
  constructor(dot, finalX, finalY) {
    this.dot = dot;
    this.finalX = finalX;
    this.finalY = finalY;
    this.distanceBetweenDots = DISTANCE_BETWEEN_DOTS;
    this.animationDuration = ANIMATION_DURATION_MS;
    this.canvasOffset = { ...CANVAS_OFFSET };
    this.boardHeight = BOARD_DIMENSIONS.HEIGHT;
  }

  getXYPositionIsNotCorrectTweenConfig() {
    return {
      targets: [this.dot],
      duration: this.animationDuration,
      x: {
        getStart: () => this.finalX,
        getEnd: () => this.finalX,
      },
      y: {
        getStart: () =>
          this.canvasOffset.Y - this.distanceBetweenDots * this.boardHeight,
        getEnd: () => this.finalY,
      },
      ease: Phaser.Math.Easing.Cubic,
    };
  }

  getSameXPositionTweenConfig() {
    return {
      targets: [this.dot],
      duration: this.animationDuration,
      y: {
        getStart: () => this.dot.y,
        getEnd: () => this.finalY,
      },
      ease: Phaser.Math.Easing.Cubic,
    };
  }
}
