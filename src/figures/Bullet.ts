import { Figure } from './Figure';
import { images, setup, Direction } from '../engine/constants';

export class Bullet extends Figure {
  parent: Figure;
  life: number;
  speed: number;

  constructor(parent: Figure) {
    super(parent.level);
    this.parent = parent;
    this.life = Math.ceil(2000 / setup.interval);
    this.speed = setup.bullet_v;
  }

  init(x: number, y: number) {
    super.init(x + 31, y + 14);
    this.setImage(images.sprites, 191, 366);
    this.setSize(16, 16);
    this.direction = this.parent.direction;
    this.vy = 0;
    this.vx = this.direction === Direction.right ? this.speed : -this.speed;
  }

  setVelocity(vx: number, vy: number) {
    super.setVelocity(vx, vy);

    if (this.vx === 0) {
      const s = this.speed * Math.sign(this.speed);
      this.vx = this.direction === Direction.right ? -s : s;
    }

    if (this.onground) {
      this.vy = setup.bounce;
    }
  }

  move() {
    if (--this.life) {
      super.move();
    } else {
      this.die();
    }
  }

  hit(opponent: Figure) {
    if (opponent !== this.parent) {
      opponent.die();
      this.die();
    }
  }
}
