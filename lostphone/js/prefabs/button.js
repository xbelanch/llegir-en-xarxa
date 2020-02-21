class Button extends Phaser.GameObjects.Image {
  constructor(scene, x, y, frame) {
    super(scene, x, y, frame);
    this.setAlpha(1.0);
    this.setInteractive();
    this.setOrigin(0);
    this.scene.add.existing(this);
  }

  // Basic sound interaction
  click(){
    this.scene.sound.play('click');
  }
}
