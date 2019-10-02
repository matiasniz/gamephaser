export default class QuickAsteroid extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, tipo) {
    super(scene, x, y, "quickAsteroid");

    this.speed = Phaser.Math.GetSpeed(200, 1);
    this.direction = 0;
    this.angle = 0;
    this.orbiting = false;
    this.direction = 0;
    this.factor = 1;
    this.tipo = tipo;
  }

  isOrbiting() {
    return this.orbiting;
  }

  fire(shipX, shipY) {
    this.setSize(32, 29);
    this.orbiting = true;

    this.setActive(true);
    this.setVisible(true);

    let xOrigin = Phaser.Math.RND.between(0, 800);

    const rnd = Math.floor(Math.random() * (10 - 1)) + 1;

    let yOrigin = rnd > 5 ? 0 : 600;

    this.setPosition(xOrigin, yOrigin);

    if (xOrigin >= shipX) this.factor = -1;

    let m = (shipY - yOrigin) / Math.abs(shipX - xOrigin);
    this.direction = Math.atan(m);

    this.angleRotation = Phaser.Math.RND.between(0.2, 0.9);
  }

  update(time, delta) {
    this.x += this.factor * Math.cos(this.direction) * this.speed * delta;
    this.y += Math.sin(this.direction) * this.speed * delta;
    this.angle += this.angleRotation;

    if (this.x < -50 || this.y < -50 || this.x > 800 || this.y > 600) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
