import Matter = require('./matter');
import Figure = require('./figure');
import itemfigures = require('./itemfigures');
import ItemFigure = itemfigures.ItemFigure;
import Star = itemfigures.Star;
import Mushroom = itemfigures.Mushroom;
import constants = require('./constants');
import Direction = constants.Direction;
import SizeState = constants.SizeState;
import MushroomMode = constants.MushroomMode;
import GroundBlocking = constants.GroundBlocking;
var images = constants.images;
var setup = constants.setup;

/*
 * -------------------------------------------
 * ITEM CLASS
 * -------------------------------------------
 */
export class Item extends Matter {
	isBouncing: boolean;
	bounceFrames: number;
	bounceStep: number;
	bounceDir: number;
	bounceCount: number;
	activated: boolean;
	isBlocking: boolean;

	constructor(x: number, y: number, isBlocking: boolean, level: any) {
		this.isBouncing = false;
		this.bounceCount = 0;
		this.bounceFrames = Math.floor(50 / setup.interval);
		this.bounceStep = Math.ceil(10 / this.bounceFrames);
		this.bounceDir = 1;
		this.isBlocking = isBlocking;
		super(x, y, isBlocking ? GroundBlocking.all : GroundBlocking.none, level);
		this.activated = false;
		this.addToany(level);
	}
	addToany(level: any) {
		level.items.push(this);
	}
	activate(from: any) {
		this.activated = true;
	}
	takeItem(from: Figure) {
		from.trigger(this);
	}
	bounce() {
		this.isBouncing = true;
		
		for (var i = this.level.figures.length; i--; ) {
			var fig = this.level.figures[i];
			
			if (fig.y === this.y + 32 && fig.x >= this.x - 16 && fig.x <= this.x + 16) {
				if (fig instanceof ItemFigure)
					fig.setVelocity(fig.vx, setup.bounce);
				else
					fig.die();
			}
		}
	}
	playFrame() {
		if (this.isBouncing) {
			this.view.css({ 'bottom' : (this.bounceDir > 0 ? '+' : '-') + '=' + this.bounceStep + 'px' });
			this.bounceCount += this.bounceDir;
			
			if (this.bounceCount === this.bounceFrames)
				this.bounceDir = -1;
			else if (this.bounceCount === 0) {
				this.bounceDir = 1;
				this.isBouncing = false;
			}
		}
		
		super.playFrame();
	}
};

/*
 * -------------------------------------------
 * COIN CLASSES
 * -------------------------------------------
 */
export class Coin extends Item {
	constructor(x: number, y: number, level: any) {
		super(x, y, false, level);
		this.setImage(images.objects, 0, 0);
		this.setupFrames(10, 4, true);
	}
	activate(from: any) {
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
export class CoinBoxCoin extends Coin {
	count: number;
	step: number;

	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 96, 0);
		this.clearFrames();
		this.view.hide();
		this.count = 0;
		this.frames = Math.floor(150 / setup.interval);
		this.step = Math.ceil(30 / this.frames);
	}
	remove() { }
	addToGrid() { }
	addToany() { }
	activate(from: any) {
		super.activate(from);
		this.view.show().css({ 'bottom' : '+=8px' });
	}
	act() {
		this.view.css({ 'bottom' : '+=' + this.step + 'px' });
		this.count++;
		return (this.count === this.frames);
	}
};
export class CoinBox extends Item {
	items: CoinBoxCoin[];
	actors: CoinBoxCoin[];

	constructor(x: number, y: number, level: any, amount: number = 1) {
		super(x, y, true, level);
		this.setImage(images.objects, 346, 328);
		this.setAmount(amount);
	}
	setAmount(amount: number) {
		this.items = [];
		this.actors = [];
		
		for (var i = 0; i < amount; i++)
			this.items.push(new CoinBoxCoin(this.x, this.y, this.level));
	}
	activate(from) {
		if (!this.isBouncing) {
			if (this.items.length) {
				this.bounce();
				var coin = this.items.pop();
				coin.activate(from);
				this.actors.push(coin);
				
				if (!this.items.length)
					this.setImage(images.objects, 514, 194);
			}
		}
			
		super.activate(from);
	}
	playFrame() {
		for (var i = this.actors.length; i--; ) {
			if (this.actors[i].act()) {
				this.actors[i].view.remove();
				this.actors.splice(i, 1);
			}
		}
		
		super.playFrame();
	}
};
export class MultipleCoinBox extends CoinBox {
	constructor(x: number, y: number, level: any) {
		super(x, y, level, 8);
	}
};

/*
 * -------------------------------------------
 * STARBOX CLASS
 * -------------------------------------------
 */
export class StarBox extends Item {
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

/*
 * -------------------------------------------
 * MUSHROOMBOX CLASS
 * -------------------------------------------
 */
export class MushroomBox extends Item {
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