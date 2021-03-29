import Phaser from 'phaser';
import {dpr, width} from './Screen.js';

class PlayGround extends Phaser.Scene {
  constructor() {
    super({ key : 'playground'});
    this.app = undefined;
  }

  create() {
    // console.log("PlayGround is here!");
    // let progress = this.add.graphics();
    // progress.clear();
    // progress.fillStyle(0xe5ffff, 1);
    // console.log(width);
    // progress.fillRect(0, (window.innerHeight / 2 * dpr) - 40, width * 0.5, 80 * dpr);

    // This will prevent pixels from being drawn at half coordinates. It will also help stick your tilemaps together.
    this.cameras.main.setRoundPixels(true);

    // Add the icon app like any other image
    this.image = this.add.image(0, 0, 'app').setOrigin(0);

  }

  // update() {}

}

export default PlayGround;
