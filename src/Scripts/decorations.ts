import Matter = require('./matter');
import constants = require('./constants');
import GroundBlocking = constants.GroundBlocking;
var images = constants.images;

/*
 * -------------------------------------------
 * DECORATION CLASS
 * -------------------------------------------
 */
export class Decoration extends Matter {
	constructor(x: number, y: number, level: any) {
		super(x, y, GroundBlocking.none, level);
		level.decorations.push(this);
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

/*
 * -------------------------------------------
 * DECORATION GRASS CLASSES
 * -------------------------------------------
 */
export class TopRightCornerGrass extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 612, 868);
	}
};
export class TopLeftCornerGrass extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 648, 868);
	}
};

/*
 * -------------------------------------------
 * SOIL CLASSES
 * -------------------------------------------
 */
export class Soil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 888, 438);
	}
};
export class RightSoil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 922, 540);
	}
};
export class LeftSoil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 854,540);
	}
};

/*
 * -------------------------------------------
 * BUSH CLASSES
 * -------------------------------------------
 */
export class RightBush extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 382, 928);
	}
};
export class RightMiddleBush extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 314, 928);
	}
};
export class MiddleBush extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 348, 928);
	}
};
export class LeftMiddleBush extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 212, 928);
	}
};
export class LeftBush extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 178, 928);
	}
};

/*
 * -------------------------------------------
 * GRASS-SOIL CLASSES
 * -------------------------------------------
 */
export class TopRightGrassSoil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 990, 506);
	}
};
export class TopLeftGrassSoil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 956, 506);
	}
};

/*
 * -------------------------------------------
 * PLANTED SOIL CLASSES
 * -------------------------------------------
 */
export class RightPlantedSoil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 782, 832);
	}
};
export class MiddlePlantedSoil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 748, 832);
	}
};
export class LeftPlantedSoil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 714, 832);
	}
};

/*
 * -------------------------------------------
 * PIPE DECORATION
 * -------------------------------------------
 */
export class RightPipeGrass extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 36, 424);
	}
};
export class LeftPipeGrass extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 2, 424);
	}
};
export class RightPipeSoil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 36, 458);
	}
};
export class LeftPipeSoil extends Decoration {
	constructor(x: number, y: number, level: any) {
		super(x, y, level);
		this.setImage(images.objects, 2, 458);
	}
};