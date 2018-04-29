import { Decoration } from './Decoration';
import { Level } from '../engine/Level';
import { images } from '../engine/constants';

export class TopRightGrassSoil extends Decoration {
  constructor(level: Level) {
    super(level);
    this.setImage(images.objects, 990, 506);
  }
}
