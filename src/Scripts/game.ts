/// <reference path="def/jquery.d.ts"/>

import game = require('./main');
import levels = require('./testlevels');
import controls = require('./keys');
import HtmlAudioManager = require('./audio');

$(document).ready(function() {
	var sounds = new HtmlAudioManager();
	game.run(levels[0], controls, sounds);
});