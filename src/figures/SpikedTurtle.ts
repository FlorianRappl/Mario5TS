import { Turtle } from './Turtle';
import { Level } from '../engine/Level';
import { setup, Direction, images } from '../engine/constants';
import { Figure } from './Figure';
import { Mario } from './Mario';
import { shiftBy } from '../utils';

export class SpikedTurtle extends Turtle {
  constructor(level: Level) {
    super(level);
    this.deathFrames = Math.floor(250 / setup.interval);
    this.deathStepUp = Math.ceil(150 / this.deathFrames);
    this.deathStepDown = Math.ceil(182 / this.deathFrames);
    this.deathDir = 1;
    this.deathCount = 0;
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.setSize(34, 32);
    this.setSpeed(setup.spiked_turtle_v);
  }

  setVelocity(vx: number, vy: number) {
    super.setVelocity(vx, vy);

    if (this.direction === Direction.left) {
      if (!this.setupFrames(4, 2, true, 'LeftWalk')) {
        this.setImage(images.enemies, 0, 106);
      }
    } else {
      if (!this.setupFrames(6, 2, false, 'RightWalk')) {
        this.setImage(images.enemies, 34, 147);
      }
    }
  }

  death() {
    shiftBy(this.view, 'bottom', this.deathDir, this.deathDir > 0 ? this.deathStepUp : this.deathStepDown);
    this.deathCount += this.deathDir;

    if (this.deathCount === this.deathFrames) {
      this.deathDir = -1;
    } else if (this.deathCount === 0) {
      return false;
    }

    return true;
  }

  die() {
    this.level.playSound('shell');
    this.clearFrames();
    super.die();
    this.setImage(images.enemies, 68, this.direction === Direction.left ? 106 : 147);
  }

  hit(opponent: Figure) {
    if (!this.invisible && opponent.player) {
      (<Mario>opponent).hurt(this);
    }
  }
}
