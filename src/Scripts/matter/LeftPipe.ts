class LeftPipe extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.left + GroundBlocking.bottom;
		super(x, y, blocking, level);
		this.setImage(images.objects, 2, 390);
	}
};