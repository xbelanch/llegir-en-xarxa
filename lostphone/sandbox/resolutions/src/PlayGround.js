import Phaser from 'phaser';
import {dpr, width} from './Screen.js';

class PlayGround extends Phaser.Scene {
  constructor() {
    super({ key : 'playground'});
    this.app = undefined;
  }

  preload() {
    this.sceneStopped = false;
    this.width = this.game.screenBaseSize.width;
    this.height = this.game.screenBaseSize.height;
    this.handlerScene = this.scene.get('handler');
    this.handlerScene.sceneRunning = 'playground';
  }

  create() {

    // This will prevent pixels from being drawn at half coordinates. It will also help stick your tilemaps together.
    this.cameras.main.setRoundPixels(true);

    // CONFIG SCENE
    const { width , height } = this;
    this.handlerScene.updateResize(this);
    // CONFIG SCENE

    // DEBUG
    this.add.image(0, 0, 'guide').setOrigin(0).setDepth(1);
    // DEBUG


    // GAME OBJECTS
    this.app = this.add.image(0, 0, 'app').setOrigin(0);
    // GAME OBJECTS

  }

  // update() {}

}

export default PlayGround;
