import { Item } from './Item';
import { Mushroom } from './Mushroom';
import { MushroomMode, images, SizeState } from '../engine/constants';
import { Level } from '../engine/Level';
import { Mario } from '../figures/Mario';

export class MushroomBox extends Item {
  max_mode: MushroomMode;
  mushroom: Mushroom;

  constructor(level: Level) {
    super(true, level);
    this.setImage(images.objects, 96, 33);
    this.max_mode = MushroomMode.plant;
    this.mushroom = new Mushroom(level);
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.mushroom.init(x, y);
    this.setupFrames(8, 4, false);
  }

  activate(from: Mario) {
    if (!this.activated) {
      if (from.state === SizeState.small || this.max_mode === MushroomMode.mushroom) {
        this.mushroom.release(MushroomMode.mushroom);
      } else {
        this.mushroom.release(MushroomMode.plant);
      }

      this.clearFrames();
      this.bounce();
      this.setImage(images.objects, 514, 194);
    }

    super.activate(from);
  }
}
