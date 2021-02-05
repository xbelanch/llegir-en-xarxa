import PhoneApp from '/scenes/PhoneApp';
import SwitchButton from '/prefabs/switchButton';
import ExclusivePopup from '/prefabs/exclusivePopup';
import { PhoneEvents } from '../Bootstrap';

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
        Math.floor(60 * t.assetsDPR),
        'Configuració',
        {
          fontFamily: 'Roboto',
          fontSize : Math.floor(13 * t.assetsDPR),
          color: '#ffffff',
          align: 'center'
        }
    ).setOrigin(0.5, 0.5);

    t.add.line(
        0,0,
        Math.floor(20 * t.assetsDPR),
        Math.floor(80 * t.assetsDPR),
        t.width - Math.floor(20 * t.assetsDPR),
        Math.floor(80 * t.assetsDPR),
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
      Math.floor(20 * t.assetsDPR),
      Math.floor(startY * t.assetsDPR),
      'Silenciar el mòbil',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * t.assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button (spritesheet)
    t.muteSwitch = new SwitchButton(
      t,
      Math.floor(t.width - (2 * 20 * t.assetsDPR)),
      Math.floor(startY * t.assetsDPR),
      'icons',
      t.game.settings.getSettingValue('muteSound')
    )
    .setRotation(Math.PI/2)
    .on('pointerup', function(){
      t.game.settings.toggleSetting('muteSound');
    });

    startY += marginY;
    // Option text
    t.add.text(
      Math.floor(20 * t.assetsDPR),
      Math.floor(startY * t.assetsDPR),
      'Popups de notificacions',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * t.assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button (spritesheet)
    t.popupSwitch = new SwitchButton(
      t,
      Math.floor(t.width - (2 * 20 * t.assetsDPR)),
      Math.floor(startY * t.assetsDPR),
      'icons',
      t.game.settings.getSettingValue('notificationPopup')
    )
    .setRotation(Math.PI/2)
    .on('pointerup', function(){
      t.game.settings.toggleSetting('notificationPopup');
    });

    startY += marginY;
    // Option text
    t.add.text(
      Math.floor(20 * t.assetsDPR),
      Math.floor(startY * t.assetsDPR),
      'Esborrar tot el contingut i ajustaments',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * t.assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button
    t.add.image(
      Math.floor(t.width - (2 * 20 * t.assetsDPR)),
      Math.floor(startY * t.assetsDPR),
      'icons',
      t.icons['warning']
    )
    .setInteractive()
    .setScale(2*t.assetsDPR)
    .on('pointerup', function(){
      t.resetToDefaults();
    });

    startY += marginY + 10;
    t.add.line(
      0,0,
      Math.floor(20 * t.assetsDPR),
      Math.floor(startY * t.assetsDPR),
      t.width - Math.floor(20 * t.assetsDPR),
      Math.floor(startY * t.assetsDPR),
      0xffffff,
      1.0
    ).setOrigin(0,0);

    startY += marginY;
    t.add.text(
      t.width / 2,
      Math.floor(startY * t.assetsDPR),
      'Sortir del miniop',
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * t.assetsDPR),
        color: '#ff0000',
        align: 'center'
      }
    )
    .setOrigin(0.5)
    .setInteractive()
    .on('pointerdown', function(){
      window.location.href = "https://ioc.xtec.cat";
    });

    t.game.events.on(PhoneEvents.SettingsUpdated, () => t.updateSwitches());
  }

  resetToDefaults()
  {
    let t = this;
    new ExclusivePopup(t, 'Esteu segurs de voler esborrar tot el progrés?',
    {
      'type': 'yesno',
      'yesfunction': function() {
        t.game.deleteState();
      }
    });
  }

  updateSwitches()
  {
    let t = this;
    t.muteSwitch.updateState(t.game.settings.getSettingValue('muteSound'));
    t.popupSwitch.updateState(t.game.settings.getSettingValue('notificationPopup'));
  }
}