export default class MailHeadingObject extends Phaser.GameObjects.Container
{
  constructor(scene, config, mail, bgcolor) {
    super(scene,0,0,[]);

    this.setSize(scene.width, scene.rowHeight()*2);

    const text_content = config['locale']['from']
      + mail['from'] + '\n'
      + mail['subject'];

    this.rectangle = new Phaser.GameObjects.Rectangle(
      scene,
      0,0,
      scene.width,
      this.displayHeight,
      bgcolor,
      0.8
    );

    this.icon = new Phaser.GameObjects.Image(
      scene,
      - this.rectangle.displayWidth / 2 + this.rectangle.displayWidth*0.1,
      0,
      'lorem-appsum'
    ).setScale((this.scene.assetsDPR/4)*0.75).setOrigin(0, 0.5);

    this.text = new Phaser.GameObjects.Text(
      scene,
      this.icon.getTopRight().x + this.scene.calcDPR(10),
      0,
      text_content,
      this.scene.getTextProperties({fontSize : this.scene.calcDPR(18), align: 'left'})
    ).setOrigin(0,0.5);

    this.add(this.rectangle);
    this.add(this.icon);
    this.add(this.text);

    // Mirem si està llegit
    this.checked = this.scene.game.checkCondition(mail['id']);
    if (!this.checked) {
      this.text.setColor('#ff0000');
    }

    this.setName(mail['id']);
    this.setInteractive();
    scene.add.existing(this);
  }
}
