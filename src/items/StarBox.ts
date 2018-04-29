import { Item } from './Item';
import { Star } from './Star';
import { Level } from '../engine/Level';
import { images } from '../engine/constants';
import { Mario } from '../figures/Mario';

export class StarBox extends Item {
  star: Star;

  constructor(level: Level) {
    super(true, level);
    this.setImage(images.objects, 96, 33);
    this.star = new Star(level);
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.star.init(x, y);
    this.setupFrames(8, 4, false);
  }

  activate(from: Mario) {
    if (!this.activated) {
      this.star.release();
      this.clearFrames();
      this.bounce();
      this.setImage(images.objects, 514, 194);
    }

    super.activate(from);
  }
}
