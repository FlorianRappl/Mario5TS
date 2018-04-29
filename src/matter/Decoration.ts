import { Matter } from './Matter';
import { Level } from '../engine/Level';
import { GroundBlocking } from '../engine/constants';
import { toUrl, setStyle } from '../utils';

export class Decoration extends Matter {
  constructor(level: Level) {
    super(GroundBlocking.none, level);
    level.decorations.push(this);
  }

  setImage(img: string, x: number = 0, y: number = 0) {
    setStyle(this.view, {
      backgroundImage: img ? toUrl(img) : 'none',
      backgroundPosition: `-${x}px -${y}px`,
    });
    super.setImage(img, x, y);
  }

  setPosition(x: number, y: number) {
    setStyle(this.view, {
      left: `${x}px`,
      bottom: `${y}px`,
    });
    super.setPosition(x, y);
  }
}
