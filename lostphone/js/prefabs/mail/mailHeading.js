import MailObject from '/prefabs/mail/mail';
export default class MailHeadingObject extends Phaser.GameObjects.Text
{
  constructor(scene, config, mail, x, y, text_style) {
    const text_content = config['locale']['from']
      + mail['from'] + '\n'
      + config['locale']['subject']
      + mail['subject'];


    super(scene, x, y, text_content, text_style);

    // Mirem si està llegit
    this.checked = this.scene.game.checkCondition(mail['id']);
    if (!this.checked) {
      this.setColor('#ff0000');
    }

    this.setClickable(config, mail);
    scene.add.existing(this);
  }

  // Fer la capçalera del mail clickable
  setClickable(config, mail) {
    let t = this;

    t.setInteractive();

    t.on('pointerover', function(event){
      t.setAlpha(0.7);
    });

    t.on('pointerout', function(event){
      t.setAlpha(1.0);
    });

    t.on('pointerdown', function(event) {
      t.scene.game.saveState('complete', mail['id'], true);
      t.setColor('#ffffff');

      new MailObject(t.scene, config, mail);
    });
  }
}
