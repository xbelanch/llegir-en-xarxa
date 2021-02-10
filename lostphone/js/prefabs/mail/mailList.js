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
    this.dragZone;
    this.visible_mails = 0;
    this.boxHeight;

    this.print(config);
    scene.add.existing(this);
  }

  print(config) {
    let t = this;
    let { width, height } = t.scene.cameras.main;

    const margin_line = Math.floor(25 * t.scene.assetsDPR);
    const margin_text_left = Math.floor(45 * t.scene.assetsDPR);
    const margin_text_top = Math.floor(10 * t.scene.assetsDPR);
    const initial_pos = Math.floor(100 * t.scene.assetsDPR);
    t.box_height = Math.floor(60 * t.scene.assetsDPR);
    const text_style = { color: '#ffffff', fontFamily: 'Roboto', fontSize: '24px'};

    for (let i=0; i<config.mails.length; i++) {

      // Check if we have to show it
      if (!t.scene.game.checkCondition(config.mails[i].condition)) {
        continue;
      }
      t.visible_mails += 1;

      // Add a background
      t.add(new Phaser.GameObjects.Rectangle(
        t.scene,
        margin_line,
        initial_pos + (i*t.box_height),
        width-(margin_line*2),
        t.box_height,
        0x000000,
        0.7
      ).setOrigin(0,0));

      // Add the text
      t.add(new MailHeadingObject(
        t.scene,
        config,
        config.mails[i],
        margin_text_left,
        initial_pos+(i*t.box_height) + margin_text_top,
        text_style
      ).setOrigin(0,0));

      // Add a line
      t.add(t.addLine(
        margin_line,
        initial_pos + (i*t.box_height),
        width-margin_line,
        initial_pos + (i*t.box_height)
      ));
    }

    t.add(t.addLine(
      margin_line,
      initial_pos + (t.visible_mails*t.box_height),
      width-margin_line,
      initial_pos + (t.visible_mails*t.box_height)
    ));

    // Create a mask
    t.mailMask = t.scene.add.rectangle(
      margin_line, initial_pos,
      width-(margin_line*2),
      t.box_height*t.visible_mails,
      0x000000, 0.0
    ).setOrigin(0,0).setVisible(false);
    let mask = new Phaser.Display.Masks.GeometryMask(t, t.mailMask);
    t.setMask(mask);

    t.setSize(width*2, box_height * (visible_mails) * 3);
    t.setInteractive({draggable: true});

    t.on('drag', function (pointer, dragX, dragY) {
      t.y = dragY;
      t.y = Phaser.Math.Clamp(
        t.y,
        -box_height * (visible_mails - 1),
        0
      );
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
