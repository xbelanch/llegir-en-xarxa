// Scene for testing purpose
class HomeScreen extends Phaser.Scene {
  constructor(){
    super('homeScreen');
    this.active;
    this.currentScene;
    this.iconAppRellotge;
  }

  init(){
    this.sc = this.registry.get('scale');
  }
  
  create(){
    let t = this;
    // Pintem la pantalla d'inici amb les Apps disponibles
    t.addIconApps();
  }

  // --- Home Screen Apps
  addIconApps()
  {
    let t = this;
    let s = t.sc;
    // First row
    t.createIconApp('Rellotge', 'clockApp', 'clock', 32 * s, 32 * s);
    t.createIconApp('Configuració', 'systemApp', 'system', 148 * s, 32 * s);
    t.createIconApp('Fotos', 'galleryApp', 'gallery', 272 * s, 32 * s);
    // Second row
    t.createIconApp('Calendari', 'calendarApp', 'calendar', 32 * s, 148 * s);
    t.createIconApp('Podcasts', 'audioApp', 'audio', 148 * s, 148 * s);
    t.createIconApp('Temps', 'weatherApp', 'weather', 272 * s, 148 * s);

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
    iconApp.label = this.add.text(
      iconApp.x + (iconApp.width / 2),
      iconApp.y + iconApp.height + 24,
      label,
      this.style);
    iconApp.label.setOrigin(0.5);
    iconApp.label.setFontSize(24);
    iconApp.label.setFontFamily('roboto');
    iconApp.label.setShadow(2, 2, 0x3f3f3f, 0.4);

    // --- Interaction with the icon
    iconApp.on('pointerover', function(event){
      iconApp.setTint(0xff0000);
    });

    iconApp.on('pointerout', function(event){
      iconApp.clearTint();
    });

    iconApp.on('pointerdown', function(event) {
      t.scene.start(scene);
    });

    t['iconApp' + name] = iconApp; 
  }

}
