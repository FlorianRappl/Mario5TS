import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class TopRightGrass extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.top + GroundBlocking.right, level);
    this.setImage(images.objects, 922, 404);
  }
}
