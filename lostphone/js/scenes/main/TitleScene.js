import { assetsDPR } from '/Config';
import TextButton from '/prefabs/TextButton';
import Bootstrap from '/scenes/main/Bootstrap';
import Credits from '/scenes/main/Credits';

export default class TitleScene extends Phaser.Scene
{
  constructor()
  {
    super({ key : 'TitleScene' } );
    let t = this;
    t.assetsDPR = assetsDPR;
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
    //width /= t.assetsDPR;
    //height /= t.assetsDPR;

    // --- Set title start screen
    let back = t.add.image(Math.round(width/2), Math.round(height/3), 'Title').setOrigin(0.5, 0.5);

    // --- Add credits and start buttons
    let buttonWidth = width * 0.6;
    let buttonHeight = height * 0.1;

    let goCredits = new TextButton(
      this,
      new Phaser.Geom.Rectangle(
        width * 0.2,
        height / 2,
        buttonWidth,
        buttonHeight),
      "Crèdits",
      'Button',
      () => t.onClickGo('Credits')
    );

    this.add.existing(goCredits);

    let offset = 16 * t.assetsDPR;
    let goStart = new TextButton(
      t,
      new Phaser.Geom.Rectangle(
        width * 0.2,
        (goCredits.y + goCredits.height) + offset,
        buttonWidth,
        buttonHeight),
      "Entrar",
      'Button',
      () => this.onClickGo('Bootstrap')
    );

    t.add.existing(goStart);
  };

  // https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
  //
  onClickGo(scene) {
    let t = this;
    t.scene.start(scene);
  }

};
