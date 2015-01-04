/// <reference path="def/interfaces.d.ts"/>
/// <reference path="def/Keys.d.ts"/>
/// <reference path="def/jquery.d.ts"/>

String.prototype.toUrl = function() {
	return 'url(' + this + ')';
};

Math.sign = function(x: number) {
	return x > 0 ? 1 : (x < 0 ? - 1 : 0);
};

var assets: any = undefined;

/*
 * -------------------------------------------
 * DOCUMENT READY STARTUP METHOD
 * -------------------------------------------
 */
export function run(levelData: LevelFormat, controls: Keys, sounds?: SoundManager) {
	assets = {
		pipeplant: PipePlant,
		staticplant: StaticPlant,
		greenturtle: GreenTurtle,
		spikedturtle: SpikedTurtle,
		shell: TurtleShell,
		ballmonster: Gumpa,
		mario: Mario,
		pipe_right_grass : RightPipeGrass,
		pipe_left_grass : LeftPipeGrass,
		pipe_right_soil : RightPipeSoil,
		pipe_left_soil : LeftPipeSoil,
		planted_soil_left : LeftPlantedSoil,
		planted_soil_middle : MiddlePlantedSoil,
		planted_soil_right : RightPlantedSoil,
		grass_top_right_rounded_soil : TopRightGrassSoil,
		grass_top_left_rounded_soil : TopLeftGrassSoil,
		bush_right : RightBush,
		bush_middle_right : RightMiddleBush,
		bush_middle : MiddleBush,
		bush_middle_left : LeftMiddleBush,
		bush_left : LeftBush,
		soil : Soil,
		soil_right : RightSoil,
		soil_left : LeftSoil,
		grass_top : TopGrass,
		grass_top_right : TopRightGrass,
		grass_top_left : TopLeftGrass,
		grass_right : RightGrass,
		grass_left : LeftGrass,
		grass_top_right_rounded : TopRightRoundedGrass,
		grass_top_left_rounded : TopLeftRoundedGrass,
		stone : Stone,
		brown_block : BrownBlock,
		pipe_top_right : RightTopPipe,
		pipe_top_left : LeftTopPipe,
		pipe_right : RightPipe,
		pipe_left : LeftPipe,
		grass_top_right_corner : TopRightCornerGrass,
		grass_top_left_corner : TopLeftCornerGrass,
		coin : Coin,
		coinbox : CoinBox,
		multiple_coinbox : MultipleCoinBox,
		starbox : StarBox,
		mushroombox : MushroomBox
	};
	
	var level = new Level('world', controls);
	level.load(levelData);

	if (sounds)
		level.setSounds(sounds);

	level.start();
};