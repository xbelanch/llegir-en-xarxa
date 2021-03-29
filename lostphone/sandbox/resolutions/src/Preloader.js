import {dpr, width} from './Screen.js';

class Preloader extends Phaser.Scene {

  constructor() {
    super({ key : 'preloader' });
  }

  preload() {
    // just a preload bar in graphics
    let progress = this.add.graphics();
    this.load.on('progress', function (value) {
      progress.clear();
      progress.fillStyle(0xe5ffff, 1);
      progress.fillRect(0, (window.innerHeight / 2 * dpr) - 30, width * value * dpr, 120);
    });
    this.load.on('complete', function () {
      progress.destroy();
    });

    // load assets here
    let imageSize = dpr * 128; // 64, 128, 256, 512
    this.load.image('app', 'assets/app@' + imageSize + 'x.png');

    // testing some shitty bind recursive loop
    // this.onPlay();
  }

  create() {
    this.scene.start('playground');
  }

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
