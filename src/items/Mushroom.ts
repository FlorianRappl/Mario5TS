import { ItemFigure } from './ItemFigure';
import { Figure } from '../figures/Figure';
import { MushroomMode, images, Direction, setup } from '../engine/constants';
import { Level } from '../engine/Level';
import { Mario } from '../figures/Mario';
import { setStyle } from '../utils';

export class Mushroom extends ItemFigure {
  mode: MushroomMode;
  active: boolean;
  released: number;

  constructor(level: Level) {
    super(level);
    this.active = false;
    this.setImage(images.objects, 582, 60);
    this.released = 0;
    setStyle(this.view, {
      zIndex: '94',
      display: 'none',
    });
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.setSize(32, 32);
  }

  release(mode: MushroomMode) {
    this.released = 4;
    this.level.playSound('mushroom');

    if (mode === MushroomMode.plant) {
      this.setImage(images.objects, 548, 60);
    }

    this.mode = mode;
    setStyle(this.view, {
      display: 'block',
    });
  }

  move() {
    if (this.active) {
      super.move();

      if (this.mode === MushroomMode.mushroom && this.vx === 0) {
        this.setVelocity(this.direction === Direction.right ? -setup.mushroom_v : setup.mushroom_v, this.vy);
      }
    } else if (this.released) {
      this.released--;
      this.setPosition(this.x, this.y + 8);

      if (!this.released) {
        this.active = true;
        setStyle(this.view, {
          zIndex: '99',
        });

        if (this.mode === MushroomMode.mushroom) {
          this.setVelocity(setup.mushroom_v, setup.gravity);
        }
      }
    }
  }

  hit(opponent: Figure) {
    if (this.active && opponent.player) {
      if (this.mode === MushroomMode.mushroom) {
        (<Mario>opponent).grow();
      } else if (this.mode === MushroomMode.plant) {
        (<Mario>opponent).shooter();
      }

      this.die();
    }
  }
}
