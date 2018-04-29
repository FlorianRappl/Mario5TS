import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class LeftPipe extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.left + GroundBlocking.bottom, level);
    this.setImage(images.objects, 2, 390);
  }
}
