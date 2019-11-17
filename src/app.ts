import { appendMarioTo } from './mario';

function createHost() {
  return document.appendChild(document.createElement('div'));
}

const host = document.querySelector('#app') || createHost();

appendMarioTo(host, {
  sound: true,
}).then(game => game.start());
