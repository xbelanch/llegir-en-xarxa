// --- TextButton
import { assetsDPR } from '../config.js'

export default class TextButton extends Phaser.GameObjects.Container
{
  constructor(scene, rect, text, buttonType, callback)
  {
    super(scene, rect.x, rect.y, []);

    this.width = rect.width;
    this.height = rect.height;

    let slice = this.scene.add.nineslice(
      this.x, this.y,
      Math.round(rect.width * assetsDPR),
      Math.round(rect.height * assetsDPR),
      'Button-Idle',
      [35, 15, 15]
    );

    let label = new Phaser.GameObjects.Text(
      scene,
      0, // position relative to container
      0,
      text,
      { fontSize: '32px' }
    );
    this.add(label);

    this.scene.input.on('pointermove', (pointer) => {
      if (pointer.y >= slice.y && pointer.y < slice.y + slice.height && pointer.x >= slice.x && pointer.x < slice.x + slice.width)
      {
        slice.setTint(0x808080);
        label.setTint(0x808080);
      } else {
        slice.clearTint();
      };
    });

    this.scene.input.on('pointerdown', (pointer) => {
      if (pointer.y >= slice.y && pointer.y < slice.y + slice.height && pointer.x >= slice.x && pointer.x < slice.x + slice.width)
      {
        slice.setTint(0x00ff00);
      }
    });

    this.scene.input.on('pointerup', (pointer) => {
      if (pointer.y >= slice.y && pointer.y < slice.y + slice.height && pointer.x >= slice.x && pointer.x < slice.x + slice.width)
      {
        slice.clearTint();
        callback();
      }
    });
    scene.add.existing(this);
  };
};
