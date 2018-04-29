import { Base } from './Base';
import { Keys, SoundManager, LevelFormat, Settings, StateItem } from '../types';
import { Matter } from '../matter/Matter';
import { Item } from '../items/Item';
import { setup, MarioState, SizeState, backgrounds } from './constants';
import { Gauge } from './Gauge';
import { toUrl } from '../utils';

declare const $: any;

export interface Assets {
  [asset: string]: {
    new(level: Level): {
      init(x: number, y: number): void;
    };
  };
}

function createChild(host: Element, ...classes: Array<string>) {
  host.classList.add('game');
  const child = host.appendChild(document.createElement('div'));

  for (const cls of classes) {
    child.classList.add(cls);
  }

  return child;
}

export class Level extends Base {
  world: any;
  figures: Array<StateItem>;
  obstacles: Array<Array<Matter | undefined>>;
  decorations: Array<Matter>;
  items: Array<Item>;
  lifes: number;
  liveGauge: Gauge;
  coinGauge: Gauge;
  active: boolean;
  nextCycles: number;
  loop: number | void;
  sounds: SoundManager;
  raw: LevelFormat;
  id: number;
  controls: Keys;
  assets: Assets;

  constructor(host: Element, controls: Keys, assets: Assets) {
    super();
    const world = createChild(host, 'world');
    createChild(host, 'coinNumber', 'gauge')
    const coins = createChild(host, 'coin', 'gaugeSprite');
    createChild(host, 'liveNumber', 'gauge')
    const lives = createChild(host, 'live', 'gaugeSprite');
    this.world = $(world);
    this.assets = assets;
    this.controls = controls;
    this.nextCycles = 0;
    this.active = false;
    this.figures = [];
    this.obstacles = [];
    this.decorations = [];
    this.items = [];
    this.coinGauge = new Gauge(coins, 0, 0, 10, 4, true);
    this.liveGauge = new Gauge(lives, 0, 430, 6, 6, true);
  }

  init() {
    super.init(0, 0);
  }

  private defaultSettings(): Settings {
    return {
      lifes: 0,
      coins: 0,
      state: SizeState.small,
      marioState: MarioState.normal,
      musicOn: true,
    };
  }

  reload() {
    const settings = this.defaultSettings();
    this.pause();

    for (let i = this.figures.length; i--; ) {
      this.figures[i].store(settings);
    }

    settings.lifes--;
    this.reset();

    if (settings.lifes < 0) {
      this.load(this.firstLevel());
    } else {
      this.load(this.raw);

      for (let i = this.figures.length; i--; ) {
        this.figures[i].restore(settings);
      }
    }

    this.start();
  }

  nextLevel() {
    return this.raw;
  }

  firstLevel() {
    return this.raw;
  }

  load(level: LevelFormat) {
    this.init();

    if (this.active) {
      if (this.loop) {
        this.pause();
      }

      this.reset();
    }

    this.setSize(level.width * 32, level.height * 32);
    this.setBackground(level.background);
    this.raw = level;
    this.id = level.id;
    this.active = true;
    const data = level.data;

    for (let i = 0; i < level.width; i++) {
      const t: Array<Matter | undefined> = [];

      for (let j = 0; j < level.height; j++) {
        t.push(undefined);
      }

      this.obstacles.push(t);
    }

    for (let i = 0, width = data.length; i < width; i++) {
      const col = data[i];

      for (let j = 0, height = col.length; j < height; j++) {
        const Asset = this.assets[col[j]];

        if (Asset) {
          const item = new Asset(this);
          item.init(i * 32, (height - j - 1) * 32);
        }
      }
    }
  }

  next() {
    this.nextCycles = Math.floor(7000 / setup.interval);
  }

  nextLoad() {
    if (!this.nextCycles) {
      const settings = this.defaultSettings();
      this.pause();

      for (let i = this.figures.length; i--; ) {
        this.figures[i].store(settings);
      }

      this.reset();
      this.load(this.nextLevel());

      for (let i = this.figures.length; i--; ) {
        this.figures[i].restore(settings);
      }

      this.start();
    }
  }

  getGridWidth() {
    return this.raw.width;
  }

  getGridHeight() {
    return this.raw.height;
  }

  setSounds(manager: SoundManager) {
    this.sounds = manager;
  }

  playSound(label: string) {
    if (this.sounds) {
      this.sounds.play(label);
    }
  }

  playMusic(label: string) {
    if (this.sounds) {
      this.sounds.sideMusic(label);
    }
  }

  reset() {
    this.active = false;
    this.world.empty();
    this.figures = [];
    this.obstacles = [];
    this.items = [];
    this.decorations = [];
  }

  tick() {
    if (this.nextCycles) {
      this.nextCycles--;
      this.nextLoad();
      return;
    }

    for (let i = this.figures.length; i--; ) {
      const figure = this.figures[i];

      if (figure.dead) {
        if (!figure.death()) {
          if (figure.player) {
            return this.reload();
          }

          figure.view.remove();
          this.figures.splice(i, 1);
        } else {
          figure.playFrame();
        }
      } else {
        if (i) {
          for (let j = i; j--; ) {
            if (figure.dead) {
              break;
            }

            const opponent = this.figures[j];

            if (!opponent.dead && figure.q2q(opponent)) {
              figure.hit(opponent);
              opponent.hit(figure);
            }
          }
        }
      }

      if (!figure.dead) {
        figure.move();
        figure.playFrame();
      }
    }

    for (let i = this.items.length; i--; ) {
      this.items[i].playFrame();
    }

    this.coinGauge.playFrame();
    this.liveGauge.playFrame();
  }

  start() {
    this.controls.bind();
    this.loop = setInterval(() => {
      this.tick();
    }, setup.interval);
  }

  pause() {
    this.controls.unbind();
    this.loop = clearInterval(this.loop || 0);
  }

  setPosition(x: number, y: number) {
    super.setPosition(x, y);
    this.world.css('left', -x);
  }

  setBackground(index: number) {
    const img = backgrounds[index];
    this.world.parent().css({
      backgroundImage: toUrl(img),
      backgroundPosition: '0 -380px',
    });
    this.setImage(img, 0, 0);
  }

  setSize(width: number, height: number) {
    super.setSize(width, height);
  }

  setParallax(x: number) {
    this.setPosition(x, this.y);
    const pos = Math.floor(x / 3);
    this.world.parent().css('background-position', `-${pos}px -380px`);
  }
}
