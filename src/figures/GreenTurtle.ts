import { Turtle } from './Turtle';
import { Figure } from './Figure';
import { Level } from '../engine/Level';
import { Point } from '../types';
import { DeathMode, SizeState, setup, Direction, images } from '../engine/constants';
import { TurtleShell } from './TurtleShell';
import { shiftBy } from '../utils';

export class GreenTurtle extends Turtle {
  wait: number;
  walkSprites: Array<Array<Point>>;

  constructor(level: Level) {
    super(level);
    this.shellHost = true;
    this.walkSprites = [[{ x: 34, y: 382 }, { x: 0, y: 437 }], [{ x: 34, y: 266 }, { x: 0, y: 325 }]];
    this.wait = 0;
    this.deathMode = DeathMode.normal;
    this.deathFrames = Math.floor(250 / setup.interval);
    this.deathStepUp = Math.ceil(150 / this.deathFrames);
    this.deathStepDown = Math.ceil(182 / this.deathFrames);
    this.deathDir = 1;
    this.deathCount = 0;
  }

  init(x: number, y: number) {
    super.init(x, y);
    const shell = new TurtleShell(this.level);
    this.setSize(34, 54);
    this.setShell(shell);
    shell.init(x, y);
  }

  setShell(shell: TurtleShell) {
    if (!this.house && !this.wait) {
      this.house = shell;
      shell.hide();
      this.setState(SizeState.big);
      return true;
    }

    return false;
  }

  setState(state: SizeState) {
    super.setState(state);

    if (state === SizeState.big) {
      this.setSpeed(setup.big_turtle_v);
    } else {
      this.setSpeed(setup.small_turtle_v);
    }
  }

  setVelocity(vx: number, vy: number) {
    super.setVelocity(vx, vy);
    const rewind = this.direction === Direction.right;
    const coords = this.walkSprites[this.state - 1][rewind ? 1 : 0];
    const label = Math.sign(vx) + '-' + this.state;

    if (!this.setupFrames(6, 2, rewind, label)) {
      this.setImage(images.enemies, coords.x, coords.y);
    }
  }

  die() {
    super.die();
    this.clearFrames();

    if (this.deathMode === DeathMode.normal) {
      this.deathFrames = Math.floor(600 / setup.interval);
      this.setImage(images.enemies, 102, 437);
    } else if (this.deathMode === DeathMode.shell) {
      this.level.playSound('shell');
      this.setImage(
        images.enemies,
        68,
        this.state === SizeState.small ? (this.direction === Direction.right ? 437 : 382) : 325,
      );
    }
  }

  death() {
    if (this.deathMode === DeathMode.normal) {
      return !!--this.deathFrames;
    }

    shiftBy(this.view, 'bottom', this.deathDir, this.deathDir > 0 ? this.deathStepUp : this.deathStepDown);
    this.deathCount += this.deathDir;

    if (this.deathCount === this.deathFrames) {
      this.deathDir = -1;
    } else if (this.deathCount === 0) {
      return false;
    }

    return true;
  }

  move() {
    if (this.wait) {
      this.wait--;
    }

    super.move();
  }

  hurt(_opponent: Figure) {
    this.level.playSound('enemy_die');

    if (this.state !== SizeState.small) {
      this.wait = setup.shell_wait;
      this.setState(SizeState.small);
      this.house && this.house.activate(this.x, this.y);
      this.house = undefined;
    }

    return this.die();
  }
}
