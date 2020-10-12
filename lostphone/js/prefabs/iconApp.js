// --- IconApp
//
//

class IconApp extends Phaser.GameObjects.Image
{
  constructor(scene, label, app, frame, x, y)
  {
    super(scene, x, y, frame);
    this.app = app;
    this.setInteractive();
    this.setOrigin(0);
    // this.setData('name', name);
    // this.setData('app', app);
    // this.setData('active', false);
    this.addLabel(label);
    this.init();
    this.scene.add.existing(this);

    this.setScale(this.scene.registry.get('scaleRatio'));
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
      // t.scene.sound.play('click');
      t.scene.scene.stop('homescreen');
      // Registrem l'app com a "activa"
      t.scene.registry.set('activeApp', t.app);
      // Utilitzem el launch per evitar perdre el running del PhoneUI
      t.scene.scene.launch(t.app);
    });    
  } 

  // -- @TODO:
  // Cal esbrinar la manera de gestionar el blurry del text
  // Referències:
  // https://stackoverflow.com/questions/15661339/how-do-i-fix-blurry-text-in-my-html5-canvas
  // https://phaser.discourse.group/t/text-becomes-blurry-on-scaling/1367  
  addLabel(text)
  {
    let t = this;
    let label = t.scene.add.text(
      t.x + (t.width / 2),
      t.y + t.height + (t.scene.game.config.height > 640 ? 16 : 12),
      text);
    label.setOrigin(0.5);
    t.scene.game.config.height > 640 ? label.setFontSize(16) : label.setFontSize(10); 
    label.setFontFamily('Roboto');
    label.setShadow(2, 2, 0x3f3f3f, 0.4);
    label.setResolution(2);

  }

  // Basic sound interaction
  // click(){
  //   this.scene.sound.play('click');
  // }
  
}
