const BOARD_DIMENSIONS = {
  WIDTH: 6,
  HEIGHT: 6,
};

const CANVAS_OFFSET = {
  X: 250,
  Y: 430,
};

const COLORS = [0xff0000, 0x971cb5, 0xffff00, 0x00ffff, 0x00ff00];

const CIRCLE_SIZE = 32;

const LINE_WIDTH = 4;

const ANIMATION_DURATION_MS = 350;

const DISTANCE_BETWEEN_DOTS_COEFFICIENT = 1.5;

const DISTANCE_BETWEEN_DOTS =
  BOARD_DIMENSIONS.WIDTH *
  BOARD_DIMENSIONS.HEIGHT *
  DISTANCE_BETWEEN_DOTS_COEFFICIENT;

export {
  BOARD_DIMENSIONS,
  CANVAS_OFFSET,
  ANIMATION_DURATION_MS,
  COLORS,
  CIRCLE_SIZE,
  LINE_WIDTH,
  DISTANCE_BETWEEN_DOTS,
};
