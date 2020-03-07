class Time extends Phaser.GameObjects.Text
{
  constructor(scene, x, y, fontsize)
  {
    super(scene, x, y);
    this.fontsize = fontsize;
    this.days = ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"];
    this.months = ["Gener", "Febrer", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    this.init();
    this.scene.add.existing(this);
  }

  init()
  {
    let t = this;
    t.date = new Date();
    t.text = `${('0' + t.date.getHours()).slice(-2)}:${('0' + t.date.getMinutes()).slice(-2)}`;
    t.setOrigin(0.5);
    t.setFontFamily('roboto');
    t.setFontSize(t.fontsize);
    t.setFontStyle('bold');
    t.setColor('#efefef');
  }

  create()
  {

  }

  update()
  {
    let t = this;
    t.date = new Date();
    t.text = `${('0' + t.date.getHours()).slice(-2)}:${('0' + t.date.getMinutes()).slice(-2)}`;
  }
}
