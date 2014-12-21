/// <reference path="def/jquery.d.ts"/>
/// <reference path="def/interfaces.d.ts"/>

import Figure = require('./figure');
import heros = require('./heros');
import Mario = heros.Mario;
import constants = require('./constants');
import MarioState = constants.MarioState;
import DeathMode = constants.DeathMode;
import Direction = constants.Direction;
import SizeState = constants.SizeState;
import GroundBlocking = constants.GroundBlocking;
var images = constants.images;
var setup = constants.setup;

/*
 * -------------------------------------------
 * ENEMY CLASS
 * -------------------------------------------
 */
export class Enemy extends Figure implements DeathAnimation {
	speed: number;
	invisible: boolean;
	deathMode: DeathMode;
	deathStep: number;
	deathCount: number;
	deathDir: number;
	deathFrames: number;
	deathStepUp: number;
	deathStepDown: number;

	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.speed = 0;
		this.deathMode = DeathMode.normal;
		this.deathCount = 0;
	}
	hide() {
		this.invisible = true;
		this.view.hide();
	}
	show() {	
		this.invisible = false;
		this.view.show();
	}
	move() {
		if (!this.invisible) {
			super.move();
		
			if (this.vx === 0) {
				var s = this.speed * Math.sign(this.speed);
				this.setVelocity(this.direction === Direction.right ? -s : s, this.vy);
			}
		}
	}
	collides(is: number, ie: number, js: number, je: number, blocking: GroundBlocking) {
		if (this.j + 1 < this.level.getGridHeight()) {
			for (var i = is; i <= ie; i++) {
				if (i < 0 || i >= this.level.getGridWidth())
					return true;
					
				var obj = this.level.obstacles[i][this.j + 1];
				
				if (!obj || (obj.blocking & GroundBlocking.top) !== GroundBlocking.top)
					return true;
			}
		}
		
		return super.collides(is, ie, js, je, blocking);
	}
	setSpeed(v: number) {
		this.speed = v;
		this.setVelocity(-v, 0);
	}
	hurt(from: Enemy) {
		if (from instanceof TurtleShell)
			this.deathMode = DeathMode.shell;

		this.die();
	}
	hit(opponent: Enemy) {
		if (this.invisible)
			return;
			
		if (opponent instanceof Mario) {
			if (opponent.vy < 0 && opponent.y - opponent.vy >= this.y + this.state * 32) {
				opponent.setVelocity(opponent.vx, setup.bounce);
				this.hurt(opponent);
			} else {
				opponent.hurt(this);
			}
		}
	}
};

/*
 * -------------------------------------------
 * GUMPA CLASS
 * -------------------------------------------
 */
export class Gumpa extends Enemy {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setSize(34, 32);
		this.setSpeed(setup.ballmonster_v);
	}
	setVelocity(vx: number, vy: number) {
		super.setVelocity(vx, vy);
		
		if (this.direction === Direction.left) {
			if (!this.setupFrames(6, 2, false, 'LeftWalk'))
				this.setImage(images.enemies, 34, 188);
		} else {
			if (!this.setupFrames(6, 2, true, 'RightWalk'))
				this.setImage(images.enemies, 0, 228);
		}
	}
	death() {
		if (this.deathMode === DeathMode.normal)
			return !!(--this.deathCount);
		
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + this.deathStep + 'px' });
		this.deathCount += this.deathDir;
		
		if (this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if (this.deathCount === 0)
			return false;
			
		return true;
	}
	die() {
		this.clearFrames();
		
		if (this.deathMode === DeathMode.normal) {
			this.level.playSound('enemy_die');
			this.setImage(images.enemies, 102, 228);
			this.deathCount = Math.ceil(600 / setup.interval);
		} else if (this.deathMode === DeathMode.shell) {
			this.level.playSound('shell');
			this.setImage(images.enemies, 68, this.direction === Direction.right ? 228 : 188);
			this.deathFrames = Math.floor(250 / setup.interval);
			this.deathDir = 1;
			this.deathStep = Math.ceil(150 / this.deathFrames);
		}
		
		super.die();
	}
};

/*
 * -------------------------------------------
 * TURTLESHELL CLASS
 * -------------------------------------------
 */
