/// <reference path="def/jquery.d.ts"/>

import constants = require('./constants');
import game = require('./main');
import levels = require('./testlevels');
import controls = require('./keys');
import HtmlAudioManager = require('./HtmlAudioManager');

$(document).ready(function() {
	var sounds = new HtmlAudioManager(constants.audiopath);
	game.run(levels[0], controls, sounds);
});