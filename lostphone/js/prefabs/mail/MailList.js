import MailHeadingObject from '/prefabs/mail/MailHeading';
export default class MailListObject extends Phaser.GameObjects.Container
{
  constructor(scene, config) {
    super(
      scene,
      config['x'] !== undefined ? config['x'] : 0,
      config['y'] !== undefined ? config['y'] : 0,
      []
    );
    this.print(config);
    scene.add.existing(this);
  }

  print(config) {
    let t = this;

    for (let i=0; i<config.mails.length; i++) {
      // Check if we have to show it
      if (!t.scene.game.checkCondition(config.mails[i].condition)) {
        continue;
      }

      // Add the Mail object
      let mail = new MailHeadingObject(
        t.scene,
        config,
        config.mails[i],
        i % 2 ? 0x000000 : 0x333333
      );
      t.add(mail);
      t.scene.addRow(mail, {height: 2});
    }
  }
}
