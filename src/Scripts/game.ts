/// <reference path="def/jquery.d.ts"/>
/// <reference path="keys.ts"/>
/// <reference path="testLevels.ts"/>
/// <reference path="main.ts"/>

import game = require('main');

$(document).ready(function() {
	//import controls = require('./keys');
	//import startLevel = require('./');
	var level = game.run(definedLevels[0], keys);
});