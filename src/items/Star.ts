import { ItemFigure } from './ItemFigure';
import { Figure } from '../figures/Figure';
import { Level } from '../engine/Level';
import { images, setup, GroundBlocking } from '../engine/constants';
import { Mario } from '../figures/Mario';
import { setStyle } from '../utils';

export class Star extends ItemFigure {
  active: boolean;
  taken: number;

  constructor(level: Level) {
    super(level);
    this.active = false;
    this.setImage(images.objects, 32, 69);
    setStyle(this.view, {
      display: 'none',
    });
  }

  init(x: number, y: number) {
    super.init(x, y + 32);
    this.setSize(32, 32);
  }

  release() {
    this.taken = 4;
    this.active = true;
    this.level.playSound('mushroom');
    setStyle(this.view, {
      display: 'block',
    });
    this.setVelocity(setup.star_vx, setup.star_vy);
    this.setupFrames(10, 2, false);
  }

  collides(_is: number, _ie: number, _js: number, _je: number, _blocking: GroundBlocking) {
    return false;
  }

  move() {
    if (this.active) {
      this.vy += this.vy <= -setup.star_vy ? setup.gravity : setup.gravity / 2;
      super.move();
    }

    if (this.taken) {
      this.taken--;
    }
  }

  hit(opponent: Figure) {
    if (!this.taken && this.active && opponent.player) {
      (<Mario>opponent).invincible();
      this.die();
    }
  }
}
