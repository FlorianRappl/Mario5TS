import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class RightPipe extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.right + GroundBlocking.bottom, level);
    this.setImage(images.objects, 36, 390);
  }
}
