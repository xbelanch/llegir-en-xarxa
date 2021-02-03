import Config from '/Config'

// Sure there's another aesthetic way
// to launch the game

// --- Booting up
window.addEventListener('load', () => {
  var game = new Phaser.Game(Config);
});
