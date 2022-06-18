import Phaser from "phaser";
import Play from "./Play.js";
import { PHASER_CONTAINER_DIMENSIONS } from "./constants.js";
import css from "./css/main.css";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: PHASER_CONTAINER_DIMENSIONS.WIDTH,
  height: PHASER_CONTAINER_DIMENSIONS.HEIGHT,
  scene: Play,
  autoCenter: Phaser.Scale.CENTER_BOTH,
};

new Phaser.Game(config);
