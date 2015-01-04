class MushroomBox extends Item {
	max_mode: MushroomMode;
	mushroom: Mushroom;

	constructor(x: number, y: number, level: any) {
		super(x, y, true, level);
		this.setImage(images.objects, 96, 33);
		this.max_mode = MushroomMode.plant;
		this.mushroom = new Mushroom(x, y, level);
		this.setupFrames(8, 4, false);
	}
	activate(from: any) {
		if (!this.activated) {
			if (from.state === SizeState.small || this.max_mode === MushroomMode.mushroom)
				this.mushroom.release(MushroomMode.mushroom);
			else
				this.mushroom.release(MushroomMode.plant);
			
			this.clearFrames();
			this.bounce();
			this.setImage(images.objects, 514, 194);
		}
			
		super.activate(from);
	}
};