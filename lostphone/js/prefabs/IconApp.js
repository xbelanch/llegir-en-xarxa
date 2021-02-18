import { assetsDPR } from "../Config";

// --- IconApp
export default class IconApp extends Phaser.GameObjects.Container
{
  constructor(scene, appConfig, x, y, texture, frame){
    super(scene, x, y, []);

    this.icon = new Phaser.GameObjects.Image(
      scene,
      x,y,
      texture,
      frame
    ).setInteractive().setScale(scene.assetsDPR / 4);
    this.add(this.icon);

    this.init();
    this.config = appConfig;
    this.balloon;

    scene.add.existing(this);
  };

  init()
  {
    // --- Interaction with the icon
    let t = this;
    t.icon.on('pointerover', function(event){
      t.setAlpha(0.7);
    });

    t.icon.on('pointerout', function(event){
      t.setAlpha(1.0);
    });

    t.icon.on('pointerup', function(event) {
      t.scene.scene.launch(t.config.key);
      t.scene.scene.sleep('Homescreen');
      t.scene.scene.get('PhoneUI').homeButton.setVisible(true);
    });

  }

  addLabel(appname)
  {
    let t = this;
    let label = t.scene.add.text(
      t.x,
      t.y + t.icon.displayHeight / 2 + t.scene.calcDPR(5),
      t.config.name);
    t.add(label);
    label.setOrigin(0.5, 0);
    // Set text depending on assetsDPR value
    label.setFontSize(t.scene.calcDPR(16));
    label.setFontFamily('Roboto');
    label.setShadow(2, 2, 0x3f3f3f, 0.4);
    label.setResolution(1);

    return this;
  }

  addBalloon(counter)
  {
    let t = this;
    let offset = t.scene.calcDPR(5);

    if (t.balloon !== undefined) {
      t.balloon.destroy();
    }

    if (counter > 0) {
      t.balloon = new Phaser.GameObjects.Container(
        t.scene,
        t.icon.displayWidth/2 - offset,
        - t.icon.displayHeight/2 + offset
      );

      t.balloon.add(new Phaser.GameObjects.Ellipse(
        t.scene,
        0,
        0,
        t.scene.calcDPR(25),
        t.scene.calcDPR(25),
        0xff0000,
        1.0
      ).setOrigin(0.5, 0.5));

      t.balloon.add(new Phaser.GameObjects.Text(
          t.scene,
          0,
          0,
          counter
        )
        .setOrigin(0.5, 0.5)
        .setFontSize(t.scene.calcDPR(16))
        .setShadow(2, 2, 0x3f3f3f, 0.4)
        .setFontFamily('Roboto')
        .setResolution(1)
      );

      t.add(t.balloon);
    }

    return this;
  }
}
