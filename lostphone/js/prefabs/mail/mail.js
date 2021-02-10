export default class MailObject extends Phaser.GameObjects.Container
{
  constructor(scene, config, mail) {
    super(
      scene,
      config['x'] !== undefined ? config['x'] : 0,
      config['y'] !== undefined ? config['y'] : 0,
      []
    );
    this.print(config, mail);

    scene.add.existing(this);
  }

  print(config, mail) {

    let t = this;
    let { width, height } = t.scene.cameras.main;

    const heading = config['locale']['from']
      + mail['from'] + '\n'
      + config['locale']['subject']
      + mail['subject'];
    const content = mail['body'];

    const margin_left = Math.floor(20*t.scene.assetsDPR);
    const margin_top = Math.floor(100*t.scene.assetsDPR);
    const margin_text = Math.floor(10*t.scene.assetsDPR);

    const reading_area_width = width - (2 * margin_left);
    const reading_area_height = height - (2 * margin_top);

    // Layer
    t.scene.add.rectangle(
      0,
      0,
      width,
      height,
      0xffffff,
      0.2
    ).setOrigin(0,0);

    // Rectangle reading area
    let background = t.add(new Phaser.GameObjects.Rectangle(
      t.scene,
      margin_left,
      margin_top,
      reading_area_width,
      reading_area_height,
      0x202020,
      1.0
    ).setOrigin(0,0).setStrokeStyle(1, 0xffffff));

    let mask = new Phaser.Display.Masks.GeometryMask(t.scene, background);

    // Add text
    let text = t.scene.add.text(
      margin_left + margin_text,
      margin_top + margin_text,
      heading + '\n\n' + content,
      {
        color: '#ffffff',
        fontFamily: 'Roboto',
        fontSize: '24px',
        wordWrap: { width: width - (2 * (margin_left + margin_text)) }
      }
    ).setOrigin(0,0).setDepth(100);
    text.setMask(mask);

    //  The rectangle they can 'drag' within
    let zone = t.scene.add.zone(
      margin_left,
      margin_top,
      reading_area_width,
      reading_area_height
    ).setOrigin(0,0).setInteractive();

    zone.on('pointermove', function (pointer) {
      if (pointer.isDown)
      {
        text.y += (pointer.velocity.y / 3);
        const text_height = text.getBottomCenter().y - text.getTopCenter().y;
        // We need to know the full height of the text
        text.y = Phaser.Math.Clamp(
          text.y,
          text_height >= reading_area_height ?
            -text_height + margin_top - margin_text + reading_area_height :
            margin_top + margin_text,
          margin_top + margin_text);
      }
    });

    // Add close button
    t.add(new Phaser.GameObjects.Text(
      t.scene,
      width - margin_left - Math.floor(12*t.scene.assetsDPR),
      margin_top + Math.floor(8*t.scene.assetsDPR),
      'X',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(12 * t.scene.assetsDPR),
        color: '#ffffff',
        align: 'right'
      }
    ).setInteractive().on('pointerdown', () => t.onClose()));

    t.scene.addGoBackFunction(() => t.onClose());
  }

  onClose()
  {
    let t = this;
    t.scene.scene.restart();
  }
}
