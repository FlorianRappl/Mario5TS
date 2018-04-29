import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class TopLeftGrass extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.left + GroundBlocking.top, level);
    this.setImage(images.objects, 854, 404);
  }
}
