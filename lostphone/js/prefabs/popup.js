// @Todo: create a Popup based on Text phaser and
// https://labs.phaser.io/edit.html?src=src/game%20objects/text/static/speech%20bubble.js&v=3.23.0
// for displaying error messages
import TextBox from '/prefabs/textbox';

export default class Popup extends TextBox
{
  constructor(scene, text, params)
  {
    let { width, height } = scene.cameras.main;

    params['x'] = width * 0.1;
    params['y'] = Math.floor(-140 * scene.assetsDPR);
    params['width'] = width * 0.8;
    params['height'] = Math.floor(100 * scene.assetsDPR);
    params['bgcolor'] = 0x000000;
    params['alpha'] = 0.8;
    params['strokeWidth'] = 1;
    params['strokeColor'] = 0xffffff;

    super(scene, text, params);

    this.setDepth(1000);
    scene.add.existing(this);
    this.isActive = false;

  }

  display(params)
  {
    let t = this.scene;

    let options = {
      targets: this,
      y : 140,
      duration : 500,
      delay: 0,
      ease : 'Power2',
      yoyo : true,
      repeat : 0,
      hold : 5000,
      onStart : this.onStartHandler,
      onStartScope : this,
      onStartParams : [ this ],
      onComplete : this.onCompleteHandler,
      onCompleteScope : this,
      onCompleteParams : [ this ]
    };

    for (let key in params) {
        options[key] = params[key];

        if (key === 'delay' && params[key] == 'random') {
            options[key] = 3000 + Math.random() * 4000;
        }
    }

    t.tweens.add(options);

  }

  onStartHandler(tween, targets, popup)
  {
    popup.isActive = true;
    popup.setVisible(true);
  }

  onCompleteHandler(tween, targets, popup)
  {
    popup.isActive = false;
    popup.setVisible(false);
  }

  destroyBox() {
    super.destroy();
  }
}
