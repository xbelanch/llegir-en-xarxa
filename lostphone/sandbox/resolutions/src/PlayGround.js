import Phaser from 'phaser';
import {dpr, width} from './Screen.js';

class PlayGround extends Phaser.Scene {
  constructor() {
    super({ key : 'playground'});
    this.app = undefined;
    this.sampleText;
    this.graphics;
  }

  preload() {
    this.sceneStopped = false;
    this.width = this.game.screenBaseSize.width;
    this.height = this.game.screenBaseSize.height;
    this.handlerScene = this.scene.get('handler');
    this.handlerScene.sceneRunning = 'playground';
    this.scale.lockOrientation(this.game.orientation);

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
    this.graphics = this.add.graphics();

    // @BUG: Something weird is happening with text y-position :
    this.sampleText = this.add.text(this.width / 2, this.height / 2, 'Lorem Ipsum', { fontFamily: 'Arial', fontSize: '14px', color: '#fff', }).setOrigin(0.5);

    // Display four app icons in a row
    for (var i = 0; i < 4; i++) {
      var app = this.add.image(0, 0, 'app');
      app.setOrigin(0);
      app.setScale(1 / dpr);
      var margin = 36;
      var padding = 28;
      app.setPosition((i * app.width * (1/dpr) + (i * padding)) + margin, margin);
    }
    // GAME OBJECTS

  }

  update(){
    // Display text bounds only for testing purpose
    this.graphics.clear();
    this.graphics.lineStyle(1, 0xff0000, 1);
    this.graphics.strokeRectShape(this.sampleText.getBounds());
  }
}

export default PlayGround;
