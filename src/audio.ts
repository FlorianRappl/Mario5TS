import { effects } from './effects.codegen';
import { SoundManager } from './types';

function getPath(ext: string, name: string): string | undefined {
  const relevant = effects[ext];
  const effect = relevant && relevant[name]

  if (!effect) {
    console.error(`Music effect not found, ${name} (in ${ext})!`);
  }

  return effect;
}

export interface MusicSettings {
  musicOn: boolean;
}

export class HtmlAudioManager implements SoundManager {
  soundNames: Array<string>;
  musicNames: Array<string>;
  musicLoops: Array<boolean>;
  support: boolean;
  sounds: Array<Array<HTMLAudioElement>>;
  tracks: Array<HTMLAudioElement>;
  settings: MusicSettings;
  previous: HTMLAudioElement | null;
  currentMusic: HTMLAudioElement | null;
  sides: number;
  onload?(): void;

  constructor(settings = { musicOn: true }, callback?: () => void) {
    let n = 0;
    const test = <HTMLAudioElement>document.createElement('audio');
    this.support =
      typeof test.canPlayType === 'function' &&
      (test.canPlayType('audio/mpeg') !== '' || test.canPlayType('audio/ogg') !== '');
    this.onload = callback;
    this.soundNames = ['jump', 'coin', 'enemy_die', 'grow', 'hurt', 'mushroom', 'shell', 'shoot', 'lifeupgrade'];
    this.musicNames = ['game', 'invincibility', 'die', 'success', 'gameover', 'peach', 'ending', 'menu', 'editor'];
    this.musicLoops = [true, false, false, false, false, true, false, true, true];
    this.sounds = [];
    this.tracks = [];
    this.settings = settings;
    this.currentMusic = null;
    this.sides = 0;

    if (this.support) {
      let toLoad = 0;
      const ext = test.canPlayType('audio/ogg').match(/maybe|probably/i) ? '.ogg' : '.mp3';
      const start = () => {
        if (n++ < 25 && toLoad > 0) {
          setTimeout(start, 100);
        } else {
          this.loaded();
        }
      };

      this.soundNames.forEach(soundName => {
        ++toLoad;
        const t = <HTMLAudioElement>document.createElement('audio');
        t.addEventListener('error', () => --toLoad, false);
        t.addEventListener('loadeddata', () => --toLoad, false);
        t.src = getPath(ext, soundName) || '';
        t.preload = 'auto';
        this.sounds.push([t]);
      });

      this.musicNames.forEach((musicName, index) => {
        ++toLoad;
        const t = <HTMLAudioElement>document.createElement('audio');
        t.addEventListener('error', () => --toLoad, false);
        t.addEventListener('loadeddata', () => --toLoad, false);
        t.src = getPath(ext, musicName) || '';

        if (this.musicLoops[index]) {
          if (typeof t.loop !== 'boolean') {
            t.addEventListener(
              'ended',
              function() {
                this.currentTime = 0;
                this.play();
              },
              false,
            );
          } else {
            t.loop = true;
          }
        } else {
          t.addEventListener('ended', () => this.sideMusicEnded(), false);
        }

        t.preload = 'auto';
        this.tracks.push(t);
      });

      if (callback !== undefined) {
        start();
      }
    } else {
      this.loaded();
    }
  }

  loaded() {
    if (this.onload) {
      setTimeout(this.onload, 10);
    }
  }

  play(name: string) {
    if (this.settings && this.settings.musicOn && this.support) {
      for (let i = this.soundNames.length; i--; ) {
        if (this.soundNames[i] === name) {
          const t = this.sounds[i];

          for (let j = t.length; j--; ) {
            if (t[j].duration === 0) {
              return;
            }

            if (t[j].ended) {
              t[j].currentTime = 0;
            } else if (t[j].currentTime <= 0) {
              t[j].play();
              return;
            }
          }

          const s = document.createElement('audio');
          s.src = t[0].src;
          t.push(s);
          s.play();
          return;
        }
      }
    }
  }

  pauseMusic() {
    if (this.support && this.currentMusic) {
      this.currentMusic.pause();
    }
  }

  playMusic() {
    if (this.support && this.currentMusic && this.settings.musicOn) {
      this.currentMusic.play();
    }
  }

  sideMusicEnded() {
    this.sides--;

    if (this.sides === 0) {
      this.currentMusic = this.previous;
      this.playMusic();
    }
  }

  sideMusic(id: string) {
    if (this.support) {
      if (this.sides === 0) {
        this.previous = this.currentMusic;
        this.pauseMusic();
      }

      for (let i = this.musicNames.length; i--; ) {
        if (this.musicNames[i] === id) {
          if (this.currentMusic !== this.tracks[i]) {
            this.sides++;
            this.currentMusic = this.tracks[i];
          }

          try {
            this.currentMusic.currentTime = 0;
            this.playMusic();
          } catch (e) {
            this.sideMusicEnded();
          }
        }
      }
    }
  }

  music(id: string, noRewind: boolean) {
    if (this.support) {
      for (let i = this.musicNames.length; i--; ) {
        if (this.musicNames[i] === id) {
          const music = this.tracks[i];

          if (music === this.currentMusic) {
            return;
          }

          this.pauseMusic();
          this.currentMusic = music;

          if (this.support) {
            try {
              if (!noRewind) {
                this.currentMusic.currentTime = 0;
              }

              this.playMusic();
            } catch (e) {}
          }
        }
      }
    }
  }
}
