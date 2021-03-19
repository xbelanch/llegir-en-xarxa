import Phaser from 'phaser';
import BootScene from './BootScene';
import PlayGround from './PlayGround';
import {width, height, dpr} from './Screen';

export default {
  type: Phaser.WEBGL,
  backgroundColor: '#ff00ff',
  width,
  height,
  title: 'Phaser 3 Resolution - Pixel Density',
  scene: [BootScene, PlayGround],
  mode: Phaser.Scale.ScaleModes.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  orientation: Phaser.Scale.Orientation.PORTRAIT,
  scale: {
    zoom: 1 / dpr
  }
};
