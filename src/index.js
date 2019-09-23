import Phaser from "phaser";
import "./assets/css/style.css";

import PlayScene from "./scenes/playScene";

const config = {
  width: 800, //1024
  height: 600, //768
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      fps: 60,
      gravity: { y: 0 }
    }
  },
  scene: [PlayScene]
};

const game = new Phaser.Game(config);
