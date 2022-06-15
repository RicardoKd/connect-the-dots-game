import AbstractFactory from "./AbstractFactory";
import Line from "./Line";
import {
  BOARD_DIMENSIONS,
  CANVAS_OFFSET,
  ANIMATION_DURATION_MS,
  DISTANCE_BETWEEN_DOTS,
} from "./Play.fixtures";
import TweensManager from "./Tweens";
import Tweens from "./Tweens";

export default class Board {
  constructor(scene) {
    this.scene = scene;
    this.boardWidth = BOARD_DIMENSIONS.WIDTH;
    this.boardHeight = BOARD_DIMENSIONS.HEIGHT;
    this.distanceBetweenDots = DISTANCE_BETWEEN_DOTS;
    this.animationDuration = ANIMATION_DURATION_MS;
    this.canvasOffset = { ...CANVAS_OFFSET };

    this.board = [];
    this.idCount = 0;
    this.lastSelectedDot = null;
    this.scoreList = [];

    this.lines = [];

    this.gameObjectFactory = new AbstractFactory(this);
    // this.on("pointerup", this.onDotMouseUp, this);
  }

  initialize() {
    this.board = this.gameObjectFactory.createDotMatrix(
      this.boardWidth,
      this.boardHeight
    );

    this.drawBoard();
  }

  scorePoints() {
    let listIds = new Set();
    this.scoreList.forEach((dot) => {
      listIds.add(dot.id);
    });

    if (listIds.size === 1) {
      return 0;
    }

    for (let i = 0; i < this.boardWidth; i++) {
      for (let j = 0; j < this.boardHeight; j++) {
        let dot = this.board[i][j];

        if (listIds.has(dot.id)) {
          dot.destroy();
          this.board[i].splice(j, 1);
          this.board[i].push(this.gameObjectFactory.createDot());
          j--;
        }
      }
    }

    return listIds.size;
  }

  drawBoard() {
    for (let i = 0; i < this.boardWidth; i++) {
      for (let j = 0; j < this.boardHeight; j++) {
        let finalX = this.canvasOffset.X + i * this.distanceBetweenDots;
        let finalY = this.canvasOffset.Y - j * this.distanceBetweenDots;
        let dot = this.board[i][j];

        const tweensManager = new TweensManager(dot, finalX, finalY);

        if (dot.x === finalX) {
          this.scene.tweens.add(tweensManager.getSameXPositionTweenConfig());
        } else if (dot.y !== finalY) {
          this.scene.tweens.add(
            tweensManager.getXYPositionIsNotCorrectTweenConfig()
          );
          this.scene.add.existing(dot);
        }
      }
    }
  }

  drawLines(lineColor) {
    let uniqueDots = new Set(this.scoreList);
    let uniqueDotsArray = [...uniqueDots];

    for (let i = 0; i < uniqueDotsArray.length - 1; i++) {
      let startDot = uniqueDotsArray[i];
      let endDot = uniqueDotsArray[i + 1];
      let line = new Line(this.scene, lineColor);
      line.setLineWidth(4);

      line.setTo(startDot.x + 3, startDot.y + 2, endDot.x + 3, endDot.y + 2);
      this.lines.push(line);
      this.scene.add.existing(line);
    }
  }

  removeLines() {
    this.lines.forEach((line) => {
      line.destroy();
    });
  }
}
