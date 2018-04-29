import { CoinBox } from './CoinBox';
import { Level } from '../engine/Level';

export class MultipleCoinBox extends CoinBox {
  constructor(level: Level) {
    super(level, 8);
  }
}
