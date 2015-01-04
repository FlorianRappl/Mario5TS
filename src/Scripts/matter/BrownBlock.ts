class BrownBlock extends Ground {
	constructor(x: number, y: number, level: Level) {
		var blocking = GroundBlocking.all;
		super(x, y, blocking, level);
		this.setImage(images.objects, 514, 194);
	}
};