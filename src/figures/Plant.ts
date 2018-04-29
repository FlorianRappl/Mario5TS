import { Enemy } from './Enemy';
import { Figure } from './Figure';
import { Level } from '../engine/Level';
import { images } from '../engine/constants';

export class Plant extends Enemy {
  constructor(level: Level) {
    super(level);
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.setSize(34, 42);
    this.setupFrames(5, 2, true);
    this.setImage(images.enemies, 0, 3);
  }

  setVelocity(_vx: number, _vy: number) {
    super.setVelocity(0, 0);
  }

  die() {
    this.level.playSound('shell');
    this.clearFrames();
    super.die();
  }

  hit(opponent: Figure) {
    if (!this.invisible && opponent.player) {
      opponent.hurt(this);
    }
  }
}
