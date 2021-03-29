import Phaser from 'phaser';
import Boot from './Boot.js';
import Preloader from './Preloader.js';
import PlayGround from './PlayGround.js';
import {width, height, dpr} from './Screen.js';

export default {
  type: Phaser.WEBGL,
  backgroundColor: '#ff00ff',
  width,
  height,
  title: 'Phaser 3 Resolution - Pixel Density',
  mode: Phaser.Scale.NONE, // we will resize the game with our own code
  autoCenter: Phaser.Scale.CENTER_BOTH,
  orientation: Phaser.Scale.Orientation.PORTRAIT,
  scale: {
    zoom: 1 / dpr // Set the zoom to the inverse of the devicePixelRatio
  },
  scene: [
    Boot,
    Preloader,
    PlayGround
  ],
};
