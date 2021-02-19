import MailHeadingObject from '/prefabs/mail/MailHeading';
export default class MailListObject extends Phaser.GameObjects.Container
{
  constructor(scene, config) {
    super(scene, 0, 0, []);
    scene.add.existing(this);
    this.print(config);
  }

  print(config) {
    let t = this;

    for (let i=config.mails.length-1; i>=0; i--) {
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
