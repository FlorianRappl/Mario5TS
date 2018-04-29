import { Coin } from './Coin';
import { Level } from '../engine/Level';
import { images, setup } from '../engine/constants';
import { Mario } from '../figures/Mario';
import { setStyle, shiftBy } from '../utils';

export class CoinBoxCoin extends Coin {
  count: number;
  step: number;

  constructor(level: Level) {
    super(level);
    this.setImage(images.objects, 96, 0);
    this.clearFrames();
    setStyle(this.view, {
      display: 'none',
    });
    this.count = 0;
    this.frames = Math.floor(150 / setup.interval);
    this.step = Math.ceil(30 / this.frames);
  }

  remove() {}

  addToGrid() {}

  addToAny() {}

  activate(from: Mario) {
    super.activate(from);
    setStyle(this.view, {
      display: 'block',
    });
    shiftBy(this.view, 'bottom', 1, 8);
  }

  act() {
    shiftBy(this.view, 'bottom', 1, this.step);
    this.count++;
    return this.count === this.frames;
  }
}
