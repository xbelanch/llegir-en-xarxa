import PhoneApp from '/scenes/main/PhoneApp';
import SwitchButton from '/prefabs/SwitchButton';
import ExclusivePopup from '/prefabs/ExclusivePopup';
import { PhoneEvents } from '/libs/Const';

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
        'padding': t.calcDPR(28)
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

    t.title = t.add.text(0,0,
      'Configuració',
      t.getTextProperties({fontSize : t.elements['title']['fontSize']})
    );

    t.addRow(t.title);

    const line = t.add.line(0,0,
      0, 0,
      t.width * 0.8, 0,
      0xffffff, 1.0
    );

    t.addRow(line);

    t.createOptions();
  }

  createOptions()
  {
    let t = this;

    // Mute option
    let text1 = t.add.text(0,0,
      'Silenciar el mòbil',
      t.getTextProperties({fontSize : t.elements['options']['fontSize']})
    );

    // Add button
    t.muteSwitch = new SwitchButton(t, 0, 0,
      'icons',
      t.game.settings.getSettingValue('muteSound')
    ).setRotation(Math.PI/2)
    .on('pointerup', function(){
      t.game.settings.toggleSetting('muteSound');
    });

    t.addRow(['',text1,'',t.muteSwitch]);

    // Popups option
    let text2 = t.add.text(0, 0,
      'Popups de notificacions',
      t.getTextProperties({fontSize : t.elements['options']['fontSize']})
    );

    t.popupSwitch = new SwitchButton(t, 0, 0,
      'icons',
      t.game.settings.getSettingValue('notificationPopup')
    )
    .setRotation(Math.PI/2)
    .on('pointerup', function(){
      t.game.settings.toggleSetting('notificationPopup');
    });

    t.addRow(['',text2,'', t.popupSwitch]);

    // Reset game option
    let text3 = t.add.text(0, 0,
      'Esborrar tot el contingut',
      t.getTextProperties({fontSize : t.elements['options']['fontSize']})
    );

    let button3 = t.add.image(0, 0,
      'icons',
      t.icons['warning']
    )
    .setInteractive()
    .setScale(2*t.assetsDPR)
    .on('pointerup', function(){
      t.resetToDefaults();
    });

    t.addRow(['',text3,'',button3]);

    let line = t.add.line(
      0,0,
      0,0,
      t.width * 0.8, 0,
      0xffffff,
      1.0
    ).setOrigin(0,0);

    t.addRow(line);

    let text4 = t.add.text(0, 0,
      'Sortir del miniop',
      t.getTextProperties({fontSize : t.elements['options']['fontSize'], color: '#ff0000'})
    )
    .setInteractive()
    .on('pointerdown', function(){
      window.location.href = "https://ioc.xtec.cat";
    });

    t.addRow(text4);

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
        location.reload();
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