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

    //this.setClickable(config, mail);
    scene.add.existing(this);
  }
}
