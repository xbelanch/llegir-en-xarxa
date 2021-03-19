import Phaser from 'phaser';
import {DPR} from './dpr';

export default class PlayGround extends Phaser.Scene {
  constructor() {
    super({ key : 'play'});
  }

  create() {
    console.log(DPR);
  }

  update() {}

}
