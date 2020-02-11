// Scene for testing purpose
class HomeScreen extends Phaser.Scene {
  constructor(){
    super('homeScreen');
    this.active;
    this.currentScene;
    this.playerName = "";
    this.currentDate = new Date();
    this.version = "0.0.1";
    this.onGame = false;
  }

  init(){
    this.sc = this.registry.get('scale');
  }
  
  create(){
    let t = this;
    t.addIconApps();
  }

  // --- Home Screen Apps
  addIconApps(){
    let t = this;
    let s = t.sc;
    t.clockIconApp = new IconApp(this, 32 * s, 32 * s, 'clock');
    t.clockIconApp.on('pointerdown', function(e) { t.scene.start('clockApp'); });
    // @NOTE: No és la solució que m'agrada, però funciona
    // dit d'una altra manera, m'agradaria encapsular dins de la classe IconApp
    // la funcionalitat de canviar d'escena
    // *: https://phaser.discourse.group/t/cant-figure-out-how-i-can-change-the-scene/5141
    // *: http://labs.phaser.io/edit.html?src=src/scenes/tutorial/scene%20controller.js&v=3.22.0    
  }
}

class IconApp extends Phaser.GameObjects.Image {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.setInteractive();
    this.setOrigin(0);
    this.setAlpha(0.5);
    this.init();
    this.scene.add.existing(this);
  }

  init(){
    let t = this;
    // --- Interaction with the icon
    t.on('pointerover', function(event){
      this.setTint(0xff0000);
    });

    t.on('pointerout', function(event){
      this.clearTint();
    });
  }
}
