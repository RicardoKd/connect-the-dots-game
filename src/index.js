import Phaser from "phaser";
import Play from "./Play";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: Play,
  autoCenter: Phaser.Scale.CENTER_BOTH,
};

new Phaser.Game(config);
