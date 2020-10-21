// @Todo: create a Popup based on Text phaser and
// https://labs.phaser.io/edit.html?src=src/game%20objects/text/static/speech%20bubble.js&v=3.23.0
// for displaying error messages
class Popup extends Phaser.GameObjects.Container
{
  constructor(scene, text, params)
  {
    super(scene, 0, -70, []);

    let space = 0;
    if (params === undefined) {
        params = {};
    }

    // Notification box
    this.add(new Phaser.GameObjects.Rectangle(
        scene, 
        scene.x,
        0, 
        scene.width - 80,
        140,
        0x000000,
        0.6
    ));

    if (params['icon'] !== undefined) {
        // Notification icon
        this.add(new Phaser.GameObjects.Image(
            scene,
            120,
            0,
            params['icon']
        ));

        space = 120;
    }

    // Notification text
    let containerText = new Phaser.GameObjects.Text(
        scene, 
        space + 60,
        0, 
        text
    );


    this.add(containerText);

    scene.add.existing(this);
    this.isActive = false;
  }

}
