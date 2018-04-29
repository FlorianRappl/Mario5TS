import { Base } from './Base';

declare const $: any;

export class Gauge extends Base {
  constructor(el: Element, startImgX: number, startImgY: number, fps: number, frames: number, rewind: boolean) {
    super();
    this.view = $(el);
    this.setSize(this.view.width(), this.view.height());
    this.setImage(this.view.css('background-image'), startImgX, startImgY);
    this.setupFrames(fps, frames, rewind);
  }

  init() {
    super.init(0, 0);
  }
}
