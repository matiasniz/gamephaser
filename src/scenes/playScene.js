import Shoot from "./../gameObjects/shoot";
import Asteroid from "../gameObjects/asteroid.js";
import QuickAsteroid from "../gameObjects/quickAsteroid.js";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super({ key: "PlayScene" });
    this.lastFired = 0;
    this.asteroidElapsedTime = 3000;
    this.gameOver = false;
    this.score = 0;
    this.scoreText;
  }

  preload() {}

  create() {
    this.add.image(0, 0, "background");
    this.add.image(640, 0, "background");
    this.add.image(0, 480, "background");
    this.add.image(640, 480, "background");

    this.scoreText = this.add.text(50, 10, "Score : 0", {
      font: "30px Arial",
      fill: "#fff"
    });

    this.lives = this.add.group();
    this.add.text(500, 10, "Lives : ", {
      font: "30px Arial",
      fill: "#fff"
    });

    for (var i = 0; i < 3; i++) {
      var ship = this.lives.create(640 + 60 * i, 30, "ship");
      ship.angle = 90;
      ship.alpha = 0.4;
    }

    this.ship = this.physics.add.image(400, 300, "ship");
    this.ship.setDamping(true);
    this.ship.setDrag(0.99);
    this.ship.setMaxVelocity(200);
    this.ship.setCollideWorldBounds(true);
    this.ship.setSize(20, 30);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.shootsGroup = this.physics.add.group({
      classType: Shoot,
      maxSize: 10,
      runChildUpdate: true
    });

    this.asteroidsGroup = this.physics.add.group();

    this.asteroidsArray = [];

    this.asteroidsTimedEvent = this.time.addEvent({
      delay: this.asteroidElapsedTime,
      callback: this.addAsteroid,
      callbackScope: this,
      loop: true
    });

    this.physics.add.overlap(
      this.ship,
      this.asteroidsGroup,
      this.hitShip,
      null,
      this
    );
    this.physics.add.collider(
      this.shootsGroup,
      this.asteroidsGroup,
      this.hitShoot,
      null,
      this
    );
  }

  update(time, delta) {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(
        this.ship.rotation,
        200,
        this.ship.body.acceleration
      );
    } else {
      this.ship.setAcceleration(0);
    }

    if (this.cursors.space.isDown && time > this.lastFired) {
      let shoot = this.shootsGroup.get();

      if (shoot) {
        shoot.fire(this.ship.x, this.ship.y, this.ship.rotation);

        this.lastFired = time + 50;
      }
    }

    if (this.cursors.left.isDown) {
      this.ship.setAngularVelocity(-300);
    } else if (this.cursors.right.isDown) {
      this.ship.setAngularVelocity(300);
    } else {
      this.ship.setAngularVelocity(0);
    }

    this.asteroidsArray = this.asteroidsArray.filter(function(asteroid) {
      return asteroid.active;
    });

    for (let asteroid of this.asteroidsArray) {
      if (!asteroid.isOrbiting()) {
        asteroid.fire(this.ship.x, this.ship.y);
      }

      asteroid.update(time, delta);
    }
  }

  addAsteroid() {
    const rnd = Math.floor(Math.random() * (10 - 1)) + 1;

    let asteroid =
      rnd > 5
        ? new Asteroid(this, 200, 300, 0)
        : new QuickAsteroid(this, 200, 300, 0);
    this.asteroidsGroup.add(asteroid, true);
    this.asteroidsArray.push(asteroid);
  }

  hitShip(ship, asteroid) {
    this.physics.pause();
    this.asteroidsTimedEvent.paused = true;

    this.ship.setTint(0xff0000);
    this.ship.body.allowRotation = false;

    this.gameOver = true;
  }

  hitShoot(shoot, asteroid) {
    this.score += 10;
    if (this.score == 50) {
      this.asteroidsTimedEvent = this.time.addEvent({
        delay: 2000,
        callback: this.addAsteroid,
        callbackScope: this,
        loop: true
      });
    }
    if (this.score == 100) {
      this.asteroidsTimedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.addAsteroid,
        callbackScope: this,
        loop: true
      });
    }
    this.scoreText.setText("Score: " + this.score);
    asteroid.disableBody(true, true);
  }
}
