import Textbox from '/prefabs/textbox';

export default class ExclusivePopup extends Phaser.GameObjects.Container
{
  constructor(scene, text, params)
  {
    super(scene, 0, 0, []);
    let t = this;

    let { width, height } = scene.cameras.main;

    // Add background
    t.add(new Phaser.GameObjects.Rectangle(
      scene,
      0,
      0,
      width,
      height,
      0x000000,
      0.8
      ).setOrigin(0,0)
    );

    params['x'] = width * 0.1;
    params['y'] = height / 2 - Math.floor(50 * scene.assetsDPR);
    params['bgcolor'] = 0xaaaaaa;
    params['width'] = width * 0.8;
    params['height'] = Math.floor(100 * scene.assetsDPR);
    params['alpha'] = 1;
    params['strokeWidth'] = 1;
    params['strokeColor'] = 0xffffff;

    if (params['closeButton'] !== undefined) {
      t.add(new Phaser.GameObjects.Text(
        scene,
        width - params['x'] - Math.floor(12 * scene.assetsDPR),
        params['y'] + Math.floor(2 * scene.assetsDPR),
        'X',
        {
          fontFamily: 'Roboto',
          fontSize : Math.floor(12 * scene.assetsDPR),
          color: '#ffffff',
          align: 'center'
        }
        ).setOrigin(0,0)
        .setInteractive()
        .on('pointerup', () => t.destroy())
      );
      params['closeButton'] = undefined;
    }

    if (params['type'] !== undefined) {
      if (params['type'] === 'yesno') {
        //Print yes/no functions
        t.add(new Phaser.GameObjects.Image(
          scene,
          width / 2 - Math.floor(20*scene.assetsDPR),
          height / 2 + Math.floor(20 * scene.assetsDPR),
          'icons',
          t.scene.icons['ok']
        )
        .setInteractive()
        .setScale(2*scene.assetsDPR)
        .on('pointerup', function(){
          params['yesfunction']();
          t.destroy();
        }));

        t.add(new Phaser.GameObjects.Image(
          scene,
          width / 2 + Math.floor(20*scene.assetsDPR),
          height / 2 + Math.floor(20 * scene.assetsDPR),
          'icons',
          t.scene.icons['ko']
        )
        .setInteractive()
        .setScale(2*scene.assetsDPR)
        .on('pointerup', () => t.destroy()));
      }
    }

    t.addAt(new Textbox(
      scene,
      text,
      params
    ),1);

    scene.add.existing(t);
  }
}