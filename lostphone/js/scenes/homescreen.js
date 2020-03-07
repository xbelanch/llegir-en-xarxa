// HomeScreen
// Where everything starts
class HomeScreen extends Phaser.Scene {
  constructor(){
    super('HomeScreen');
  }

  preload() {
    // For every app, load config
    var apps = this.cache.json.get('apps');

    for (var app in apps) {
      this.load.json(apps[app]['type'], `config/apps/${apps[app]['type']}.json`);
    }
  }

  init(){
    let t = this;

    // Recuperem el valor d'escala
    t.sc = this.registry.get('scale');

    // Definim el color del fons de pantalla de navegador
    t.gameId = document.getElementById('game');
    t.gameId.style.backgroundColor = '#421737';

    // Definim el cursor
    this.input.setDefaultCursor("url(" + `assets/cursors/${this.registry.get('imgfolder')}/cursor.png`+ "), pointer");
  }

  create(){
    let t = this;
    // Change the background of homescreen
    // @example:
    // t.gameId.style.backgroundImage = "url('https://i.picsum.photos/id/1020/800/1200.jpg')";
    // però el que seria interessant... shader?
    // ref: https://phaser.discourse.group/t/applying-shader-to-image-on-the-foreground/1629
    t.addBackgroundImage();
    t.addIconApps();
  }

  update()
  {

  }


  // --- HOME SCREEN OBJECTS ---
  // ---------------------------

  addBackgroundImage()
  {
    let t = this;
    t.add.image(0, 0, 'background-homescreen').setOrigin(0);
  }


  // --- Home Screen Apps
  addIconApps()
  {
    let t = this;
    let s = t.sc;

    var apps = this.cache.json.get('apps');

    var i = 0;
    for (var app in apps) {
        new IconApp(
          t,
          apps[app]["name"],
          apps[app]["type"]+"App",
          apps[app]["type"],
          s * (45 + (120 * (i % 3))), // Posició X (rota cada 3 posicions)
          s * (90 + (110 * (Math.floor(i / 3))))  // Posició Y (augmenta cada 3 icones)
        );
        i++;
    }

    // @NOTE: Cal estudiar aquest exemple:
    // http://labs.phaser.io/edit.html?src=src/scenes/tutorial/scene%20controller.js&v=3.22.0
  }
}
