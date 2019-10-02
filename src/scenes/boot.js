import Phaser from "phaser";

import asteroid from "./../assets/img/asteroid.png";
import background from "./../assets/img/background.png";
import ship from "./../assets/img/ship.png";
import shoot from "./../assets/img/shoot.png";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Boot", active: true });
  }

  async preload() {
    this.load.image("background", background);
    this.load.image("ship", ship);
    this.load.image("asteroid", asteroid);
    this.load.image("shoot", shoot);
  }

  create() {
    this.add.text(210, 150, "Asteroid", { fontSize: "80px", fill: "#f00" });

    this.startButton = this.add
      .text(270, 300, "Press Start", { fontSize: "40px", fill: "#0f0" })
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => this.startGame())
      .on("pointerover", () => this.enterButtonHoverState())
      .on("pointerout", () => this.enterButtonRestState());
  }

  startGame() {
    this.startButton.setStyle({ fill: "#ff0" });
    this.scene.start("PlayScene");
  }
  enterButtonHoverState() {
    this.startButton.setStyle({ fill: "#ff0" });
  }

  enterButtonRestState() {
    this.startButton.setStyle({ fill: "#0f0" });
  }
}
