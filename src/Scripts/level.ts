/// <reference path="def/jquery.d.ts"/>
/// <reference path="def/interfaces.d.ts"/>

import Base = require('./base');
import Gauge = require('./gauge');
import Matter = require('./matter');
import Figure = require('./figure');
import decorations = require('./decorations');
import grounds = require('./grounds');
import items = require('./items');
import enemys = require('./enemys');
import heros = require('./heros');
import constants = require('./constants');
import Item = items.Item;
import Mario = heros.Mario;
var setup = constants.setup;
var assets = {
	pipeplant: enemys.PipePlant,
	staticplant: enemys.StaticPlant,
	greenturtle: enemys.GreenTurtle,
	spikedturtle: enemys.SpikedTurtle,
	shell: enemys.TurtleShell,
	ballmonster: enemys.Gumpa,
	mario: heros.Mario,
	pipe_right_grass : decorations.RightPipeGrass,
	pipe_left_grass : decorations.LeftPipeGrass,
	pipe_right_soil : decorations.RightPipeSoil,
	pipe_left_soil : decorations.LeftPipeSoil,
	planted_soil_left : decorations.LeftPlantedSoil,
	planted_soil_middle : decorations.MiddlePlantedSoil,
	planted_soil_right : decorations.RightPlantedSoil,
	grass_top_right_rounded_soil : decorations.TopRightGrassSoil,
	grass_top_left_rounded_soil : decorations.TopLeftGrassSoil,
	bush_right : decorations.RightBush,
	bush_middle_right : decorations.RightMiddleBush,
	bush_middle : decorations.MiddleBush,
	bush_middle_left : decorations.LeftMiddleBush,
	bush_left : decorations.LeftBush,
	soil : decorations.Soil,
	soil_right : decorations.RightSoil,
	soil_left : decorations.LeftSoil,
	grass_top : grounds.TopGrass,
	grass_top_right : grounds.TopRightGrass,
	grass_top_left : grounds.TopLeftGrass,
	grass_right : grounds.RightGrass,
	grass_left : grounds.LeftGrass,
	grass_top_right_rounded : grounds.TopRightRoundedGrass,
	grass_top_left_rounded : grounds.TopLeftRoundedGrass,
	stone : grounds.Stone,
	brown_block : grounds.BrownBlock,
	pipe_top_right : grounds.RightTopPipe,
	pipe_top_left : grounds.LeftTopPipe,
	pipe_right : grounds.RightPipe,
	pipe_left : grounds.LeftPipe,
	grass_top_right_corner : decorations.TopRightCornerGrass,
	grass_top_left_corner : decorations.TopLeftCornerGrass,
	coin : items.Coin,
	coinbox : items.CoinBox,
	multiple_coinbox : items.MultipleCoinBox,
	starbox : items.StarBox,
	mushroombox : items.MushroomBox
};

/*
 * -------------------------------------------
 * LEVEL CLASS
 * -------------------------------------------
 */
class Level extends Base {
	world: JQuery;
	figures: Figure[];
	obstacles: Matter[][];
	decorations: Matter[];
	items: Item[];
	lifes: number;
	liveGauge: Gauge;
	coinGauge: Gauge;
	active: boolean;
	nextCycles: number;
	loop: number;
	sounds: SoundManager;
	raw: LevelFormat;
	id: number;
	controls: Keys;

