class Ground extends Matter {
	constructor(x: number, y: number, blocking: GroundBlocking, level: Level) {
		super(x, y, blocking, level);
	}
};