import { Plant } from './Plant';
import { images, setup, Direction } from '../engine/constants';
import { Level } from '../engine/Level';
import { setStyle, shiftBy } from '../utils';

export class PipePlant extends Plant {
  deathFramesExtended: number;
  deathFramesExtendedActive: boolean;
  minimum: number;
  bottom: number;
  top: number;

  constructor(level: Level) {
    super(level);
    this.deathFrames = Math.floor(250 / setup.interval);
    this.deathFramesExtended = 6;
    this.deathFramesExtendedActive = false;
    this.deathStep = Math.ceil(100 / this.deathFrames);
    this.deathDir = 1;
    this.deathCount = 0;
  }

  init(x: number, y: number) {
    super.init(x + 16, y - 6);
    this.bottom = y - 48;
    this.top = y - 6;
    this.setDirection(Direction.down);
    this.setImage(images.enemies, 0, 56);
    setStyle(this.view, {
      zIndex: '95',
    });
  }

  setDirection(dir: Direction) {
    this.direction = dir;
  }

  setPosition(x: number, y: number) {
    if (y === this.bottom || y === this.top) {
      this.minimum = setup.pipeplant_count;
      this.setDirection(this.direction === Direction.up ? Direction.down : Direction.up);
    }

    super.setPosition(x, y);
  }

  blocked() {
    if (this.y === this.bottom) {
      let state = false;
      this.y += 48;

      for (let i = this.level.figures.length; i--; ) {
        if (this.level.figures[i] != this && this.q2q(this.level.figures[i])) {
          state = true;
          break;
        }
      }

      this.y -= 48;
      return state;
    }

    return false;
  }

  move() {
    if (this.minimum === 0) {
      if (!this.blocked()) {
        this.setPosition(this.x, this.y - (this.direction - 3) * setup.pipeplant_v);
      }
    } else {
      this.minimum--;
    }
  }

  die() {
    super.die();
    this.setImage(images.enemies, 68, 56);
  }

  death() {
    if (this.deathFramesExtendedActive) {
      this.setPosition(this.x, this.y - 8);
      return !!--this.deathFramesExtended;
    }

    shiftBy(this.view, 'bottom', this.deathDir, this.deathStep);
    this.deathCount += this.deathDir;

    if (this.deathCount === this.deathFrames) {
      this.deathDir = -1;
    } else if (this.deathCount === 0) {
      this.deathFramesExtendedActive = true;
    }

    return true;
  }
}
