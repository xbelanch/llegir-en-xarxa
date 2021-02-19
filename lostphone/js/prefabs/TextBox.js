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

    this.text = new Phaser.GameObjects.Text(
      scene,
      params['icon'] !== undefined ? params['width'] / 2 + Math.floor(30*scene.assetsDPR): params['width'] / 2,
      params['height'] / 2,
      text,
      {
        fontFamily: 'Roboto',
        fontSize : params['textSize'],
        color: '#ffffff',
        align: 'left',
        wordWrap: { width: params['width'] }
      }
      ).setOrigin(0.5, 0.5)
      .setAlpha(params['alpha'] !== undefined ? params['alpha'] : 1)
    ;

    if (params['height'] === undefined) {
      params['height'] = this.text.getBottomCenter().y - this.text.getTopCenter().y + 2*this.scene.calcDPR(20)
    }

    // Add box rectangle
    this.box = new Phaser.GameObjects.Rectangle(
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
    );

    this.add(this.box);

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


    this.add(this.text);

    if (params['closeButton'] !== undefined) {
      this.add(new Phaser.GameObjects.Text(
        scene,
        params['width'] - params['textSize'],
        Math.floor(2 * scene.assetsDPR),
        'X',
        {
          fontFamily: 'Roboto',
          fontSize : params['textSize'],
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