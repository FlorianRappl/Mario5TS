import { Matter } from './Matter';
import { Level } from '../engine/Level';
import { GroundBlocking } from '../engine/constants';
import { toUrl } from '../utils';

export class Decoration extends Matter {
  constructor(level: Level) {
    super(GroundBlocking.none, level);
    level.decorations.push(this);
  }

  setImage(img: string, x: number = 0, y: number = 0) {
    this.view.css({
      backgroundImage: img ? toUrl(img) : 'none',
      backgroundPosition: `-${x}px -${y}px`,
    });
    super.setImage(img, x, y);
  }

  setPosition(x: number, y: number) {
    this.view.css({
      left: x,
      bottom: y,
    });
    super.setPosition(x, y);
  }
}
