class Soil extends Decoration {
	constructor(x: number, y: number, level: Level) {
		super(x, y, level);
		this.setImage(images.objects, 888, 438);
	}
};