import { Figure } from '../figures/Figure';
import { Level } from '../engine/Level';

export class ItemFigure extends Figure {
  constructor(level: Level) {
    super(level);
  }

  bounce(dx: number, dy: number) {
    this.setVelocity(dx, dy);
  }
}
