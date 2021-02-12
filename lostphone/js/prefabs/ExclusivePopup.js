import Textbox from '/prefabs/TextBox';

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

    params['bgcolor'] = 0xaaaaaa;
    params['width'] = width * 0.8;
    params['height'] = t.scene.calcDPR(100);
    params['x'] = width * 0.1;
    params['y'] = (height - params['height']) / 2 ;
    params['alpha'] = 1;
    params['strokeWidth'] = 1;
    params['strokeColor'] = 0xffffff;
    params['textSize'] = t.scene.calcDPR(24);

    if (params['closeButton'] !== undefined) {
      t.add(new Phaser.GameObjects.Text(
        scene,
        width - params['x'] - params['textSize'],
        params['y'] + Math.floor(2 * scene.assetsDPR),
        'X',
        {
          fontFamily: 'Roboto',
          fontSize : params['textSize'],
          color: '#ffffff',
          align: 'center'
        }
        ).setOrigin(0,0)
        .setInteractive()
        .on('pointerup', () => t.destroy())
      );
      params['closeButton'] = undefined;
    }

    t.textbox = new Textbox(
      scene,
      text,
      params
    );
    t.addAt(t.textbox,1);

    if (params['type'] !== undefined) {
      if (params['type'] === 'yesno') {
        //Print yes/no functions
        t.add(new Phaser.GameObjects.Image(
          scene,
          width / 2 - Math.floor(20*scene.assetsDPR),
          (height + t.textbox.text.getBottomCenter().y) / 2,
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
          (height + t.textbox.text.getBottomCenter().y) / 2 ,
          'icons',
          t.scene.icons['ko']
        )
        .setInteractive()
        .setScale(2*scene.assetsDPR)
        .on('pointerup', () => t.destroy()));
      }
    }

    scene.add.existing(t);
  }
}