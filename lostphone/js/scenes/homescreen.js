// Scene for testing purpose
class HomeScreen extends Phaser.Scene {
  constructor(){
    super('homeScreen');
    this.active;
    this.currentScene;
    this.iconAppRellotge;
    this.gameId;
    this.cursor;
  }

  init(){
    let t = this;
    t.sc = this.registry.get('scale');
    t.gameId = document.getElementById('game');
    t.containerId = document.getElementById('container');
  }
  
  create(){
    let t = this;
    // Change the background of homescreen
    // @example:
    // t.gameId.style.backgroundImage = "url('https://i.picsum.photos/id/1020/800/1200.jpg')";
    t.gameId.style.backgroundColor = '#421737';
    // però el que seria interessant... shader?
    // ref: https://phaser.discourse.group/t/applying-shader-to-image-on-the-foreground/1629

    // Set background image
    t.add.image(0, 0, 'background-homescreen').setOrigin(0);

    // Pintem la pantalla d'inici amb les Apps disponibles
    t.addIconApps();

    // Set foreground image
    t.add.image(0, 0, 'foreground-phone').setOrigin(0);
    
    // Definim el cursor
    // #1 https://phaser.discourse.group/t/custom-cursor-based-on-a-png-image/5251
    // source: https://photonstorm.github.io/phaser3-docs/Phaser.Input.InputPlugin.html#setDefaultCursor
    this.input.setDefaultCursor("url(" + `assets/cursors/${this.registry.get('imgfolder')}/cursor.png`+ "), pointer");

    // Add Home icon
    t.add.image((t.game.config.width / 2) - 64, t.game.config.height - 160, 'home').setOrigin(0).setInteractive().on('pointerdown', function(event) {
      t.scene.start('homeScreen');
    });
    
  }

  // --- Home Screen Apps
  addIconApps()
  {
    let t = this;
    let s = t.sc;
    
    // First row
    t.createIconApp('Rellotge', 'clockApp', 'clock', s * 45,  90 * s);
    t.createIconApp('Configuració', 'systemApp', 'system', s * 165, 90 * s);
    t.createIconApp('Fotos', 'galleryApp', 'gallery', s * 290, 90 * s);
    // Second row
    t.createIconApp('Calendari', 'calendarApp', 'calendar', s * 45, s * 200);
    t.createIconApp('Podcasts', 'audioApp', 'audio', 165 * s, s * 200);
    t.createIconApp('Temps', 'weatherApp', 'weather', 290 * s, s * 200);

    // @NOTE: Cal estudiar aquest exemple:
    // http://labs.phaser.io/edit.html?src=src/scenes/tutorial/scene%20controller.js&v=3.22.0    
  }
  
  createIconApp(label, scene, texture, x, y)
  {
    let t = this;
    let iconApp = t.add.image(x, y, texture).setOrigin(0);
    iconApp.setInteractive();
    iconApp.setData('name', name);
    iconApp.setData('scene', scene);
    iconApp.setData('active', false);

    // Label
    iconApp.label = t.add.text(
      iconApp.x + (iconApp.width / 2),
      iconApp.y + iconApp.height + (t.game.config.height > 640 ? 24 : 12),
      label,
      t.style);
    iconApp.label.setOrigin(0.5);
    t.game.config.height > 640 ? iconApp.label.setFontSize(24) : iconApp.label.setFontSize(14);
    iconApp.label.setFontFamily('roboto');
    iconApp.label.setShadow(2, 2, 0x3f3f3f, 0.4);

    // --- Interaction with the icon
    iconApp.on('pointerover', function(event){
      iconApp.setAlpha(0.7);
    });

    iconApp.on('pointerout', function(event){
      iconApp.setAlpha(1.0);
    });

    iconApp.on('pointerdown', function(event) {
      t.scene.start(scene);
    });

    t['iconApp' + name] = iconApp; 
  }

}
