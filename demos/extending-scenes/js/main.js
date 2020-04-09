//
// main.js
// 

// Creació de l'objecte 'game' i li passem com a
// argument la configuració des de l'arxiu: config.js
const Game = new Phaser.Game(config);
// Registrem les escenes bàsiques del joc a través
// de la const registerScenes (registerScenes.js)
registerScenes(Game);
// Variable global que gestiona les escenes actives així
// com l'històric si volem utilitzar la fletxa de darrera
// @TODO Cal valorar si podem reemplaçar l'active per un
// event -- emit?
// @TODO Imagino que caldrà passar-ho al json general?
const SceneManager = {
  active : SceneKeys.Bootstrap,
  history : []
};
// Inici del miniop
Game.scene.start(SceneKeys.Bootstrap);


