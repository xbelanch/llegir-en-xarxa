class MyDate extends Phaser.GameObjects.Text
{
  constructor(scene, x, y, fontsize, format)
  {
    super(scene, x, y);
    this.date;
    this.fontsize = fontsize;
    this.format = format; // numbered | text
    this.days = ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"];
    this.months = ["Gener", "Febrer", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    this.init();
    this.scene.add.existing(this);
  }

  init()
  {
    let t = this;
    t.date = new Date();
    if (t.format == 'numbered')
      t.text = `${t.date.getDate()}/${t.date.getMonth() + 1}/${t.date.getFullYear()}`;
    else
      t.text = `${t.days[t.date.getDay()]}/${t.months[t.date.getMonth()]}/${t.date.getFullYear()}`;

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
    // let t = this;
    // t.date = new Date();
    // t.text = `${('0' + t.date.getHours()).slice(-2)}:${('0' + t.date.getMinutes()).slice(-2)}`;
  }
}
