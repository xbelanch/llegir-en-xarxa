import config from './config.js'

// Sure there's another aesthetic way
// to launch the game

// --- Booting up
window.addEventListener('load', () => {
  var game = new Phaser.Game(config);
});
