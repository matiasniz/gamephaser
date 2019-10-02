import Phaser from "phaser";

import asteroid from "./../assets/img/asteroid.png";
import quickAsteroid from "./../assets/img/quickAsteroid.png";
import background from "./../assets/img/background.png";
import ship from "./../assets/img/ship.png";
import shoot from "./../assets/img/shoot.png";
import shootSound from "./../assets/sound/shoot.wav";
import shootDestroySound from "./../assets/sound/shoot-destroy.wav";
import hitship from "./../assets/sound/hitship.wav";
import death from "./../assets/sound/death.wav";
import music from "./../assets/sound/music.ogg";

export default class extends Phaser.Scene {
  constructor() {
    super({ key: "Boot", active: true });
  }

  async preload() {
    this.load.image("background", background);
    this.load.image("ship", ship);
    this.load.image("asteroid", asteroid);
    this.load.image("quickAsteroid", quickAsteroid);
    this.load.image("shoot", shoot);
    this.load.audio("shootSound", shootSound);
    this.load.audio("shootDestroySound", shootDestroySound);
    this.load.audio("hitshipSound", hitship);
    this.load.audio("deathSound", death);
    this.load.audio("music", music);
  }

  create() {
    this.add.text(210, 150, "Asteroid", { fontSize: "80px", fill: "#f00" });

    this.music = this.sound.add("music", { loop: true, volume: 0.1 });
    this.music.play();

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
