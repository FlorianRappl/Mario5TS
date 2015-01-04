class Ground extends Matter {
	constructor(x: number, y: number, blocking: GroundBlocking, level: any) {
		super(x, y, blocking, level);
	}
};