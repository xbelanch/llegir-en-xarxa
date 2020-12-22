import App from '../App.js';

export default class TestApp extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'TestApp'});
  }

  create()
  {
    this.cameras.main.setBackgroundColor(0xc3c3c3);
    console.log("It works!");
  }

  update(delta, time)
  {

  }
}
