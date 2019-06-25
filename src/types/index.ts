export interface Settings {
	state: number;
	marioState: number;
	lifes: number;
	coins: number;
	musicOn: boolean;
}

export interface BaseItem {
  x: number;
  y: number;
}

export interface StateItem extends BaseItem {
  vx: number;
  vy: number;
  dx: number;
  dy: number;
  cw: number;
  ch: number;
  player: boolean;
  shellHost: boolean;
  dead: boolean;
  death(): boolean;
  die(): void;
  playFrame(): void;
  store(settings: Partial<Settings>): void;
  restore(settings: Settings): void;
  view: any;
  hit(other: StateItem): void;
  q2q(other: StateItem): boolean;
  move(): void;
  bounce(dx: number, dy: number): void;
}

export interface LevelFormat {
	width: number;
	height: number;
	id: number;
	background: number;
	data: Array<Array<string>>;
}

export interface Point {
	x: number;
	y: number;
}

export interface GridPoint {
	i: number;
	j: number;
}

export interface Size {
	width: number;
	height: number;
}

export interface Picture extends Point {
	path: string;
}

export interface SoundManager {
	play(label: string): void;
	sideMusic(label: string): void;
}

export interface DeathAnimation {
	deathDir: number;
	deathFrames: number;
	deathStepUp: number;
	deathStepDown: number;
	deathCount: number;
}

export interface Keys {
	bind(): void;
	reset(): void;
	unbind(): void;
	handler(event: KeyboardEvent, status: boolean): void;
	accelerate: boolean;
	left: boolean;
	up: boolean;
	right: boolean;
	down: boolean;
}
