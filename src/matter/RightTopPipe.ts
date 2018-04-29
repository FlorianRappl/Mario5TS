import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class RightTopPipe extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.all, level);
    this.setImage(images.objects, 36, 358);
  }
}
