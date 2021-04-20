import Phaser from 'phaser';
import Handler from './Handler.js';
import Boot from './Boot.js';
import Preloader from './Preloader.js';
import PlayGround from './PlayGround.js';
import {width, height, dpr} from './Screen.js';

// Default Vertical Aspect Ratio: 9:16 (1:1.77)
// 0,5625
const MAX_SIZE_WIDTH_SCREEN = 1920;
const MAX_SIZE_HEIGHT_SCREEN = 1920;
const MIN_SIZE_WIDTH_SCREEN = 360;
const MIN_SIZE_HEIGHT_SCREEN = 640;
const SIZE_WIDTH_SCREEN = 720;
const SIZE_HEIGHT_SCREEN = 1280;

export const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ff00ff',
  title: 'Phaser 3 Resolution - Pixel Density',

  // Here's the trick
  scale: {
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN,
    mode: Phaser.Scale.RESIZE,
    parent: 'game',
    min: {
      width: MIN_SIZE_WIDTH_SCREEN,
      height: MIN_SIZE_HEIGHT_SCREEN
    },
    max: {
      width: MAX_SIZE_WIDTH_SCREEN,
      height: MAX_SIZE_HEIGHT_SCREEN
    }
  },
  scene: [
    Handler,
    Boot,
    Preloader,
    PlayGround
  ],
};

function newGame(gameConfig) {
  if (game) return;
  game = new Phaser.Game(gameConfig);

  game.screenBaseSize = {
    maxWidth: MAX_SIZE_WIDTH_SCREEN,
    maxHeight: MAX_SIZE_HEIGHT_SCREEN,
    minWidth: MIN_SIZE_WIDTH_SCREEN,
    minHeight: MIN_SIZE_HEIGHT_SCREEN,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
  };
  game.orientation = "portrait-primary";
}

function destroyGame() {
  if (!game) return;
  game.destroy(true);
  game.runDestroy();
  game = null;
}

let game;

if (!game) newGame(config);
