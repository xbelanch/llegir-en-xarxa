// --- IconApp
//
//

import { assetsDPR } from '../config.js';
import Image from './image.js';

export default class IconApp extends Image
{
  constructor(scene, appConfig, x, y, texture, frame){
    super(scene, x, y, texture, frame);
    this.setInteractive();
    this.init();
    this.config = appConfig;
    this.balloon;
  };

  init()
  {
    // --- Interaction with the icon
    let t = this;
    t.on('pointerover', function(event){
      t.setAlpha(0.7);
    });

    t.on('pointerout', function(event){
      t.setAlpha(1.0);
    });

    t.on('pointerdown', function(event) {
      t.scene.scene.launch(t.config.key);
      t.scene.scene.sleep('Homescreen');
    });

  }

  addLabel(appname)
  {
    let t = this;
    let label = t.scene.add.text(
      t.x,
      t.y + t.height + (assetsDPR > 2.5 ? 18 : 4),
      t.config.name);
    label.setOrigin(0.5, 0);
    // Set text depending on assetsDPR value
    label.setFontSize(assetsDPR > 1.5 ? (assetsDPR >= 2.5 ? (assetsDPR > 3.5 ? 42 : 32) : 24) : 16);
    label.setFontFamily('Roboto');
    label.setShadow(2, 2, 0x3f3f3f, 0.4);
    label.setResolution(1);
  }

  addBalloon(counter)
  {
    let t = this;
    let offset = Math.floor(5*assetsDPR);

    if (t.balloon !== undefined) {
      t.balloon.destroy();
    }

    if (counter > 0) {
      let container = new Phaser.GameObjects.Container(
        t.scene,
        t.x + t.width/2 - offset,
        t.y + offset
      );

      container.add(new Phaser.GameObjects.Ellipse(
        t.scene,
        0,
        0,
        Math.floor(25*assetsDPR),
        Math.floor(25*assetsDPR),
        0xff0000,
        1.0
      ).setOrigin(0.5, 0.5));

      container.add(new Phaser.GameObjects.Text(
          t.scene,
          0,
          0,
          counter
        )
        .setOrigin(0.5, 0.5)
        .setFontSize(assetsDPR > 1.5 ? (assetsDPR >= 2.5 ? (assetsDPR > 3.5 ? 42 : 32) : 24) : 16)
        .setShadow(2, 2, 0x3f3f3f, 0.4)
        .setFontFamily('Roboto')
        .setResolution(1)
      );

      t.balloon = container;

      t.scene.add.existing(container);
    }
  }
}
