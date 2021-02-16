import MailHeadingObject from '/prefabs/mail/MailHeading';
import MailObject from '/prefabs/mail/Mail';
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

    const margin_line = Math.floor(25 * t.scene.assetsDPR);
    const margin_text_left = t.scene.elements['headings']['padding']*2;
    const margin_text_top = t.scene.elements['headings']['padding'];
    const initial_pos = t.scene.elements['title']['y'] + t.scene.elements['headings']['padding'];
    const box_height = t.scene.elements['headings']['fontSize']*2 + 2*t.scene.elements['headings']['padding'];
    const text_style = {
      color: '#ffffff',
      fontFamily: 'Roboto',
      fontSize: t.scene.elements['headings']['fontSize']
    };

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
        0,
        initial_pos + (i*box_height),
        t.scene.width,
        box_height,
        0x000000,
        0.7
      ).setOrigin(0,0)
      .setInteractive()
      .on('pointerdown', function(event) {
        t.scene.game.saveState('complete', config.mails[i]['id'], true);
        new MailObject(t.scene, config, config.mails[i]);
      }));

      // Add the text
      t.add(new MailHeadingObject(
          t.scene,
          config,
          config.mails[i],
          margin_text_left,
          initial_pos+(i*box_height) + margin_text_top,
          text_style
        ).setOrigin(0,0)
      );

      // Add a line
      t.add(t.addLine(
        0,
        initial_pos + (i*box_height),
        t.scene.width,
        initial_pos + (i*box_height)
      ));
    }

    t.add(t.addLine(
      0,
      initial_pos + (visible_mails*box_height),
      t.scene.width,
      initial_pos + (visible_mails*box_height)
    ));

    // Create a mask
    t.mailMask = t.scene.add.rectangle(
      0, initial_pos,
      t.scene.width,
      t.scene.height - t.scene.UIelements['bottomBar']['height'] - initial_pos - t.scene.elements['headings']['padding'],
      0x000000, 0.0
    ).setOrigin(0,0).setVisible(false);
    let mask = new Phaser.Display.Masks.GeometryMask(t, t.mailMask);
    t.setMask(mask);

    t.setSize(t.scene.width*2, box_height * (visible_mails) * 3);
    t.setInteractive({draggable: true});

    t.on('drag', function (pointer, dragX, dragY) {
      t.y = dragY;
      t.y = Phaser.Math.Clamp(
        t.y,
        -box_height * (visible_mails - 3),
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
