import Phaser from 'phaser';
import gameConfig from './gameConfig.js';
import { // What f*cking u doin?
  MAX_SIZE_WIDTH_SCREEN,
  MAX_SIZE_HEIGHT_SCREEN,
  MIN_SIZE_WIDTH_SCREEN,
  MIN_SIZE_HEIGHT_SCREEN,
  SIZE_WIDTH_SCREEN,
  SIZE_HEIGHT_SCREEN
} from './gameConfig.js';


function newGame() {
  if (game) return;
  game = new Phaser.Game(gameConfig);

  // Globals
  game.screenBaseSize = {
    maxWidth: MAX_SIZE_WIDTH_SCREEN,
    maxHeight: MAX_SIZE_HEIGHT_SCREEN,
    minWidth: MIN_SIZE_WIDTH_SCREEN,
    minHeight: MIN_SIZE_HEIGHT_SCREEN,
    width: SIZE_WIDTH_SCREEN,
    height: SIZE_HEIGHT_SCREEN
  };
  game.orientation = "portrait";
}

function destroyGame() {
  if (!game) return;
  game.destroy(true);
  game.runDestroy();
  game = null;
}

let game;

if (!game) newGame();
