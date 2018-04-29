import { Enemy } from './Enemy';
import { TurtleShell } from './TurtleShell';
import { Level } from '../engine/Level';

export class Turtle extends Enemy {
  house?: TurtleShell;

  constructor(level: Level) {
    super(level);
  }

  setShell(_shell: TurtleShell) {
    return false;
  }
}
