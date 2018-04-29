import { Decoration } from './Decoration';
import { Level } from '../engine/Level';
import { images } from '../engine/constants';

export class LeftMiddleBush extends Decoration {
  constructor(level: Level) {
    super(level);
    this.setImage(images.objects, 212, 928);
  }
}
