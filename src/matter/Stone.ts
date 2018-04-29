import { Ground } from './Ground';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';

export class Stone extends Ground {
  constructor(level: Level) {
    super(GroundBlocking.all, level);
    this.setImage(images.objects, 550, 160);
  }
}
