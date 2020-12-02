// --- App
//
//
export default class App extends Phaser.Scene
{
  constructor()
  {
    super();
    this.config;
    this.colors;
  }

  init()
  {
    // Inicialitzem per a cada app les variables de configuració
    this.config = this.cache.json.get('config');
    this.colors = this.config.colors;
  }

  create()
  {
    let t = this;
    t.cameras.main.setBackgroundColor(0xc3c3c3);
    //@TODO Segurament que hi haurà una manera diferent (i millor) per no haver-ne de fer aquesta crida cada vegada que llancem una app
    t.scene.bringToTop('PhoneUI');
  }
}
