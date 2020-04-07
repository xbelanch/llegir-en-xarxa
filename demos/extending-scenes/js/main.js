//
// main.js
// 

// Creació de l'objecte 'game' i li passem com a
// argument la configuració des de l'arxiu: config.js
const game = new Phaser.Game(config);
// Registrem les escenes bàsiques del joc a través
// de la const registerScenes (registerScenes.js)
registerScenes(game);
// Inici del miniop
game.scene.start(SceneKeys.Bootstrap);


