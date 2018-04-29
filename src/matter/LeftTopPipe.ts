import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class LeftTopPipe extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.all, level);
    this.setImage(images.objects, 2, 358);
  }
}
