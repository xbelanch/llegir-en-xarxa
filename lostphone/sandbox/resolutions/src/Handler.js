import Phaser from 'phaser';
import Boot from './Boot.js';
import { dpr, setBackgroundPicture } from './Screen.js';

class Handler extends Phaser.Scene {

  constructor() {
    super({ key : 'handler' });
    this.sceneRunning = null;
  }

  create() {
    this.cameras.main.setBackgroundColor('#f00');
    this.launchScene('boot');
  }

  launchScene(scene, data) {
    this.scene.launch(scene, data);
    this.gameScene = this.scene.get(scene);
  }

  updateResize(scene) {
    scene.scale.on('resize', this.resize, scene);

    const scaleWidth = scene.scale.gameSize.width;
    const scaleHeight = scene.scale.gameSize.height;

    scene.parent = new Phaser.Structs.Size(scaleWidth, scaleHeight);
    scene.sizer = new Phaser.Structs.Size(scene.width, scene.height, Phaser.Structs.Size.FIT, scene.parent);

    scene.parent.setSize(scaleWidth, scaleHeight);
    scene.sizer.setSize(scaleWidth, scaleHeight);

    this.updateCamera(scene);
  }

  resize(gameSize) {
    // 'this' means current scene that is running
    if (!this.sceneStopped) {
      const width = gameSize.width;
      const height = gameSize.height;

      this.parent.setSize(width, height);
      this.sizer.setSize(width, height);

      // updateCamera - TO DO: Improve the next code because it is duplicated
      const camera = this.cameras.main;

      const scaleX = this.sizer.width / this.game.screenBaseSize.width;
      const scaleY = this.sizer.height / this.game.screenBaseSize.height;

      let zoom = Math.max(scaleX, scaleY);
      camera.setZoom(zoom);

      // Remove background picture if inner width screen is less than base width
      setBackgroundPicture(this);

      camera.centerOn(this.game.screenBaseSize.width / 2, this.game.screenBaseSize.height / 2);
    }
  }

    updateCamera(scene) {
      const camera = scene.cameras.main;
      const scaleX = scene.sizer.width / this.game.screenBaseSize.width;
      const scaleY = scene.sizer.height / this.game.screenBaseSize.height;

      let zoom = Math.max(scaleX, scaleY);
      camera.setZoom(zoom);

      camera.centerOn(this.game.screenBaseSize.width / 2, this.game.screenBaseSize.height / 2);
    }

}

export default Handler;