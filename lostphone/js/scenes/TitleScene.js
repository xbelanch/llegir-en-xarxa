import { assetsDPR } from '../config.js'
import Image from '../prefabs/Image.js'
import TextButton from '../prefabs/TextButton.js'
import Bootstrap from './Bootstrap.js'
import Credits from './Credits.js'

export default class TitleScene extends Phaser.Scene
{
  constructor()
  {
    super({ key : 'TitleScene' } );
  };

  preload()
  {
    this.load.image('Title', 'assets/images/title.png');
    this.load.image('Button-Idle', 'assets/images/kennyBlue.png');
  };

  init()
  {
    this.scene.add('Bootstrap', Bootstrap);
    this.scene.add('Credits', Credits);
  };

  create()
  {
    // --- Get width and height from camera and aplly DPR factor
    var { width, height } = this.cameras.main;
    width /= assetsDPR;
    height /= assetsDPR;

    // --- Set title start screen
    var back = new Image(this, Math.round(width/2), Math.round(height/3), 'Title');
    back.setOrigin(0.5, 0.5);
    this.children.add(back);

    // --- Add credits and start buttons
    var buttonWidth = 120;
    var buttonHeight = 45;

    var goCredits = new TextButton(
      this,
      new Phaser.Geom.Rectangle(
        width / 2,
        height,
        buttonWidth,
        buttonHeight),
      "Crèdits",
      'Button',
      () => this.onClickGo('Credits')
    );

    this.children.add(goCredits);

    var offset = 16 * assetsDPR;
    var goStart = new TextButton(
      this,
      new Phaser.Geom.Rectangle(
        width / 2,
        (goCredits.y + goCredits.height * assetsDPR) + offset,
        buttonWidth,
        buttonHeight),
      "Entrar",
      'Button',
      () => this.onClickGo('Bootstrap')
    );

    this.children.add(goStart);
  };

  // https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
  //
  onClickGo(scene) {
      this.scene.start(scene);
  }

};
