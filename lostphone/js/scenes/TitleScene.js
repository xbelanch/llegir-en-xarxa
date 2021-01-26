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
    let t = this;
    t.load.image('Title', 'assets/images/title.png');
    t.load.image('Button-Idle', 'assets/images/kennyBlue.png');
  };

  init()
  {
    let t = this;
    t.scene.add('Bootstrap', Bootstrap);
    t.scene.add('Credits', Credits);
  };

  create()
  {
    let t = this;
    // --- Get width and height from camera and aplly DPR factor
    let { width, height } = t.cameras.main;
    width /= assetsDPR;
    height /= assetsDPR;

    // --- Set title start screen
    let back = new Image(t, Math.round(width/2), Math.round(height/3), 'Title');
    back.setOrigin(0.5, 0.5);
    t.children.add(back);

    // --- Add credits and start buttons
    let buttonWidth = 120;
    let buttonHeight = 45;

    let goCredits = new TextButton(
      this,
      new Phaser.Geom.Rectangle(
        width / 2,
        height,
        buttonWidth,
        buttonHeight),
      "Crèdits",
      'Button',
      () => t.onClickGo('Credits')
    );

    this.children.add(goCredits);

    let offset = 16 * assetsDPR;
    let goStart = new TextButton(
      t,
      new Phaser.Geom.Rectangle(
        width / 2,
        (goCredits.y + goCredits.height * assetsDPR) + offset,
        buttonWidth,
        buttonHeight),
      "Entrar",
      'Button',
      () => this.onClickGo('Bootstrap')
    );

    t.children.add(goStart);
  };

  // https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
  //
  onClickGo(scene) {
    let t = this;
    t.scene.start(scene);
  }

};
