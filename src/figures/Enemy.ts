import { Figure } from './Figure';
import { DeathAnimation } from '../types';
import { DeathMode, Direction, GroundBlocking, setup } from '../engine/constants';
import { Level } from '../engine/Level';
import { setStyle } from '../utils';

export class Enemy extends Figure implements DeathAnimation {
  speed: number;
  invisible: boolean;
  shell: boolean;
  deathMode: DeathMode;
  deathStep: number;
  deathCount: number;
  deathDir: number;
  deathFrames: number;
  deathStepUp: number;
  deathStepDown: number;

  constructor(level: Level) {
    super(level);
    this.speed = 0;
    this.shell = false;
    this.deathMode = DeathMode.normal;
    this.deathCount = 0;
  }

  hide() {
    this.invisible = true;
    setStyle(this.view, {
      display: 'none',
    });
  }

  show() {
    this.invisible = false;
    setStyle(this.view, {
      display: 'block',
    });
  }

  move() {
    if (!this.invisible) {
      super.move();

      if (this.vx === 0) {
        const s = this.speed * Math.sign(this.speed);
        this.setVelocity(this.direction === Direction.right ? -s : s, this.vy);
      }
    }
  }

  collides(is: number, ie: number, js: number, je: number, blocking: GroundBlocking) {
    if (this.j + 1 < this.level.getGridHeight()) {
      for (let i = is; i <= ie; i++) {
        if (i < 0 || i >= this.level.getGridWidth()) {
          return true;
        }

        const obj = this.level.obstacles[i][this.j + 1];

        if (!obj || (obj.blocking & GroundBlocking.top) !== GroundBlocking.top) {
          return true;
        }
      }
    }

    return super.collides(is, ie, js, je, blocking);
  }

  setSpeed(v: number) {
    this.speed = v;
    this.setVelocity(-v, 0);
  }

  hurt(from: Figure) {
    if (from instanceof Enemy && from.shell) {
      this.deathMode = DeathMode.shell;
    }

    this.die();
  }

  hit(opponent: Figure) {
    if (!this.invisible && opponent.player) {
      if (opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {
        opponent.setVelocity(opponent.vx, setup.bounce);
        this.hurt(opponent);
      } else {
        opponent.hurt(this);
      }
    }
  }
}
