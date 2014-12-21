/// <reference path="def/jquery.d.ts"/>

import Base = require('./base');
import constants = require('./constants');
import GroundBlocking = constants.GroundBlocking;

/*
 * -------------------------------------------
 * MATTER CLASS
 * -------------------------------------------
 */
class Matter extends Base {
	blocking: constants.GroundBlocking;
	level: any;

	constructor(x: number, y: number, blocking: constants.GroundBlocking, level: any) {
		this.blocking = blocking;
		this.view = $('<div />').addClass('matter').appendTo(level.world);
		this.level = level;
		super(x, y);
		this.setSize(32, 32);
		this.addToGrid(level);
	}
	addToGrid(level) {
		level.obstacles[this.x / 32][this.level.getGridHeight() - 1 - this.y / 32] = this;
	}
	setImage(img: string, x: number = 0, y: number = 0) {
		this.view.css({
			backgroundImage : img ? img.toUrl() : 'none',
			backgroundPosition : '-' + x + 'px -' + y + 'px',
		});
		super.setImage(img, x, y);
	}
	setPosition(x: number, y: number) {
		this.view.css({
			left: x,
			bottom: y
		});
		super.setPosition(x, y);
	}
};

export = Matter;