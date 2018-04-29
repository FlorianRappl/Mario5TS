import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class LeftGrass extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.left, level);
    this.setImage(images.objects, 854, 438);
  }
}
