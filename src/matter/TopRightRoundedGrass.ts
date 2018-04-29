import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class TopRightRoundedGrass extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.top, level);
    this.setImage(images.objects, 922, 506);
  }
}
