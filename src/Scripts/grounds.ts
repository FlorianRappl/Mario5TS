import Matter = require('./matter');
import constants = require('./constants');
import GroundBlocking = constants.GroundBlocking;
var images = constants.images;

/*
 * -------------------------------------------
 * GROUND CLASS
 * -------------------------------------------
 */
export class Ground extends Matter {
	constructor(x: number, y: number, blocking: GroundBlocking, level: any) {
		super(x, y, blocking, level);
	}
};

/*
 * -------------------------------------------
 * GRASS CLASSES
 * -------------------------------------------
 */
export class TopGrass extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.top;
		super(x, y, blocking, level);
		this.setImage(images.objects, 888, 404);
	}
};
export class TopRightGrass extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.top + GroundBlocking.right;
		super(x, y, blocking, level);
		this.setImage(images.objects, 922, 404);
	}
};
export class TopLeftGrass extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.left + GroundBlocking.top;
		super(x, y, blocking, level);
		this.setImage(images.objects, 854, 404);
	}
};
export class RightGrass extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.right;
		super(x, y, blocking, level);
		this.setImage(images.objects, 922, 438);
	}
};
export class LeftGrass extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.left;
		super(x, y, blocking, level);
		this.setImage(images.objects, 854, 438);
	}
};
export class TopRightRoundedGrass extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.top;
		super(x, y, blocking, level);
		this.setImage(images.objects, 922, 506);
	}
};
export class TopLeftRoundedGrass extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.top;
		super(x, y, blocking, level);
		this.setImage(images.objects, 854, 506);
	}
};

/*
 * -------------------------------------------
 * STONE CLASSES
 * -------------------------------------------
 */
export class Stone extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.all;
		super(x, y, blocking, level);
		this.setImage(images.objects, 550, 160);
	}
};
export class BrownBlock extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.all;
		super(x, y, blocking, level);
		this.setImage(images.objects, 514, 194);
	}
};

/*
 * -------------------------------------------
 * PIPE CLASSES
 * -------------------------------------------
 */
export class RightTopPipe extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.all;
		super(x, y, blocking, level);
		this.setImage(images.objects, 36, 358);
	}
};
export class LeftTopPipe extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.all;
		super(x, y, blocking, level);
		this.setImage(images.objects, 2, 358);
	}
};
export class RightPipe extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.right + GroundBlocking.bottom;
		super(x, y, blocking, level);
		this.setImage(images.objects, 36, 390);
	}
};
export class LeftPipe extends Ground {
	constructor(x: number, y: number, level: any) {
		var blocking = GroundBlocking.left + GroundBlocking.bottom;
		super(x, y, blocking, level);
		this.setImage(images.objects, 2, 390);
	}
};