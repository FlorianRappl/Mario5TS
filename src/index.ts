import './Styles/style.css';
import { Level } from './engine';
import { assets } from './assets';
import { standardLevels } from './levels';
import { keys } from './keys';
import { HtmlAudioManager}  from './audio';
import { LevelFormat } from './types';

export interface MarioGameOptions {
  sound?: boolean;
  level?: number;
  levels?: Array<LevelFormat>;
}

export function appendMarioTo(host: Element, options: MarioGameOptions = {}) {
  const levels = options.levels || standardLevels;
  const level = new Level(host, keys, levels, assets);
  level.load(levels[options.level || 0]);

  if (options.sound !== false) {
    const sounds = new HtmlAudioManager();
    level.setSounds(sounds);
  }

	return level;
}
