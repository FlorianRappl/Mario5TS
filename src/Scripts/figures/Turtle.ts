class Turtle extends Enemy {
	shell: TurtleShell;

	constructor(x: number, y: number, level: Level) {
		super(x, y, level);
	}
	setShell(shell: TurtleShell) {
		return false;
	}
};