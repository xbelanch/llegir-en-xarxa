//
// main.js
// 

// Creació de l'objecte 'game' i li passem com a
// argument la configuració des de l'arxiu: config.js
const Game = new Phaser.Game(config);
// Registrem les escenes bàsiques del joc a través
// de la const registerScenes (registerScenes.js)
registerScenes(Game);
// Inici del miniop
// @TODO Imagino que caldrà passar-ho al json general?
const SceneManager = {
  active : SceneKeys.Bootstrap
};
Game.scene.start(SceneKeys.Bootstrap);


