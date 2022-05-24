import {
  BOARD_DIMENSIONS,
  CANVAS_OFFSET,
  ANIMATION_DURATION_MS,
  COLORS,
  CIRCLE_SIZE,
  LINE_WIDTH,
  DISTANCE_BETWEEN_DOTS,
} from "./Play.fixtures";

export default class Play extends Phaser.Scene {
  constructor() {
    super();
    this.boardWidth = BOARD_DIMENSIONS.WIDTH;
    this.boardHeight = BOARD_DIMENSIONS.HEIGHT;
    this.colors = COLORS;
    this.lineWidth = LINE_WIDTH;
    this.circleSize = CIRCLE_SIZE;
    this.distanceBetweenDots = DISTANCE_BETWEEN_DOTS;
    this.animationDuration = ANIMATION_DURATION_MS;
    this.canvasOffset = { ...CANVAS_OFFSET };

    this.board = [];
    this.idCount = 0;
    this.lastSelectedDot = null;
    this.scoreList = [];
    this.points = 0;

    this.canMoveDown = false;
    this.lines = [];
  }

  create() {
    this.scoreCountText = this.add.text(20, 16, `Points: ${this.points}`);
    this.initialBoard();
  }

  update() {
    this.scoreCountText.setText(`Score: ${this.points}`);
  }

  initialBoard() {
    this.board = [];
    for (let i = 0; i < this.boardWidth; i++) {
      let column = [];

      for (let j = 0; j < this.boardHeight; j++) {
        let dot = this.createDot();
        column.push(dot);
      }

      this.board.push(column);
    }

    this.drawBoard();

    return this.board;
  }

  clickDot(pointer, target) {
    this.lastSelectedDot = target;
    this.scoreList.push(target);
  }

  upDot() {
    this.points += this.scorePoints();
    this.scoreList = [];
    this.lastSelectedDot = null;
    this.drawBoard();
    this.removeLines();
  }

  overDot(pointer, target) {
    if (this.lastSelectedDot === null) {
      return;
    }

    const currentDotPosition = {
      i: this.lastSelectedDot.x,
      j: this.lastSelectedDot.y,
    };
    const nextDotPosition = { i: target.x, j: target.y };

    if (this.dotsAreNotAdjacent(currentDotPosition, nextDotPosition)) {
      return;
    }

    const targetIsPreviousDot =
      target === this.scoreList[this.scoreList.length - 2];

    if (targetIsPreviousDot) {
      this.scoreList.pop();
      let lastLineToRemove = this.lines.pop();
      lastLineToRemove.destroy();
      this.lastSelectedDot = target;
    } else if (this.lastSelectedDot.fillColor === target.fillColor) {
      this.lastSelectedDot = target;

      if (this.scoreList.indexOf(target) === -1) {
        this.scoreList.push(target);
      }
    } else {
      return;
    }

    this.drawLines(target.fillColor);
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
          this.board[i].push(this.createDot());
          j--;
        }
      }
    }
    return listIds.size;
  }

  drawBoard() {
    for (let i = 0; i < this.boardWidth; i++) {
      for (let j = 0; j < this.boardHeight; j++) {
        let finalX = i * this.distanceBetweenDots + this.canvasOffset.X;
        let finalY = this.canvasOffset.Y - j * this.distanceBetweenDots;
        let dot = this.board[i][j];

        const XYPositionIsNotCorrect = dot.x !== finalX || dot.y !== finalY;

        if (dot.x === finalX) {
          this.tweens.add({
            targets: [dot],
            duration: this.animationDuration,
            y: {
              getStart: () => dot.y,
              getEnd: () => finalY,
            },
            ease: Phaser.Math.Easing.Cubic,
          });
        } else if (XYPositionIsNotCorrect) {
          this.tweens.add({
            targets: [dot],
            duration: this.animationDuration,
            x: {
              getStart: () => finalX,
              getEnd: () => finalX,
            },
            y: {
              getStart: () =>
                this.canvasOffset.Y -
                this.distanceBetweenDots * this.boardHeight,
              getEnd: () => finalY,
            },
            ease: Phaser.Math.Easing.Cubic,
          });
          this.add.existing(dot);
        }
      }
    }
  }

  createDot() {
    const colorNum = Math.floor(Math.random() * this.colors.length);
    let dot = new Phaser.GameObjects.Ellipse(
      this,
      0,
      0,
      this.circleSize,
      this.circleSize,
      this.colors[colorNum]
    );

    dot.id = this.idCount;
    dot.spriteNum = colorNum;
    dot.setInteractive();
    dot.on("pointerup", this.upDot, this);
    this.input.on("gameobjectover", this.overDot, this);
    this.input.on("gameobjectdown", this.clickDot, this);
    this.idCount++;

    return dot;
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

  drawLines(lineColor) {
    let uniqueDots = new Set(this.scoreList);
    let uniqueDotsArray = [...uniqueDots];

    for (let i = 0; i < uniqueDotsArray.length - 1; i++) {
      let startDot = uniqueDotsArray[i];
      let endDot = uniqueDotsArray[i + 1];
      let line = new Phaser.GameObjects.Line(this, 0, 0, 0, 0, 5, 0, lineColor);
      line.setLineWidth(this.lineWidth);
      line.setTo(startDot.x + 3, startDot.y + 2, endDot.x + 3, endDot.y + 2);
      this.lines.push(line);
      this.add.existing(line);
    }
  }

  removeLines() {
    this.lines.forEach((line) => {
      line.destroy();
    });
  }
}
