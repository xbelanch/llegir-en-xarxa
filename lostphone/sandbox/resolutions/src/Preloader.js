import {dpr, width} from './Screen.js';

class Preloader extends Phaser.Scene {

  constructor() {
    super({ key : 'preloader' });
    this.width = null;
    this.height = null;
    this.handlerScene = null;
    this.sceneStopped = false;
  }

  preload() {
    // load assets here
    let imageSize = dpr * 128; // 64, 128, 256, 512
    this.load.image('app', 'assets/app@' + imageSize + 'x.png');
    // this.load.image('guide', 'assets/540x960-guide.png');
    this.load.image('guide', 'assets/720x1280-guide.png');
    // ---------------------------------------------------------


    this.canvasWidth = this.sys.game.canvas.width;
    this.canvasHeight = this.sys.game.canvas.height;

    this.width = this.game.screenBaseSize.width;
    this.height = this.game.screenBaseSize.height;

    this.handlerScene = this.scene.get('handler');
    this.handlerScene.sceneRunning = 'preload';
    this.sceneStopped = false;

    // simple preload again
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x0, 0.8);
    progressBox.fillRect((this.canvasWidth / 2) - (210 / 2),
                         (this.canvasHeight / 2) - 5,
                         210, 30);
    let progressBar = this.add.graphics();


    this.load.on('progress',  (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xe5ffff, 1);
      progressBar.fillRect((this.canvasWidth / 2) - (200 / 2),
                           (this.canvasHeight / 2),
                           200 * value, 20);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      this.time.addEvent({
        delay: 1000,
        callback: () => {
          this.sceneStopped = true;
          this.scene.stop('preload');
          this.handlerScene.cameras.main.setBackgroundColor("#020079");
          this.handlerScene.launchScene('playground');
        }
      });
    });
  }

  create() {
    const { width, height } = this;

    // CONFIG SCENE
    this.handlerScene.updateResize(this);

    // GAME OBJECTS

    // GAME OBJECTS
  }

}

export default Preloader;
