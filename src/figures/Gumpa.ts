import { Enemy } from './Enemy';
import { Level } from '../engine/Level';
import { setup, Direction, images, DeathMode } from '../engine/constants';
import { shiftBy } from '../utils';

export class Gumpa extends Enemy {
  constructor(level: Level) {
    super(level);
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.setSize(34, 32);
    this.setSpeed(setup.ballmonster_v);
  }

  setVelocity(vx: number, vy: number) {
    super.setVelocity(vx, vy);

    if (this.direction === Direction.left) {
      if (!this.setupFrames(6, 2, false, 'LeftWalk')) {
        this.setImage(images.enemies, 34, 188);
      }
    } else {
      if (!this.setupFrames(6, 2, true, 'RightWalk')) {
        this.setImage(images.enemies, 0, 228);
      }
    }
  }

  death() {
    if (this.deathMode === DeathMode.normal) {
      return !!--this.deathCount;
    }

    shiftBy(this.view, 'bottom', this.deathDir, this.deathStep);
    this.deathCount += this.deathDir;

    if (this.deathCount === this.deathFrames) {
      this.deathDir = -1;
    } else if (this.deathCount === 0) {
      return false;
    }

    return true;
  }

  die() {
    this.clearFrames();

    if (this.deathMode === DeathMode.normal) {
      this.level.playSound('enemy_die');
      this.setImage(images.enemies, 102, 228);
      this.deathCount = Math.ceil(600 / setup.interval);
    } else if (this.deathMode === DeathMode.shell) {
      this.level.playSound('shell');
      this.setImage(images.enemies, 68, this.direction === Direction.right ? 228 : 188);
      this.deathFrames = Math.floor(250 / setup.interval);
      this.deathDir = 1;
      this.deathStep = Math.ceil(150 / this.deathFrames);
    }

    super.die();
  }
}
