import './Assets/wallpaper.jpg';
import './Assets/fonts/SuperMarioBros.ttf';
import './Styles/app.css';
import { appendMarioTo } from './';

function createHost() {
  return document.appendChild(document.createElement('div'));
}

(function() {
  const host = document.querySelector('#app') || createHost();
  const game = appendMarioTo(host, {
    sound: true,
  });
  game.start();
})();
