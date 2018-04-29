import { Base } from '../engine/Base';
import { Level } from '../engine/Level';
import { GroundBlocking, images } from '../engine/constants';
import { toUrl } from '../utils';

declare const $: any;

export class Matter extends Base {
  blocking: GroundBlocking;
  level: Level;

  constructor(blocking: GroundBlocking, level: Level) {
    super();
    this.level = level;
    this.blocking = blocking;
    this.view = $('<div />')
      .addClass('matter')
      .appendTo(level.world);
  }

  init(x: number, y: number) {
    super.init(x, y);
    this.setSize(32, 32);
    this.addToGrid(this.level);
  }

  addToGrid(level: Level) {
    level.obstacles[this.x / 32][this.level.getGridHeight() - 1 - this.y / 32] = this;
  }

  setImage(img: string, x = 0, y = 0) {
    this.view.css({
      backgroundImage: img ? toUrl(img) : 'none',
      backgroundPosition: `-${x}px -${y}px`,
    });
    super.setImage(img, x, y);
  }

  setPosition(x: number, y: number) {
    this.view.css({
      left: x,
      bottom: y,
    });
    super.setPosition(x, y);
  }
}
