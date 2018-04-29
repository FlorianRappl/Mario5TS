import coinMp3 from './Assets/audio/coin.mp3';
import coinOgg from './Assets/audio/coin.ogg';
import dieMp3 from './Assets/audio/die.mp3';
import dieOgg from './Assets/audio/die.ogg';
import editorMp3 from './Assets/audio/editor.mp3';
import editorOgg from './Assets/audio/editor.ogg';
import endingMp3 from './Assets/audio/ending.mp3';
import endingOgg from './Assets/audio/ending.ogg';
import enemyDieMp3 from './Assets/audio/enemy_die.mp3';
import enemyDieOgg from './Assets/audio/enemy_die.ogg';
import gameMp3 from './Assets/audio/game.mp3';
import gameOgg from './Assets/audio/game.ogg';
import gameoverMp3 from './Assets/audio/gameover.mp3';
import gameoverOgg from './Assets/audio/gameover.ogg';
import growMp3 from './Assets/audio/grow.mp3';
import growOgg from './Assets/audio/grow.ogg';
import hurtMp3 from './Assets/audio/hurt.mp3';
import hurtOgg from './Assets/audio/hurt.ogg';
import invincibleMp3 from './Assets/audio/invincible.mp3';
import invincibleOgg from './Assets/audio/invincible.ogg';
import jumpMp3 from './Assets/audio/jump.mp3';
import jumpOgg from './Assets/audio/jump.ogg';
import lifeupgradeMp3 from './Assets/audio/lifeupgrade.mp3';
import lifeupgradeOgg from './Assets/audio/lifeupgrade.ogg';
import menuMp3 from './Assets/audio/menu.mp3';
import menuOgg from './Assets/audio/menu.ogg';
import mushroomMp3 from './Assets/audio/mushroom.mp3';
import mushroomOgg from './Assets/audio/mushroom.ogg';
import peachMp3 from './Assets/audio/peach.mp3';
import peachOgg from './Assets/audio/peach.ogg';
import shellMp3 from './Assets/audio/shell.mp3';
import shellOgg from './Assets/audio/shell.ogg';
import shootMp3 from './Assets/audio/shoot.mp3';
import shootOgg from './Assets/audio/shoot.ogg';
import successMp3 from './Assets/audio/success.mp3';
import successOgg from './Assets/audio/success.ogg';

const files = {
  '.ogg': {
    coin: coinOgg,
    die: dieOgg,
    editor: editorOgg,
    ending: endingOgg,
    enemy_die: enemyDieOgg,
    game: gameOgg,
    gameover: gameoverOgg,
    grow: growOgg,
    hurt: hurtOgg,
    invincibility: invincibleOgg,
    jump: jumpOgg,
    lifeupgrade: lifeupgradeOgg,
    menu: menuOgg,
    mushroom: mushroomOgg,
    peach: peachOgg,
    shell: shellOgg,
    shoot: shootOgg,
    success: successOgg,
  },
  '.mp3': {
    coin: coinMp3,
    die: dieMp3,
    editor: editorMp3,
    ending: endingMp3,
    enemy_die: enemyDieMp3,
    game: gameMp3,
    gameover: gameoverMp3,
    grow: growMp3,
    hurt: hurtMp3,
    invincibility: invincibleMp3,
    jump: jumpMp3,
    lifeupgrade: lifeupgradeMp3,
    menu: menuMp3,
    mushroom: mushroomMp3,
    peach: peachMp3,
    shell: shellMp3,
    shoot: shootMp3,
    success: successMp3,
  },
};

export function getPath(ext: string, name: string): string | undefined {
  const relevant = files[ext];
  const effect = relevant && relevant[name]

  if (!effect) {
    console.error(`Music effect not found, ${name} (in ${ext})!`);
  }

  return effect;
}
