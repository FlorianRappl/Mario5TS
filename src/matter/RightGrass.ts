import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class RightGrass extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.right, level);
    this.setImage(images.objects, 922, 438);
  }
}
