import { Coin } from './Coin';
import { Level } from '../engine/Level';
import { images, setup } from '../engine/constants';
import { Mario } from '../figures/Mario';

export class CoinBoxCoin extends Coin {
  count: number;
  step: number;

  constructor(level: Level) {
    super(level);
    this.setImage(images.objects, 96, 0);
    this.clearFrames();
    this.view.hide();
    this.count = 0;
    this.frames = Math.floor(150 / setup.interval);
    this.step = Math.ceil(30 / this.frames);
  }

  remove() {}

  addToGrid() {}

  addToAny() {}

  activate(from: Mario) {
    super.activate(from);
    this.view.show().css({ bottom: '+=8px' });
  }

  act() {
    this.view.css({ bottom: '+=' + this.step + 'px' });
    this.count++;
    return this.count === this.frames;
  }
}
