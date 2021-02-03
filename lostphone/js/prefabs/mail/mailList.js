import { assetsDPR } from '/Config';
import MailHeadingObject from '/prefabs/mail/mailHeading';
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
    let { width, height } = t.scene.cameras.main;

    const margin_line = Math.floor(25 * assetsDPR);
    const margin_text_left = Math.floor(45 * assetsDPR);
    const margin_text_top = Math.floor(10 * assetsDPR);
    const initial_pos = Math.floor(100 * assetsDPR);
    const box_height = Math.floor(60 * assetsDPR);
    const text_style = { color: '#ffffff', fontFamily: 'Roboto', fontSize: '24px'};

    let visible_mails = 0;
    for (let i=0; i<config.mails.length; i++) {

      // Check if we have to show it
      if (!t.scene.game.checkCondition(config.mails[i].condition)) {
        continue;
      }
      visible_mails += 1;

      // Add a background
      t.add(new Phaser.GameObjects.Rectangle(
        t.scene,
        margin_line,
        initial_pos + (i*box_height),
        width-(margin_line*2),
        box_height,
        0x000000,
        0.7
      ).setOrigin(0,0));

      // Add the text
      t.add(new MailHeadingObject(
        t.scene,
        config,
        config.mails[i],
        margin_text_left,
        initial_pos+(i*box_height) + margin_text_top,
        text_style
      ).setOrigin(0,0));

      // Add a line
      t.add(t.addLine(
        margin_line,
        initial_pos + (i*box_height),
        width-margin_line,
        initial_pos + (i*box_height)
      ));
    }

    t.add(t.addLine(
      margin_line,
      initial_pos + (visible_mails*box_height),
      width-margin_line,
      initial_pos + (visible_mails*box_height)
    ));

    // Create a mask
    t.mailMask = t.scene.add.rectangle(
      margin_line, initial_pos,
      width-(margin_line*2),
      box_height*visible_mails,
      0x000000, 0.0
    ).setOrigin(0,0).setVisible(false);
    let mask = new Phaser.Display.Masks.GeometryMask(t, t.mailMask);
    t.setMask(mask);

    t.dragZone = t.scene.add.zone(
      margin_line,
      initial_pos,
      width-(margin_line*2),
      box_height*visible_mails
    ).setOrigin(0).setInteractive();

    t.dragZone.on('pointermove', function (pointer) {
      if (pointer.isDown) {
        t.y += (pointer.velocity.y / 3);
        t.y = Phaser.Math.Clamp(
          t.y,
          -box_height * (visible_mails - 1),
          0
        );
      }
    });

  }

  addLine(x1, y1, x2, y2) {
    let t = this;
    const graphics = t.scene.add.graphics();
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.lineBetween(x1, y1, x2, y2);
    return graphics;
  }
}
