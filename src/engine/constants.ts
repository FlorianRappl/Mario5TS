import enemies from '../Assets/mario-enemies.png';
import sprites from '../Assets/mario-sprites.png';
import objects from '../Assets/mario-objects.png';
import peach from '../Assets/mario-peach.png';
import background1 from '../Assets/backgrounds/01.png';
import background2 from '../Assets/backgrounds/02.png';
import background3 from '../Assets/backgrounds/03.png';
import background4 from '../Assets/backgrounds/04.png';
import background5 from '../Assets/backgrounds/05.png';
import background6 from '../Assets/backgrounds/06.png';
import background7 from '../Assets/backgrounds/07.png';
import background8 from '../Assets/backgrounds/08.png';

export enum Direction {
  none = 0,
  left = 1,
  up = 2,
  right = 3,
  down = 4,
}

export enum MarioState {
  normal = 0,
  fire = 1,
}

export enum SizeState {
  small = 1,
  big = 2,
}

export enum GroundBlocking {
  none = 0,
  left = 1,
  top = 2,
  right = 4,
  bottom = 8,
  all = 15,
}

export enum CollisionType {
  none = 0,
  horizontal = 1,
  vertical = 2,
}

export enum DeathMode {
  normal = 0,
  shell = 1,
}

export enum MushroomMode {
  mushroom = 0,
  plant = 1,
}

export const backgrounds = [
  background1,
  background2,
  background3,
  background4,
  background5,
  background6,
  background7,
  background8,
];

export const images = {
  enemies,
  sprites,
  objects,
  peach,
};

export const setup = {
  interval: 20,
  bounce: 15,
  cooldown: 20,
  gravity: 2,
  start_lives: 3,
  max_width: 400,
  max_height: 15,
  jumping_v: 27,
  walking_v: 5,
  mushroom_v: 3,
  ballmonster_v: 2,
  spiked_turtle_v: 1.5,
  small_turtle_v: 3,
  big_turtle_v: 2,
  shell_v: 10,
  shell_wait: 25,
  star_vx: 4,
  star_vy: 16,
  bullet_v: 12,
  max_coins: 100,
  pipeplant_count: 150,
  pipeplant_v: 1,
  invincible: 11000,
  invulnerable: 1000,
  blinkfactor: 5,
};
