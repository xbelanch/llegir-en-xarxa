// @Todo: create a Popup based on Text phaser and
// https://labs.phaser.io/edit.html?src=src/game%20objects/text/static/speech%20bubble.js&v=3.23.0
// for displaying error messages
import { DPR, assetsDPR } from '../config.js';

export default class Popup extends Phaser.GameObjects.Container
{
  constructor(scene, text, params)
  {
    super(scene, 0, Math.floor(-70 * assetsDPR), []);

    let popup = this;
    let space = 0;
    if (params === undefined) {
        params = {};
    }
    let { width, height } = scene.cameras.main;

    this.exclusive = params['exclusive'] !== undefined && params['exclusive'];

    // Check if exclusive popup
    if (this.exclusive) {
      this.add(new Phaser.GameObjects.Rectangle(
        scene,
        0,
        Math.floor(70 * assetsDPR),
        width,
        height,
        0x000000,
        0.8
        ).setOrigin(0,0)
      );
    }

    // Notification box
    this.add(new Phaser.GameObjects.Rectangle(
        scene,
        width * 0.1,
        this.exclusive ? height / 2 : 0,
        width * 0.8,
        Math.floor(40 * assetsDPR),
        this.exclusive ? 0xaaaaaa : 0x000000,
        0.8
      ).setOrigin(0,0)
    );

    // Notification icon
    if (params['icon'] !== undefined) {
        this.add(new Phaser.GameObjects.Image(
            scene,
            width * 0.1 + Math.floor(10*assetsDPR),
            Math.floor(20 * assetsDPR) + (this.exclusive ? height / 2 : 0),
            params['icon']
          ).setOrigin(0, 0.5)
        );

        space = Math.floor(120/assetsDPR);
    }

    // Notification text

    // Check if too long
    if (params['ellipsis']) {
      if (text.length > 50) {
        text = text.substr(0,47) + '...';
      }
    }

    this.add(new Phaser.GameObjects.Text(
        scene,
        width * 0.1 + space + Math.floor(10*assetsDPR),
        Math.floor(20 * assetsDPR) + (this.exclusive ? height / 2 : 0),
        text,
        {
          fontFamily: 'Roboto',
          fontSize : Math.floor(8 * assetsDPR),
          color: '#ffffff',
          align: 'center'
        }
      ).setOrigin(0, 0.5)
    );

    // Close button
    if (params['closeButton']) {
      this.add(new Phaser.GameObjects.Text(
        scene,
        width * 0.9 - Math.floor(8 * assetsDPR),
        Math.floor(2 * assetsDPR) +  + (this.exclusive ? height / 2 : 0),
        'X',
        {
          fontFamily: 'Roboto',
          fontSize : Math.floor(8 * assetsDPR),
          color: '#ffffff',
          align: 'center'
        }
        ).setOrigin(0,0)
        .setInteractive()
        .on('pointerup', () => popup.destroy())
      );
    }

    scene.add.existing(this);
    this.isActive = false;
  }

  display(params)
  {

    if (this.exclusive) {
      this.displayExclusive(params);
    } else {
      this.displayPopup(params);
    }

  }

  displayPopup(params) {
    let t = this.scene;

    let options = {
      targets: this,
      x : 0,
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

  displayExclusive(params) {
    let t = this.scene;
    this.isActive = true;
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

}
