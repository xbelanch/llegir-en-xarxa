import { PhoneEvents } from '/scenes/Bootstrap';
export default class GameSettings {
    constructor(game) {
        this.game = game;
        this.options = {
            'muteSound': {
                'gameSetting': 'sound.mute',
                'value': this.game.sound.mute
            },
            'notificationPopup': {
                'value': false
            }
        };
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
            t.options[key]['value'] = value;

            // Update game setting (if any)
            if (t.options[key]['gameSetting'] !== undefined) {
                setPropertyInPath(
                    t.options[key]['gameSetting'],
                    t.game,
                    t.options[key]['value']
                );
            }
            t.game.events.emit(PhoneEvents.SettingsUpdated);
        }
    }

    getSettingValue(key)
    {
        let t = this;
        if (key in t.options) {
            return t.options[key]['value'];
        }
    }
}