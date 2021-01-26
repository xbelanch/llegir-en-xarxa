import { assetsDPR } from '../../config';
import PhoneApp from '../PhoneApp';

export default class SettingsApp extends PhoneApp
{
  constructor()
  {
    super({ key: 'SettingsApp'});
  }

  create()
  {
    let t = this;

    t.add.text(
        t.width / 2,
        Math.floor(60 * assetsDPR),
        'Configuració',
        {
          fontFamily: 'Roboto',
          fontSize : Math.floor(13 * assetsDPR),
          color: '#ffffff',
          align: 'center'
        }
    ).setOrigin(0.5, 0.5);

    t.add.line(
        0,0,
        Math.floor(20 * assetsDPR),
        Math.floor(80 * assetsDPR),
        t.width - Math.floor(20 * assetsDPR),
        Math.floor(80 * assetsDPR),
        0xffffff,
        1.0
    ).setOrigin(0,0);

    t.createOptions(100);
  }

  createOptions(startY)
  {
    let t = this;

    // Option text
    t.add.text(
      Math.floor(20 * assetsDPR),
      Math.floor(startY * assetsDPR),
      'Sons',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button (spritesheet)


    startY += 30;
    // Option text
    t.add.text(
      Math.floor(20 * assetsDPR),
      Math.floor(startY * assetsDPR),
      'Esborrar tot el contingut i ajustaments',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button

    startY += 40;
    t.add.line(
      0,0,
      Math.floor(20 * assetsDPR),
      Math.floor(startY * assetsDPR),
      t.width - Math.floor(20 * assetsDPR),
      Math.floor(startY * assetsDPR),
      0xffffff,
      1.0
    ).setOrigin(0,0);

    startY += 20;
    t.add.text(
      t.width / 2,
      Math.floor(startY * assetsDPR),
      'Sortir del miniop',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * assetsDPR),
        color: '#ff0000',
        align: 'center'
      }
    )
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', function(){
      window.location.href = "https://ioc.xtec.cat";
    });
  }
}