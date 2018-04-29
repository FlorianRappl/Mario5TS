import { Point, Size, Picture } from '../types';
import { setup } from './constants';
import { setStyle } from '../utils';

export class Base implements Point, Size {
  frameCount: number;
  x: number;
  y: number;
  image: Picture;
  width: number;
  height: number;
  currentFrame: number;
  frameID?: string;
  rewindFrames: boolean;
  frameTick: number;
  frames: number;
  view: HTMLElement;

  constructor() {
    this.frameCount = 0;
  }

  init(x: number = 0, y: number = 0) {
    this.clearFrames();
    this.setPosition(x, y);
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getPosition(): Point {
    return {
      x: this.x,
      y: this.y,
    };
  }

  setImage(img: string, x: number, y: number) {
    this.image = {
      path: img,
      x: x,
      y: y,
    };
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getSize(): Size {
    return {
      width: this.width,
      height: this.height,
    };
  }

  setupFrames(fps: number, frames: number, rewind: boolean, id?: string) {
    if (id) {
      if (this.frameID === id) {
        return true;
      }

      this.frameID = id;
    }

    this.currentFrame = 0;
    this.frameTick = frames ? 1000 / fps / setup.interval : 0;
    this.frames = frames;
    this.rewindFrames = rewind;
    return false;
  }

  clearFrames() {
    this.frameID = undefined;
    this.frames = 0;
    this.currentFrame = 0;
    this.frameTick = 0;
  }

  playFrame() {
    if (this.frameTick && this.view) {
      this.frameCount++;

      if (this.frameCount >= this.frameTick) {
        this.frameCount = 0;

        if (this.currentFrame === this.frames) {
          this.currentFrame = 0;
        }

        const x = this.image.x + this.width * ((this.rewindFrames ? this.frames - 1 : 0) - this.currentFrame);
        const y = this.image.y;
        setStyle(this.view, {
          backgroundPosition: `-${x}px -${y}px`,
        })
        this.currentFrame++;
      }
    }
  }
}
