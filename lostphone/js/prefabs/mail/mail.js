import { assetsDPR } from "../../config";

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

    let { width, height } = this.scene.cameras.main;

    const heading = config['locale']['from']
      + mail['from'] + '\n'
      + config['locale']['subject']
      + mail['subject'];
    const content = mail['body'];

    const margin_left = Math.floor(20*assetsDPR);
    const margin_top = Math.floor(100*assetsDPR);
    const margin_text = Math.floor(10*assetsDPR);

    // Layer
    this.scene.add.rectangle(
      0,
      0,
      width,
      height,
      0xffffff,
      0.2
    ).setOrigin(0,0);

    // Rectangle reading area
    let background = this.add(new Phaser.GameObjects.Rectangle(
      this.scene,
      margin_left,
      margin_top,
      width - (2 * margin_left),
      height - (2 * margin_top),
      0x202020,
      1.0
    ).setOrigin(0,0).setStrokeStyle(1, 0xffffff));

    let mask = new Phaser.Display.Masks.GeometryMask(this.scene, background);

    // Add text
    let text = this.scene.add.text(
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
    let zone = this.scene.add.zone(
      margin_left,
      margin_top,
      width - (2 * margin_left),
      height - (2 * margin_top)
    ).setOrigin(0,0).setInteractive();

    zone.on('pointermove', function (pointer) {
      if (pointer.isDown)
      {
        text.y += (pointer.velocity.y / 3);
        // We need to know the full height of the text
        text.y = Phaser.Math.Clamp(
          text.y,
          -(text.getBottomCenter().y - text.getTopCenter().y) + (margin_text*3) + margin_top,
          margin_top + margin_text);
      }
    });

    // Add close button
    this.add(new Phaser.GameObjects.Text(
      this.scene,
      width - margin_left - Math.floor(12*assetsDPR),
      margin_top + Math.floor(8*assetsDPR),
      'X',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(12 * assetsDPR),
        color: '#ffffff',
        align: 'right'
      }
    ).setInteractive().on('pointerdown', () => this.onClose()));

    this.scene.addGoBackFunction(() => this.onClose());
  }

  onClose()
  {
    this.scene.scene.restart();
  }
}
