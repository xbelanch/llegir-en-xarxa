// HomeScreen
// Where everything starts
class HomeScreen extends Phaser.Scene {
  constructor(){
    super('HomeScreen');
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

    // Aturem el clock App? Sipe, i la resta d'Apps...
    t.scene.stop('clockApp');
    
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

    // First row
    t.clockIconApp = new IconApp(t, 'Rellotge', 'clockApp', 'clock', s * 45,  90 * s);
    t.systemIconApp = new IconApp(t, 'Configuració', 'systemApp', 'system', s * 165, 90 * s);
    t.galleryIconApp = new IconApp(t, 'Fotos', 'galleryApp', 'gallery', s * 290, 90 * s);

    // Second row
    t.calendarIconApp = new IconApp(t, 'Calendari', 'calendarApp', 'calendar', s * 45, s * 200);
    t.audioIconApp = new IconApp(t, 'Podcasts', 'audioApp', 'audio', 165 * s, s * 200);
    t.weatheIconApp = new IconApp(t, 'Temps', 'weatherApp', 'weather', 290 * s, s * 200);

    // Third row

    // @NOTE: Cal estudiar aquest exemple:
    // http://labs.phaser.io/edit.html?src=src/scenes/tutorial/scene%20controller.js&v=3.22.0
  }
}
