import { PhoneEvents } from '/scenes/Bootstrap';
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

        for (let key in this.options) {
            this.game.state['settings'][key] = this.options[key]['defaultValue'];
        }
    }

    toggleSetting(key)
    {
        let t = this;
        t.setSettingValue(key, !t.getSettingValue(key));
    }

    setSettingValue(key, value)
    {
        let t = this;
        if (key in t.options) {
            t.game.state['settings'][key] = value;

            // Update game setting (if any)
            t.setGameConfigValue(key);
            t.game.events.emit(PhoneEvents.SettingsUpdated);
            t.game.save('autosave');
        }
    }

    setGameConfigValue(key) {
        let t = this;

        if (t.options[key]['gameSetting'] !== undefined) {
            setPropertyInPath(
                t.options[key]['gameSetting'],
                t.game,
                t.game.state['settings'][key]
            );
        }
    }

    getSettingValue(key)
    {
        let t = this;
        if (key in t.options) {
            return t.game.state['settings'][key];
        }

        return undefined;
    }

    fullSync()
    {
        let t = this;

        for (let key in t.options) {
            t.setGameConfigValue(key);
        }
    }
}