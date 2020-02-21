class IconApp extends Phaser.GameObjects.Image
{
  constructor(scene, label, app, frame, x, y)
  {
    super(scene, x, y, frame);
    this.setInteractive();
    this.setOrigin(0);
    this.setData('name', name);
    this.setData('app', app);
    this.setData('active', false);
    this.addLabel(label);
    this.app = app;
    this.init();
    this.scene.add.existing(this);
  }

  init()
  {
    // --- Interaction with the icon
    let t = this;
    t.on('pointerover', function(event){
      t.setAlpha(0.7);
    });

    t.on('pointerout', function(event){
      t.setAlpha(1.0);
    });

    t.on('pointerdown', function(event) {
      t.scene.sound.play('click');
      t.scene.scene.start(t.app);
    });    
  } 
  
  addLabel(text)
  {
    let t = this;
    let label = t.scene.add.text(
      t.x + (t.width / 2),
      t.y + t.height + (t.scene.game.config.height > 640 ? 24 : 12),
      text);
    label.setOrigin(0.5);
    t.scene.game.config.height > 640 ? label.setFontSize(24) : label.setFontSize(14); 
    label.setFontFamily('roboto');
    label.setShadow(2, 2, 0x3f3f3f, 0.4);
  }

  // Basic sound interaction
  click(){
    this.scene.sound.play('click');
  }
  
}

