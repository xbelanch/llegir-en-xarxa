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

    const margin_left = 0;
    const margin_top = 0;
    const margin_text = t.scene.elements['headings']['padding'];

    const reading_area_width = width;
    const reading_area_height = height - margin_top;

    // Layer
    t.scene.add.rectangle(
      0,
      0,
      t.scene.width,
      t.scene.height,
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
    ).setOrigin(0,0));

    let mask = new Phaser.Display.Masks.GeometryMask(t.scene, background);

    // Add text
    let text = t.scene.add.text(
      margin_left + margin_text,
      margin_top + margin_text,
      heading + '\n\n' + content,
      {
        color: '#ffffff',
        fontFamily: 'Roboto',
        fontSize: t.scene.elements['headings']['fontSize'],
        wordWrap: { width: t.scene.width - (2 * (margin_left + margin_text)) }
      }
    ).setOrigin(0,0).setDepth(100).setInteractive({ draggable: true });

    text.setMask(mask);

    text.on('drag', function (pointer, dragX, dragY) {
      text.y = dragY;

      const text_height = text.getBottomCenter().y - text.getTopCenter().y;
      text.y = Phaser.Math.Clamp(
        text.y,
        text_height >= reading_area_height ?
          -text_height + margin_top - margin_text + reading_area_height :
          margin_top + margin_text,
        margin_top + margin_text);
    });

    // Add close button
    t.add(new Phaser.GameObjects.Text(
      t.scene,
      t.scene.width - margin_left - t.scene.elements['headings']['fontSize'],
      margin_top + t.scene.elements['headings']['fontSize'],
      'X',
      {
        fontFamily: 'Roboto',
        fontSize : t.scene.elements['headings']['fontSize'],
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
