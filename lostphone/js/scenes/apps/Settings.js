import PhoneApp from '/scenes/main/PhoneApp';
import SwitchButton from '/prefabs/SwitchButton';
import ExclusivePopup from '/prefabs/ExclusivePopup';
import { PhoneEvents } from '/scenes/main/Bootstrap';

export default class SettingsApp extends PhoneApp
{
  constructor()
  {
    super({ key: 'SettingsApp'});
  }

  init() {
    let t = this;

    super.init();

    t.elements = {
      'options': {
        'fontSize': t.calcDPR(20),
        'x': t.width * 0.1,
        'padding': t.calcDPR(32)
      },
      'title': {
        'fontSize': t.calcDPR(26),
        'padding': t.calcDPR(40)
      }
    };
  }

  create()
  {
    let t = this;

    t.title = t.add.text(
        t.width / 2,
        t.UIelements['topBar']['height'] + t.elements['title']['padding'],
        'Configuració',
        {
          fontFamily: 'Roboto',
          fontSize : t.elements['title']['fontSize'],
          color: '#ffffff',
          align: 'center'
        }
    ).setOrigin(0.5, 0.5);

    t.add.line(
        0,0,
        t.width * 0.1,
        t.title.getBottomCenter().y + t.elements['title']['padding'],
        t.width * 0.9,
        t.title.getBottomCenter().y + t.elements['title']['padding'],
        0xffffff,
        1.0
    ).setOrigin(0,0);

    t.createOptions(t.title.getBottomCenter().y + t.elements['title']['padding'] + t.elements['options']['padding']);
  }

  createOptions(startY)
  {
    let t = this;

    // Option text
    t.add.text(
      t.elements['options']['x'],
      startY,
      'Silenciar el mòbil',
      {
        fontFamily: 'Roboto',
        fontSize : t.elements['options']['fontSize'],
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button (spritesheet)
    t.muteSwitch = new SwitchButton(
      t,
      t.width - t.elements['options']['x'],
      startY,
      'icons',
      t.game.settings.getSettingValue('muteSound')
    )
    .setRotation(Math.PI/2)
    .on('pointerup', function(){
      t.game.settings.toggleSetting('muteSound');
    });

    startY += t.elements['options']['fontSize'] + t.elements['options']['padding'];
    // Option text
    t.add.text(
      t.elements['options']['x'],
      startY,
      'Popups de notificacions',
      {
        fontFamily: 'Roboto',
        fontSize : t.elements['options']['fontSize'],
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button (spritesheet)
    t.popupSwitch = new SwitchButton(
      t,
      t.width - t.elements['options']['x'],
      startY,
      'icons',
      t.game.settings.getSettingValue('notificationPopup')
    )
    .setRotation(Math.PI/2)
    .on('pointerup', function(){
      t.game.settings.toggleSetting('notificationPopup');
    });

    startY += t.elements['options']['fontSize'] + t.elements['options']['padding'];
    // Option text
    t.add.text(
      t.elements['options']['x'],
      startY,
      'Esborrar tot el contingut',
      {
        fontFamily: 'Roboto',
        fontSize : t.elements['options']['fontSize'],
        color: '#ffffff',
        align: 'center'
      }
    );

    // Add button
    t.add.image(
      t.width - t.elements['options']['x'],
      startY,
      'icons',
      t.icons['warning']
    )
    .setInteractive()
    .setScale(2*t.assetsDPR)
    .on('pointerup', function(){
      t.resetToDefaults();
    });

    startY += t.elements['options']['fontSize'] + t.elements['options']['padding'];
    t.add.line(
      0,0,
      t.width * 0.1,
      startY,
      t.width * 0.9,
      startY,
      0xffffff,
      1.0
    ).setOrigin(0,0);

    startY += t.elements['options']['fontSize'] + t.elements['options']['padding'];
    t.add.text(
      t.width / 2,
      startY,
      'Sortir del miniop',
      {
        fontFamily: 'Roboto',
        fontSize : t.elements['options']['fontSize'],
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
        t.scene.get('PhoneUI').backHome();
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