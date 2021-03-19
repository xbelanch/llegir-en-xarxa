import Phaser from 'phaser';
import BootScene from './BootScene.js';
import PlayGround from './PlayGround.js';

const width = 320;
const height = 240;

export default {
  type: Phaser.AUTO,
  backgroundColor: '#ff00ff',
  width,
  height,
  title: 'Phaser 3 Resolution - Pixel Density',
  scene: [BootScene, PlayGround]
};
