import Figure = require('./figure');
import heros = require('./heros');
import Mario = heros.Mario;
import constants = require('./constants');
import GroundBlocking = constants.GroundBlocking;
import MushroomMode = constants.MushroomMode;
import Direction = constants.Direction;
var images = constants.images;
var setup = constants.setup;

/*
 * -------------------------------------------
 * ITEMFIGURE CLASS
 * -------------------------------------------
 */
export class ItemFigure extends Figure {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
	}
};

export class Star extends ItemFigure {
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

export class Mushroom extends ItemFigure {
	mode: MushroomMode;
	active: boolean;
	released: number;

	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.active = false;
		this.setSize(32, 32);
		this.setImage(images.objects, 582, 60);
		this.released = 0;
		this.view.css('z-index', 94).hide();
	}
	release(mode) {
		this.released = 4;
		this.level.playSound('mushroom');
		
		if (mode === MushroomMode.plant)
			this.setImage(images.objects, 548, 60);
			
		this.mode = mode;
		this.view.show();
	}
	move() {
		if(this.active) {
			super.move();
		
			if (this.mode === MushroomMode.mushroom && this.vx === 0)
				this.setVelocity(this.direction === Direction.right ? -setup.mushroom_v : setup.mushroom_v, this.vy);
		} else if (this.released) {
			this.released--;
			this.setPosition(this.x, this.y + 8);
			
			if (!this.released) {
				this.active = true;
				this.view.css('z-index', 99);
				
				if (this.mode === MushroomMode.mushroom)
					this.setVelocity(setup.mushroom_v, setup.gravity);
			}
		}
	}
	hit(opponent) {
		if (this.active && opponent instanceof Mario) {
			if (this.mode === MushroomMode.mushroom)
				opponent.grow();
			else if (this.mode === MushroomMode.plant)
				opponent.shooter();
				
			this.die();
		}
	}
};