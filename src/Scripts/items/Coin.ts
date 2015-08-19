class Coin extends Item {
	constructor(x: number, y: number, level: Level) {
		super(x, y, false, level);
		this.setImage(images.objects, 0, 0);
		this.setupFrames(10, 4, true);
	}
	activate(from: Mario) {
		if (!this.activated) {
			this.level.playSound('coin');
			from.addCoin();
			this.remove();
		}
		super.activate(from);
	}
	remove() {
		this.view.remove();
	}
};