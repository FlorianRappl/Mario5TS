import './Styles/style.css';
import './Assets/fonts/SuperMarioBros.ttf';
import './Assets/wallpaper.jpg';
import { Level } from './engine';
import { assets } from './assets';
import { levels } from './levels';
import { keys } from './keys';
import { HtmlAudioManager}  from './audio';

declare const $: any;

function createHost() {
  return document.appendChild(document.createElement('div'));
}

export function appendMario(host: Element, levelIndex = 0, soundOn = true) {
	const level = new Level(host, keys, assets);
  level.load(levels[levelIndex]);

  if (soundOn) {
    const sounds = new HtmlAudioManager();
    level.setSounds(sounds);
  }

	return level;
}

$(document).ready(function() {
  const host = document.querySelector('#app') || createHost();
  const game = appendMario(host, 0);
  game.start();
});
