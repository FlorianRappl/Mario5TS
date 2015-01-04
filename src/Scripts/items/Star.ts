class Star extends ItemFigure {
	active: boolean;
	taken: number;

	constructor(x: number, y: number, level: any) {
		super(x, y + 32, level);
		this.active = false;
		this.setSize(32, 32);
		this.setImage(images.objects, 32, 69);
		this.view.hide();
	}
	release() {
		this.taken = 4;
		this.active = true;
		this.level.playSound('mushroom');
		this.view.show();
		this.setVelocity(setup.star_vx, setup.star_vy);
		this.setupFrames(10, 2, false);
	}
	collides(is: number, ie: number, js: number, je: number, blocking: GroundBlocking) {
		return false;
	}
	move() {
		if (this.active) {
			this.vy += this.vy <= -setup.star_vy ? setup.gravity : setup.gravity / 2;
			super.move();
		}
		
		if (this.taken)
			this.taken--;
	}
	hit(opponent) {
		if (!this.taken && this.active && opponent instanceof Mario) {
			opponent.invincible();
			this.die();
		}
	}
};