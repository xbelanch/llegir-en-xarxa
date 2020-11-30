import { assetsDPR } from '../main.js'
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
    this.load.image('Button', 'assets/images/button.png');
  };

  init()
  {
    this.scene.add('Bootstrap', Bootstrap);
    this.scene.add('Credits', Credits);
  };

  create()
  {
    var { width, height } = this.cameras.main;
    width /= assetsDPR;
    height /= assetsDPR;

    var back = new Image(this, Math.round(width/2), Math.round(height/3), 'Title');
    back.setOrigin(0.5, 0.5);
    this.children.add(back);


    var goCredits = new TextButton(
      this,
      new Phaser.Geom.Rectangle(
        Math.round(width/2),
        Math.round(height/3),
        100,
        100),
      "Crèdits",
      'Button',
      this.onClickGo.bind(null, 'Credits')
    );

    this.children.add(goCredits);

    var goStart = new TextButton(
      this,
      new Phaser.Geom.Rectangle(
        Math.round(width/3),
        Math.round(height/2),
        80,
        10),
      "Entrar",
      'Button',
      this.onClickGo.bind(null, 'Bootstrap')
    );

    this.children.add(goStart);
  };

  // https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
  //
  onClickGo = (function(scene) {
    this.scene.start(scene);
  }).bind(this);

};