	constructor(id: string, controls: Keys) {
		this.world = $('#' + id);
		this.controls = controls;
		this.nextCycles = 0;
		super(0, 0);
		this.active = false;
		this.figures = [];
		this.obstacles = [];
		this.decorations = [];
		this.items = [];
		this.coinGauge = new Gauge('coin', 0, 0, 10, 4, true);
		this.liveGauge = new Gauge('live', 0, 430, 6, 6, true);
	}
	reload() {
		var settings: Settings = { };
		this.pause();
		
		for (var i = this.figures.length; i--; ) {
			this.figures[i].store(settings);
		}

		settings.lifes--;
		this.reset();
		
		if (settings.lifes < 0) {
			this.load(this.firstLevel());
		} else {		
			this.load(this.raw);
			
			for (var i = this.figures.length; i--; ) {
				this.figures[i].restore(settings);
			}
		}
		
		this.start();
	}
	nextLevel() {
		return this.raw;
	}
	firstLevel() {
		return this.raw;
	}
	load(level: LevelFormat) {
		if (this.active) {
			if (this.loop)
				this.pause();

			this.reset();
		}
			
		this.setPosition(0, 0);
		this.setSize(level.width * 32, level.height * 32);
		this.setBackground(level.background);
		this.raw = level;
		this.id = level.id;
		this.active = true;
		var data = level.data;
		
		for (var i = 0; i < level.width; i++) {
			var t = [];
			
			for (var j = 0; j < level.height; j++)
				t.push(undefined);
			
			this.obstacles.push(t);
		}
		
		for (var i = 0, width = data.length; i < width; i++) {
			var col = data[i];
			
			for (var j = 0, height = col.length; j < height; j++) {
				if (assets[col[j]])
					new (assets[col[j]])(i * 32, (height - j - 1) * 32, this);
			}
		}
	}
	next() {
		this.nextCycles = Math.floor(7000 / setup.interval);
	}
	nextLoad() {
		if (this.nextCycles)
			return;
		
		var settings : Settings = {};
		this.pause();
		
		for (var i = this.figures.length; i--; ) {
			this.figures[i].store(settings);
		}
		
		this.reset();
		this.load(this.nextLevel());
		
		for (var i = this.figures.length; i--; ) {
			this.figures[i].restore(settings);
		}
		
		this.start();
	}
	getGridWidth() {
		return this.raw.width;
	}
	getGridHeight() {
		return this.raw.height;
	}
	setSounds(manager: SoundManager) {
		this.sounds = manager;
	}
	playSound(label: string) {
		if (this.sounds)
			this.sounds.play(label);
	}
	playMusic(label: string) {
		if (this.sounds)
			this.sounds.sideMusic(label);
	}
	reset() {
		this.active = false;
		this.world.empty();
		this.figures = [];
		this.obstacles = [];
		this.items = [];
		this.decorations = [];
	}
	tick() {
		if (this.nextCycles) {
			this.nextCycles--;
			this.nextLoad();			
			return;
		}
		
		var i = 0, j = 0, figure, opponent;
		
		for (i = this.figures.length; i--; ) {
			figure = this.figures[i];
			
			if (figure.dead) {
				if (!figure.death()) {
					if (figure instanceof Mario)
						return this.reload();
						
					figure.view.remove();
					this.figures.splice(i, 1);
				} else
					figure.playFrame();
			} else {
				if (i) {
					for (j = i; j--; ) {
						if (figure.dead)
							break;
							
						opponent = this.figures[j];
						
						if (!opponent.dead && figure.q2q(opponent)) {
							figure.hit(opponent);
							opponent.hit(figure);
						}
					}
				}
			}
			
			if (!figure.dead) {
				figure.move();
				figure.playFrame();
			}
		}
		
		for (i = this.items.length; i--; )
			this.items[i].playFrame();
		
		this.coinGauge.playFrame();
		this.liveGauge.playFrame();
	}
	start() {
		this.controls.bind();
		this.loop = setInterval(() => this.tick(), setup.interval);
	}
	pause() {
		this.controls.unbind();
		clearInterval(this.loop);
		this.loop = undefined;
	}
	setPosition(x: number, y: number) {
		super.setPosition(x, y);
		this.world.css('left', -x);
	}
	setBackground(index: number) {
		var img = constants.basepath + 'backgrounds/' + ((index < 10 ? '0' : '') + index) + '.png';
		this.world.parent().css({
			backgroundImage : img.toUrl(),
			backgroundPosition : '0 -380px'
		});
		this.setImage(img, 0, 0);
	}
	setSize(width: number, height: number) {
		super.setSize(width, height);
	}
	setParallax(x: number) {
		this.setPosition(x, this.y);
		this.world.parent().css('background-position', '-' + Math.floor(x / 3) + 'px -380px');
	}
};

export = Level;