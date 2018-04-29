import { Matter } from './Matter';
import { Level } from '../engine/Level';
import { GroundBlocking } from '../engine/constants';

export class Ground extends Matter {
  constructor(blocking: GroundBlocking, level: Level) {
    super(blocking, level);
  }
}
