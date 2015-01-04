class StarBox extends Item {
	star: Star;
	
	constructor(x: number, y: number, level: any) {
		super(x, y, true, level);
		this.setImage(images.objects, 96, 33);
		this.star = new Star(x, y, level);
		this.setupFrames(8, 4, false);
	}
	activate(from: any) {
		if (!this.activated) {
			this.star.release();
			this.clearFrames();
			this.bounce();
			this.setImage(images.objects, 514, 194);
		}
		
		super.activate(from);
	}
};