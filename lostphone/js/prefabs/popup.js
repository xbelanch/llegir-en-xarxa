// @Todo: create a Popup based on Text phaser and
// https://labs.phaser.io/edit.html?src=src/game%20objects/text/static/speech%20bubble.js&v=3.23.0
// for displaying error messages
class Popup extends Phaser.GameObjects.Text
{
  constructor(scene, text, params)
  {
    super(scene, 0, 0, text);
    this.scene.add.existing(this);
    this.isActive = false;
  }


}