export class TurtleShell extends Enemy {
	idle: number;
	
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setSize(34, 32);
		this.speed = 0;
		this.setImage(images.enemies, 0, 494);
	}
	activate(x: number, y: number) {
		this.setupFrames(6, 4, false)
		this.setPosition(x, y);
		this.show();
	}
	takeBack(where: Turtle) {
		if (where.setShell(this))
			this.clearFrames();
	}
	hit(opponent: Figure) {
		if (this.invisible)
			return;
			
		if (this.vx) {
			if (this.idle)
				this.idle--;
			else
				opponent.hurt(this);
		} else {
			if (opponent instanceof Mario) {
				this.setSpeed(opponent.direction === Direction.right ? -setup.shell_v : setup.shell_v);
				opponent.setVelocity(opponent.vx, setup.bounce);
				this.idle = 2;
			} else if (opponent instanceof GreenTurtle && opponent.state === SizeState.small)
				this.takeBack(<GreenTurtle>opponent);
		}
	}
	collides(is: number, ie: number, js: number, je: number, blocking: GroundBlocking) {		
		if (is < 0 || ie >= this.level.obstacles.length)
			return true;
			
		if (js < 0 || je >= this.level.getGridHeight())
			return false;
			
		for (var i = is; i <= ie; i++) {
			for (var j = je; j >= js; j--) {
				var obj = this.level.obstacles[i][j];
				
				if (obj && ((obj.blocking & blocking) === blocking))
					return true;
			}
		}
		
		return false;
	}
};

export class Turtle extends Enemy {
	shell: TurtleShell;

	constructor(x: number, y: number, level: any) {
		super(x, y, level);
	}
	setShell(shell: TurtleShell) {
		return false;
	}
};

/*
 * -------------------------------------------
 * GREENTURTLE CLASS
 * -------------------------------------------
 */
export class GreenTurtle extends Turtle {
	wait: number;
	walkSprites: Point[][];

	constructor(x: number, y: number, level: any) {
		this.walkSprites = [
			[{ x : 34, y : 382 },{ x : 0, y : 437 }],
			[{ x : 34, y : 266 },{ x : 0, y : 325 }]
		];
		super(x, y, level);
		this.wait = 0;
		this.deathMode = DeathMode.normal;
		this.deathFrames = Math.floor(250 / setup.interval);
		this.deathStepUp = Math.ceil(150 / this.deathFrames);
		this.deathStepDown = Math.ceil(182 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
		this.setSize(34, 54);
		this.setShell(new TurtleShell(x, y, level));
	}
	setShell(shell: TurtleShell) {
		if (this.shell || this.wait)
			return false;
			
		this.shell = shell;
		shell.hide();
		this.setState(SizeState.big);
		return true;
	}
	setState(state: SizeState) {
		super.setState(state);
		
		if (state === SizeState.big)
			this.setSpeed(setup.big_turtle_v);
		else
			this.setSpeed(setup.small_turtle_v);
	}
	setVelocity(vx: number, vy: number) {
		super.setVelocity(vx, vy);
		var rewind = this.direction === Direction.right;
		var coords = this.walkSprites[this.state - 1][rewind ? 1 : 0];
		var label = Math.sign(vx) + '-' + this.state;
		
		if (!this.setupFrames(6, 2, rewind, label))
			this.setImage(images.enemies, coords.x, coords.y);
	}
	die() {
		super.die();
		this.clearFrames();
		
		if (this.deathMode === DeathMode.normal) {
			this.deathFrames = Math.floor(600 / setup.interval);
			this.setImage(images.enemies, 102, 437);
		} else if (this.deathMode === DeathMode.shell) {
			this.level.playSound('shell');
			this.setImage(images.enemies, 68, (this.state === SizeState.small ? (this.direction === Direction.right ? 437 : 382) : 325));
		}
	}
	death() {
		if (this.deathMode === DeathMode.normal)
			return !!(--this.deathFrames);
			
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
		this.deathCount += this.deathDir;
		
		if (this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if (this.deathCount === 0)
			return false;
			
		return true;
	}
	move() {
		if (this.wait)
			this.wait--;
			
		super.move();
	}
	hurt(opponent: Figure) {	
		this.level.playSound('enemy_die');
		
		if (this.state === SizeState.small)
			return this.die();
		
		this.wait = setup.shell_wait
		this.setState(SizeState.small);
		this.shell.activate(this.x, this.y);
		this.shell = undefined;
	}
};

/*
 * -------------------------------------------
 * SPIKEDTURTLE CLASS
 * -------------------------------------------
 */
export class SpikedTurtle extends Turtle {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setSize(34, 32);
		this.setSpeed(setup.spiked_turtle_v);
		this.deathFrames = Math.floor(250 / setup.interval);
		this.deathStepUp = Math.ceil(150 / this.deathFrames);
		this.deathStepDown = Math.ceil(182 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
	}
	setVelocity(vx: number, vy: number) {
		super.setVelocity(vx, vy);
		
		if (this.direction === Direction.left) {
			if (!this.setupFrames(4, 2, true, 'LeftWalk'))
				this.setImage(images.enemies, 0, 106);
		} else {
			if (!this.setupFrames(6, 2, false, 'RightWalk'))
				this.setImage(images.enemies, 34, 147);
		}
	}
	death() {
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
		this.deathCount += this.deathDir;
		
		if(this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if(this.deathCount === 0)
			return false;
			
		return true;
	}
	die() {
		this.level.playSound('shell');
		this.clearFrames();
		super.die();
		this.setImage(images.enemies, 68, this.direction === Direction.left ? 106 : 147);
	}
	hit(opponent: Enemy) {
		if (this.invisible)
			return;
			
		if (opponent instanceof Mario)
			opponent.hurt(this);
	}
};

/*
 * -------------------------------------------
 * PLANT CLASS
 * -------------------------------------------
 */
export class Plant extends Enemy {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setSize(34, 42);
		this.setupFrames(5, 2, true);
		this.setImage(images.enemies, 0, 3);
	}
	setVelocity(vx: number, vy: number) {
		super.setVelocity(0, 0);
	}
	die() {
		this.level.playSound('shell');
		this.clearFrames();
		super.die();
	}
	hit(opponent: Figure) {
		if (this.invisible)
			return;
			
		if (opponent instanceof Mario)
			opponent.hurt(this);
	}
};

/*
 * -------------------------------------------
 * STATICPLANT CLASS
 * -------------------------------------------
 */
export class StaticPlant extends Plant {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.deathFrames = Math.floor(250 / setup.interval);
		this.deathStepUp = Math.ceil(100 / this.deathFrames);
		this.deathStepDown = Math.ceil(132 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
	}
	die() {
		super.die();
		this.setImage(images.enemies, 68, 3);
	}
	death() {
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + (this.deathDir > 0 ? this.deathStepUp : this.deathStepDown) + 'px' });
		this.deathCount += this.deathDir;
		
		if (this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if (this.deathCount === 0)
			return false;
			
		return true;
	}
};

/*
 * -------------------------------------------
 * PIPEPLANT CLASS
 * -------------------------------------------
 */
export class PipePlant extends Plant {
	deathFramesExtended: number;
	deathFramesExtendedActive: boolean;
	minimum: number;
	bottom: number;
	top: number;

