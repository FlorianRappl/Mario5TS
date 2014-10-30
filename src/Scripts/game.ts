/// <reference path="def/jquery.d.ts"/>

import game = require('./main');
import levels = require('./testlevels');
import controls = require('./keys');

$(document).ready(function() {
	game.run(levels[0], controls);
});