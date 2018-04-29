import { Enemy } from './Enemy';
import { Level } from '../engine/Level';
import { images, Direction, setup, SizeState, GroundBlocking } from '../engine/constants';
import { Turtle } from './Turtle';
import { Figure } from './Figure';

export class TurtleShell extends Enemy {
  idle: number;

  constructor(level: Level) {
    super(level);
    this.shell = true;
    this.speed = 0;
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.setSize(34, 32);
    this.setImage(images.enemies, 0, 494);
  }

  activate(x: number, y: number) {
    this.setupFrames(6, 4, false);
    this.setPosition(x, y);
    this.show();
  }

  takeBack(where: Turtle) {
    if (where.setShell(this)) {
      this.clearFrames();
    }
  }

  hit(opponent: Figure) {
    if (this.invisible) {
      return;
    } else if (this.vx) {
      if (this.idle) {
        this.idle--;
      } else {
        opponent.hurt(this);
      }
    } else if (opponent.player) {
      this.setSpeed(opponent.direction === Direction.right ? -setup.shell_v : setup.shell_v);
      opponent.setVelocity(opponent.vx, setup.bounce);
      this.idle = 2;
    } else if (opponent.shellHost && opponent.state === SizeState.small) {
      this.takeBack(<Turtle>opponent);
    }
  }

  collides(is: number, ie: number, js: number, je: number, blocking: GroundBlocking) {
    if (is < 0 || ie >= this.level.obstacles.length) {
      return true;
    } else if (js < 0 || je >= this.level.getGridHeight()) {
      return false;
    } else {
      for (let i = is; i <= ie; i++) {
        for (let j = je; j >= js; j--) {
          const obj = this.level.obstacles[i][j];

          if (obj && (obj.blocking & blocking) === blocking) {
            return true;
          }
        }
      }
    }


    return false;
  }
}
