// --- TextButton

export default class TextButton extends Phaser.GameObjects.Container
{
  constructor(scene, rect, text, buttonType, callback)
  {
    super(scene, rect.x, rect.y, []);

    var back = new Phaser.GameObjects.Image(
      scene,
      this.x,
      this.y,
      buttonType
    );
    back.setInteractive();
    back.setOrigin(0.5, 0);
    back.on('pointerdown', ()=> callback());
    back.on('pointerover', ()=> this.enterButtonHoverState());
    back.on('pointerout', ()=> this.enterButtonRestState());
    this.add(back);

    var goButton = new Phaser.GameObjects.Text(
      scene,
      this.x - 80,
      this.y + 30,
      text,
      { fontSize: '48px' }
    );
    this.add(goButton);

    scene.add.existing(this);
  };

  enterButtonHoverState() {
    this.list[0].setTint(0xff0000);
    this.list[1].setTint(0x00ff00);
  };

  enterButtonRestState() {
    this.list[0].clearTint();
    this.list[1].clearTint();
  };
};
/*

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



  enterButtonActiveState() {
    this.setStyle({ fill: '#0ff' });
  }

}
*/
