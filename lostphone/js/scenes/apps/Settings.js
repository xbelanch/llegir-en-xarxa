import { assetsDPR } from '/Config';
import PhoneApp from '/scenes/PhoneApp';
import SwitchButton from '/prefabs/switchButton';

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
    let marginY = 40;

    // Option text
    t.add.text(
      Math.floor(20 * assetsDPR),
      Math.floor(startY * assetsDPR),
      'Silenciar el mòbil',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button (spritesheet)
    new SwitchButton(
      t,
      Math.floor(t.width - (2 * 20 * assetsDPR)),
      Math.floor(startY * assetsDPR),
      'icons',
      'sound.mute'
    )
    .setRotation(Math.PI/2);

    startY += marginY;
    // Option text
    t.add.text(
      Math.floor(20 * assetsDPR),
      Math.floor(startY * assetsDPR),
      'Popups de notificacions',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button (spritesheet)
    new SwitchButton(
      t,
      Math.floor(t.width - (2 * 20 * assetsDPR)),
      Math.floor(startY * assetsDPR),
      'icons',
      'notifications.popup'
    )
    .setRotation(Math.PI/2);


    startY += marginY;
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
    t.add.image(
      Math.floor(t.width - (2 * 20 * assetsDPR)),
      Math.floor(startY * assetsDPR),
      'icons',
      t.icons['warning']
    )
    .setInteractive()
    .setScale(2*assetsDPR)
    .on('pointerup', function(){
      t.game.deleteState();
    });

    startY += marginY + 10;
    t.add.line(
      0,0,
      Math.floor(20 * assetsDPR),
      Math.floor(startY * assetsDPR),
      t.width - Math.floor(20 * assetsDPR),
      Math.floor(startY * assetsDPR),
      0xffffff,
      1.0
    ).setOrigin(0,0);

    startY += marginY;
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