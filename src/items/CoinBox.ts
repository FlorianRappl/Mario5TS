import { Item } from './Item';
import { CoinBoxCoin } from './CoinBoxCoin';
import { Mario } from '../figures/Mario';
import { images } from '../engine/constants';
import { Level } from '../engine/Level';

export class CoinBox extends Item {
  items: Array<CoinBoxCoin>;
  actors: Array<CoinBoxCoin>;

  constructor(level: Level, private amount: number = 1) {
    super(true, level);
    this.setImage(images.objects, 346, 328);
    this.items = [];
    this.actors = [];
  }

  init(x: number, y: number) {
    super.init(x, y);

    for (let i = 0; i < this.amount; i++) {
      const coin = new CoinBoxCoin(this.level);
      coin.init(this.x, this.y);
      this.items.push(coin);
    }
  }

  activate(from: Mario) {
    if (!this.isBouncing) {
      if (this.items.length) {
        this.bounce();
        const coin = this.items.pop();

        if (coin) {
          coin.activate(from);
          this.actors.push(coin);
        }

        if (!this.items.length) {
          this.setImage(images.objects, 514, 194);
        }
      }
    }

    super.activate(from);
  }

  playFrame() {
    for (let i = this.actors.length; i--; ) {
      if (this.actors[i].act()) {
        this.actors[i].view.remove();
        this.actors.splice(i, 1);
      }
    }

    super.playFrame();
  }
}
