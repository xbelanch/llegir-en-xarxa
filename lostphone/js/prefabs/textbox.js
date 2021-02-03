export default class TextBox extends Phaser.GameObjects.Container
{
  constructor(scene, text, params)
  {
    super(
      scene,
      params['x'] !== undefined ? params['x'] : 0,
      params['y'] !== undefined ? params['y'] : 0,
      []
    );

    let textbox = this;

    // Add box rectangle
    this.add(new Phaser.GameObjects.Rectangle(
        scene,
        0,
        0,
        params['width'],
        params['height'],
        params['bgcolor'],
        params['alpha'] !== undefined ? params['alpha'] : 1
      )
      .setOrigin(0,0)
      .setStrokeStyle(
        params['strokeWidth'] !== undefined ? params['strokeWidth'] : 0,
        params['strokeColor'] !== undefined ? params['strokeColor'] : 0x000000
      )
    );

    //Add icon
    if (params['icon'] !== undefined) {
      this.add(new Phaser.GameObjects.Image(
          scene,
          Math.floor(10*scene.assetsDPR),
          params['height'] / 2,
          params['icon']
        ).setOrigin(0, 0.5)
        .setAlpha(params['alpha'] !== undefined ? params['alpha'] : 1)
        .setScale(params['iconScale'] !== undefined ? params['iconScale'] : 1)
      );
    }

    //Add text
    // Check if too long
    if (params['ellipsis'] !== undefined) {
      if (text.length > params['ellipsis']) {
        text = text.substr(0, params['ellipsis']-3) + '...';
      }
    }

    this.add(new Phaser.GameObjects.Text(
      scene,
      params['icon'] !== undefined ? params['width'] / 2 + Math.floor(30*scene.assetsDPR): params['width'] / 2,
      params['height'] / 2,
      text,
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(12 * scene.assetsDPR),
        color: '#ffffff',
        align: 'right'
      }
      ).setOrigin(0.5, 0.5)
      .setAlpha(params['alpha'] !== undefined ? params['alpha'] : 1)
    );

    if (params['closeButton'] !== undefined) {
      this.add(new Phaser.GameObjects.Text(
        scene,
        params['width'] - Math.floor(12 * scene.assetsDPR),
        Math.floor(2 * scene.assetsDPR),
        'X',
        {
          fontFamily: 'Roboto',
          fontSize : Math.floor(12 * scene.assetsDPR),
          color: '#ffffff',
          align: 'center'
        }
        ).setOrigin(0,0)
        .setInteractive()
        .setAlpha(params['alpha'] !== undefined ? params['alpha'] : 1)
        .on('pointerup', () => textbox.destroyBox())
      );
    }
  }

  destroyBox() {
    super.destroy();
  }
}