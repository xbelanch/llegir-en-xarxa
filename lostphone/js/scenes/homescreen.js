// Scene for testing purpose
class HomeScreen extends Phaser.Scene {
  constructor(){
    super('homeScreen');
    this.active;
    this.currentScene;
    this.time;
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
    t.setBackgroundPhone();
    t.addPhoneFront();
    t.addIconApps();
    t.addPhoneButtons();    
  }

  update()
  {
    let t = this;
    t.time.update();
    
  }


  // --- HOME SCREEN OBJECTS ---
  // ---------------------------

  addPhoneButtons()
  {
    let t = this;
    let s = t.sc;
    // Add Home icon
    t.btHome = new Button(t, ((t.game.config.width / 2) - 64), (t.game.config.height - 160), 'home');
    t.btHome.on('pointerdown', () => {
      t.btHome.click();
      t.scene.start('homeScreen');
      });
  }

  setBackgroundPhone()
  {
    // Cercar a la documentació la possibilitat d'afegir
    // un fons animat (shader) si les especificacions del dispositiu
    // ho permeten
    let t = this;
    t.add.image(0, 0, 'background-homescreen').setOrigin(0);
  }
  
  addPhoneFront()
  {
    // Set foreground image
    let t = this;
    let s = t.sc;
    
    t.add.image(0, 0, 'foreground-phone').setOrigin(0);

    // Add clock at the top of the phone
    t.time = new Time(t, (t.game.config.width / 2), 24, 32);
    t.date = new MyDate(t, (t.game.config.width / 2), 48, 24, 'text');
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
