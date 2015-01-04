class Turtle extends Enemy {
	shell: TurtleShell;

	constructor(x: number, y: number, level: any) {
		super(x, y, level);
	}
	setShell(shell: TurtleShell) {
		return false;
	}
};