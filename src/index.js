import Phaser from "phaser";
import Play from "./Play.js";
import css from "./css/main.css"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 335,
  height: 350,
  scene: Play,
  autoCenter: Phaser.Scale.CENTER_BOTH,
};

new Phaser.Game(config);