	constructor(x: number, y: number, level: any) {
		this.bottom = y - 48;
		this.top = y - 6;
		super(x + 16, y - 6, level);
		this.setDirection(Direction.down);
		this.setImage(images.enemies, 0, 56);
		this.deathFrames = Math.floor(250 / setup.interval);
		this.deathFramesExtended = 6;
		this.deathFramesExtendedActive = false;
		this.deathStep = Math.ceil(100 / this.deathFrames);
		this.deathDir = 1;
		this.deathCount = 0;
		this.view.css('z-index', 95);
	}
	setDirection(dir: Direction) {
		this.direction = dir;
	}
	setPosition(x: number, y: number) {
		if (y === this.bottom || y === this.top) {
			this.minimum = setup.pipeplant_count;
			this.setDirection(this.direction === Direction.up ? Direction.down : Direction.up);
		}
		
		super.setPosition(x, y);
	}
	blocked() {
		if (this.y === this.bottom) {
			var state = false;
			this.y += 48;
			
			for (var i = this.level.figures.length; i--; ) {
				if (this.level.figures[i] != this && this.q2q(this.level.figures[i])) {
					state = true;
					break;
				}
			}
			
			this.y -= 48;
			return state;
		}
		
		return false;
	}
	move() {
		if (this.minimum === 0) {
			if(!this.blocked())
				this.setPosition(this.x, this.y - (this.direction - 3) * setup.pipeplant_v);
		} else
			this.minimum--;
	}
	die() {		
		super.die();
		this.setImage(images.enemies, 68, 56);
	}
	death() {
		if (this.deathFramesExtendedActive) {
			this.setPosition(this.x, this.y - 8);
			return !!(--this.deathFramesExtended);
		}
		
		this.view.css({ 'bottom' : (this.deathDir > 0 ? '+' : '-') + '=' + this.deathStep + 'px' });
		this.deathCount += this.deathDir;
		
		if (this.deathCount === this.deathFrames)
			this.deathDir = -1;
		else if (this.deathCount === 0)
			this.deathFramesExtendedActive = true;
			
		return true;
	}
};