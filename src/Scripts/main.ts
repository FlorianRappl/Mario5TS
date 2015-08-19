/// <reference path="def/interfaces.d.ts"/>

// Classes
import Base = require('./base');
import Gauge = require('./gauge');
import Matter = require('./matter');
import Figure = require('./figure');
import Level = require('./level');

// Namespaces (collections of classes)
import itemfigures = require('./itemfigures');
import decorations = require('./decorations');
import grounds = require('./grounds');
import heros = require('./heros');
import enemys = require('./enemys');

/*
 * -------------------------------------------
 * DOCUMENT READY STARTUP METHOD
 * -------------------------------------------
 */
export function run(levelData: LevelFormat, controls: Keys, sounds?: SoundManager) {
	var level = new Level('world', controls);
	level.load(levelData);

	if (sounds)
		level.setSounds(sounds);

	level.start();
};