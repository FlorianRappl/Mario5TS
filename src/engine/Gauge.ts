import { Base } from './Base';

export class Gauge extends Base {
  constructor(el: HTMLElement, startImgX: number, startImgY: number, fps: number, frames: number, rewind: boolean) {
    super();
    this.view = el;

    this.setSize(el.offsetWidth, el.offsetHeight);
    this.setImage(this.view.style.backgroundImage || '', startImgX, startImgY);
    this.setupFrames(fps, frames, rewind);
  }

  init() {
    super.init(0, 0);
  }
}
