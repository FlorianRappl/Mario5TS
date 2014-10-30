interface Math {
	sign(x: number): number;
}

interface Settings {
	state?: number;
	marioState?: number;
	lifes?: number;
	coins?: number;
}

interface LevelFormat {
	width: number;
	height: number;
	id: number;
	background: number;
	data: string[][];
}

interface Keys {
	bind(): void;
	reset(): void;
	unbind(): void;
	handler(event: any, status: boolean): void;
	accelerate: boolean;
	left: boolean;
	up: boolean;
	right: boolean;
	down: boolean;
}

interface Point {
	x: number;
	y: number;
}