import TextBox from '/prefabs/TextBox';

export default class Notifications extends TextBox
{
    constructor(scene, text, key, params)
    {
        super(scene, text, params);
        this.key = key;
    }

    destroyBox() {
        let t = this;

        let notifications = t.scene.game.registry.get('notifications');
        let index = notifications.indexOf(this.key);
        if (index !== -1) notifications.splice(index, 1);
        t.scene.game.registry.set('notifications', notifications);
        t.scene.game.save();

        super.destroy();
    }
}