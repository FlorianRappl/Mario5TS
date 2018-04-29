import { Matter } from '../matter';
import { GroundBlocking, setup } from '../engine/constants';
import { Level } from '../engine/Level';
import { Mario } from '../figures/Mario';
import { shiftBy } from '../utils';

export class Item extends Matter {
  isBouncing: boolean;
  bounceFrames: number;
  bounceStep: number;
  bounceDir: number;
  bounceCount: number;
  activated: boolean;
  isBlocking: boolean;

  constructor(isBlocking: boolean, level: Level) {
    super(isBlocking ? GroundBlocking.all : GroundBlocking.none, level);
    this.isBouncing = false;
    this.bounceCount = 0;
    this.bounceFrames = Math.floor(50 / setup.interval);
    this.bounceStep = Math.ceil(10 / this.bounceFrames);
    this.bounceDir = 1;
    this.isBlocking = isBlocking;
    this.activated = false;
    this.addToAny(level);
  }

  addToAny(level: Level) {
    level.items.push(this);
  }

  activate(_from: Mario) {
    this.activated = true;
  }

  bounce() {
    this.isBouncing = true;

    for (let i = this.level.figures.length; i--; ) {
      const fig = this.level.figures[i];

      if (fig.y === this.y + 32 && fig.x >= this.x - 16 && fig.x <= this.x + 16) {
        fig.bounce(fig.vx, setup.bounce);
      }
    }
  }

  playFrame() {
    if (this.isBouncing) {
      shiftBy(this.view, 'bottom', this.bounceDir, this.bounceStep);
      this.bounceCount += this.bounceDir;

      if (this.bounceCount === this.bounceFrames) {
        this.bounceDir = -1;
      } else if (this.bounceCount === 0) {
        this.bounceDir = 1;
        this.isBouncing = false;
      }
    }

    super.playFrame();
  }
}
