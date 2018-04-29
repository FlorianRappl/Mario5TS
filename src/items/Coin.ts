import { Item } from './Item';
import { Level } from '../engine/Level';
import { images } from '../engine/constants';
import { Mario } from '../figures/Mario';

export class Coin extends Item {
  constructor(level: Level) {
    super(false, level);
    this.setImage(images.objects, 0, 0);
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.setupFrames(10, 4, true);
  }

  activate(from: Mario) {
    if (!this.activated) {
      this.level.playSound('coin');
      from.addCoin();
      this.remove();
    }

    super.activate(from);
  }

  remove() {
    this.view.remove();
  }
}
