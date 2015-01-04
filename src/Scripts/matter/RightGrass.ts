class RightGrass extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.right;
		super(x, y, blocking, level);
		this.setImage(images.objects, 922, 438);
	}
};