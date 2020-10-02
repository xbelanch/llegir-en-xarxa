// --- TextButton

class TextButton extends Phaser.GameObjects.Text {

  constructor(scene, x, y, text, style, callback)
  {
    super(scene, x, y, text, style);
    this.setOrigin(0.5);
    this.setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.enterButtonHoverState();
        callback();
      });
  }

  enterButtonHoverState() {
    this.setStyle({ fill: '#ff0'});
  }

  enterButtonRestState() {
    this.setStyle({ fill: '#0f0'});
  }

  enterButtonActiveState() {
    this.setStyle({ fill: '#0ff' });
  }
    
}
