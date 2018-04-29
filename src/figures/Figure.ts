import { Base } from '../engine/Base';
import { GridPoint, Settings, StateItem } from '../types';
import { Item } from '../items/Item';
import { SizeState, Direction, GroundBlocking, setup } from '../engine/constants';
import { toUrl, setStyle, createBox } from '../utils';
import { Level } from '../engine/Level';

export class Figure extends Base implements GridPoint, StateItem {
  player: boolean;
  shellHost: boolean;
  dx: number;
  dy: number;
  onground: boolean;
  dead: boolean;
  vx: number;
  vy: number;
  level: Level;
  state: SizeState;
  direction: Direction;
  i: number;
  j: number;
  cw: number;
  ch: number;

  constructor(level: Level) {
    super();
    this.view = createBox(level.world, 'figure');
    this.player = false;
    this.shellHost = false;
    this.dx = 0;
    this.dy = 0;
    this.dead = false;
    this.onground = true;
    this.level = level;
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.setState(SizeState.small);
    this.setVelocity(0, 0);
    this.direction = Direction.none;
    this.level.figures.push(this);
  }

  q2q(opponent: StateItem) {
    if (this.x > opponent.x + opponent.cw) {
      return false;
    } else if (this.x < opponent.x - this.cw) {
      return false;
    } else if (this.y - 4 < opponent.y - this.ch) {
      return false;
    } else if (this.y + 4 > opponent.y + opponent.ch) {
      return false;
    }

    return true;
  }

  setState(state: SizeState) {
    this.state = state;
    this.cw = 32;
    this.ch = this.state * 32;
  }

  hurt(_from: Figure) {}

  store(_settings: Partial<Settings>) {}

  restore(_settings: Settings) {}

  setImage(img: string, x = 0, y = 0) {
    setStyle(this.view, {
      backgroundImage: img ? toUrl(img) : 'none',
      backgroundPosition: `-${x}px -${y}px`,
    });
    super.setImage(img, x, y);
  }

  setOffset(dx: number, dy: number) {
    this.dx = dx;
    this.dy = dy;
    this.setPosition(this.x, this.y);
  }

  setPosition(x: number, y: number) {
    setStyle(this.view, {
      left: `${x}px`,
      bottom: `${y}px`,
      marginLeft: `${this.dx}px`,
      marginBottom: `${this.dy}px`,
    });
    super.setPosition(x, y);
    this.setGridPosition(x, y);
  }

  setSize(width: number, height: number) {
    setStyle(this.view, {
      width: `${width}px`,
      height: `${height}px`,
    });
    super.setSize(width, height);
  }

  setGridPosition(x: number, y: number) {
    this.i = Math.floor((x + 16) / 32);
    this.j = Math.ceil(this.level.getGridHeight() - 1 - y / 32);

    if (this.j > this.level.getGridHeight()) {
      this.die();
    }
  }

  getGridPosition(): GridPoint {
    return {
      i: this.i,
      j: this.j,
    };
  }

  setVelocity(vx: number, vy: number) {
    this.vx = vx;
    this.vy = vy;

    if (vx > 0) {
      this.direction = Direction.right;
    } else if (vx < 0) {
      this.direction = Direction.left;
    }
  }

  getVelocity() {
    return {
      vx: this.vx,
      vy: this.vy,
    };
  }

  hit(_opponent: Figure) {}

  trigger(_obj: Item) {}

  collides(is: number, ie: number, js: number, je: number, blocking: GroundBlocking) {
    if (is < 0 || ie >= this.level.obstacles.length) {
      return true;
    } else if (js < 0 || je >= this.level.getGridHeight()) {
      return false;
    }

    for (let i = is; i <= ie; i++) {
      for (let j = je; j >= js; j--) {
        const obj = this.level.obstacles[i][j];

        if (obj) {
          if (obj instanceof Item && (blocking === GroundBlocking.bottom || obj.blocking === GroundBlocking.none)) {
            this.trigger(<Item>obj);
          }

          if ((obj.blocking & blocking) === blocking) {
            return true;
          }
        }
      }
    }

    return false;
  }

  move() {
    let vx = this.vx;
    let vy = this.vy - setup.gravity;

    const s = this.state;

    let x = this.x;
    let y = this.y;

    const dx = Math.sign(vx);
    const dy = Math.sign(vy);

    let is = this.i;
    let ie = is;

    const js = Math.ceil(this.level.getGridHeight() - s - (y + 31) / 32);
    const je = this.j;

    let d = 0;
    let b = GroundBlocking.none;
    let onground = false;
    let t = Math.floor((x + 16 + vx) / 32);

    if (dx > 0) {
      d = t - ie;
      t = ie;
      b = GroundBlocking.left;
    } else if (dx < 0) {
      d = is - t;
      t = is;
      b = GroundBlocking.right;
    }

    x += vx;

    for (let i = 0; i < d; i++) {
      if (this.collides(t + dx, t + dx, js, je, b)) {
        vx = 0;
        x = t * 32 + 15 * dx;
        break;
      }

      t += dx;
      is += dx;
      ie += dx;
    }

    if (dy > 0) {
      t = Math.ceil(this.level.getGridHeight() - s - (y + 31 + vy) / 32);
      d = js - t;
      t = js;
      b = GroundBlocking.bottom;
    } else if (dy < 0) {
      t = Math.ceil(this.level.getGridHeight() - 1 - (y + vy) / 32);
      d = t - je;
      t = je;
      b = GroundBlocking.top;
    } else {
      d = 0;
    }

    y += vy;

    for (let i = 0; i < d; i++) {
      if (this.collides(is, ie, t - dy, t - dy, b)) {
        onground = dy < 0;
        vy = 0;
        y = this.level.height - (t + 1) * 32 - (dy > 0 ? (s - 1) * 32 : 0);
        break;
      }

      t -= dy;
    }

    this.onground = onground;
    this.setVelocity(vx, vy);
    this.setPosition(x, y);
  }

  death() {
    return false;
  }

  die() {
    this.dead = true;
  }

  bounce(_dx: number, _dy: number) {
    this.die();
  }
}
