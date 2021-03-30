import Phaser from 'phaser';
import Handler from './Handler.js';
import Boot from './Boot.js';
import Preloader from './Preloader.js';
import PlayGround from './PlayGround.js';
import {width, height, dpr} from './Screen.js';


// Default Vertical Aspect Ratio: 9:16 (1:1.77)
export const MAX_SIZE_WIDTH_SCREEN = 1080;
export const MAX_SIZE_HEIGHT_SCREEN = 1920;
export const MIN_SIZE_WIDTH_SCREEN = 360;
export const MIN_SIZE_HEIGHT_SCREEN = 640;
export const SIZE_WIDTH_SCREEN = 540;
export const SIZE_HEIGHT_SCREEN = 960;


export default {
  type: Phaser.WEBGL,
  backgroundColor: '#ff00ff',
  title: 'Phaser 3 Resolution - Pixel Density',
  mode: Phaser.Scale.RESIZE,
  parent: 'game',
  width: SIZE_WIDTH_SCREEN,
  height: SIZE_HEIGHT_SCREEN,
  min: {
    width: MIN_SIZE_WIDTH_SCREEN,
    height: MIN_SIZE_HEIGHT_SCREEN
  },
  max: {
    width: MAX_SIZE_WIDTH_SCREEN,
    height: MAX_SIZE_HEIGHT_SCREEN
  },
  // autoCenter: Phaser.Scale.CENTER_BOTH,
  // orientation: Phaser.Scale.Orientation.PORTRAIT,
  // scale: {
  //   zoom: 1 / dpr // Set the zoom to the inverse of the devicePixelRatio
  // },
  scene: [
    Handler,
    Boot,
    Preloader,
    PlayGround
  ],
};
