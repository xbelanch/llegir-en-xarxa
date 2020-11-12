// --- Time
export default class Time extends Phaser.GameObjects.Text
{
  constructor(scene, x, y, font)
  {
    super(scene, x, y, '', font);
    this.init();
    this.scene.add.existing(this);
  }

  init()
  {
    let t = this;
    let date = new Date();
    t.text = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
  }

  create()
  {

  }

  update(delta, time)
  {
    let t = this
    let date = new Date();
    t.text = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`;
  }
}
