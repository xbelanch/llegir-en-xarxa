// Scene for testing purpose

class HomeScreen extends Phaser.Scene {
  constructor(){
    super('homeScreen');
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
  }
}


class IconApp extends Phaser.GameObjects.Image {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite);
    this.setInteractive();
    this.setOrigin(0);
    this.setAlpha(0.5);
    this.tween;
    this.scene.add.existing(this);

    // interaction with the icon
    this.on('pointerover', function(event){
      this.setTint(0xff0000);
    });

    this.on('pointerout', function(event){
      this.clearTint();
    });
  }
}
