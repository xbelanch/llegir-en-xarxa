import { PhoneEvents } from '/libs/Const';
export default class GameSettings {
  constructor(game) {
    this.game = game;
    this.options = {
      'muteSound': {
          'gameSetting': 'sound.mute',
          'defaultValue': false
      },
      'notificationPopup': {
          'defaultValue': false
      }
    };

    let settings = this.game.registry.get('settings');
    for (let key in this.options) {
      settings[key] = this.options[key]['defaultValue'];
      this.game.registry.set('settings', settings);
    }
  }

  /**
   * Toggle a game setting
   * @param {*} key
   */
  toggleSetting(key)
  {
    let t = this;
    t.setSettingValue(key, !t.getSettingValue(key));
  }

  /**
   * Set a value to a setting
   * @param {*} key
   * @param {*} value
   */
  setSettingValue(key, value)
  {
    let t = this;
    let settings = this.game.registry.get('settings');

    if (key in t.options) {
      settings[key] = value;
      this.game.registry.set('settings', settings);

      // Update game setting (if any)
      t.setGameConfigValue(key);
      t.game.events.emit(PhoneEvents.SettingsUpdated);
      t.game.save('autosave');
    }
  }

  /**
   * Change a Phaser game setting with the stored value
   * @param {*} key
   */
  setGameConfigValue(key) {
    let t = this;
    let settings = this.game.registry.get('settings');

    if (t.options[key]['gameSetting'] !== undefined) {
      setPropertyInPath(
        t.options[key]['gameSetting'],
        t.game,
        settings[key]
      );
    }
  }

  /**
   * Get a setting value
   * @param {*} key
   */
  getSettingValue(key)
  {
    let t = this;
    let settings = this.game.registry.get('settings');

    if (key in t.options) {
      return settings[key];
    }

    return undefined;
  }

  /**
   * Sync all PhaserGame settings
   */
  fullSync()
  {
    let t = this;

    for (let key in t.options) {
      t.setGameConfigValue(key);
    }
  }
}