import {dpr, width} from './Screen.js';

class Preloader extends Phaser.Scene {

  constructor() {
    super({ key : 'preloader' });
  }

  preload() {
    // load assets here
    let imageSize = dpr * 128; // 64, 128, 256, 512
    this.load.image('app', 'assets/app@' + imageSize + 'x.png');
    this.load.image('guide', 'assets/540x960-guide.png');


    // Handler stuff
    this.handlerScene = this.scene.get('handler');
    // this.handlerScene.sceneRunning = 'preload';

    // just a preload bar in graphics
    let progress = this.add.graphics();
    this.load.on('progress', function (value) {
      progress.clear();
      progress.fillStyle(0xe5ffff, 1);
      progress.fillRect(0, (window.innerHeight / 2 * dpr) - 30, width * value * dpr, 120);
    });
    this.load.on('complete', () => {
      progress.destroy();

      this.scene.stop('preloader');
      this.handlerScene.cameras.main.setBackgroundColor("#020079");
      this.handlerScene.launchScene('playground');
    });


  }

  create() {
    // resize here
  }

  // testing some shitty bind recursive loop
  // this.onPlay();
  // This never happened
  // but...
  // onPlay(){
  //   let that = this;
  //   (function loop() {
  //       let randomTime = Math.round(Math.random() * 3000) + 500;
  //       setTimeout(()=> {
  //         console.log(randomTime);
  //         loop();
  //       }, randomTime);
  //   }());
  // }

}

export default Preloader;
