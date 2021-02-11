import TextBox from '/prefabs/TextBox';

export default class Notifications extends TextBox
{
    constructor(scene, text, key, params)
    {
        super(scene, text, params);
        this.key = key;
    }

    destroyBox() {
        let index = this.scene.game.state['notifications'].indexOf(this.key);
        if (index !== -1) this.scene.game.state['notifications'].splice(index, 1);
        this.scene.game.save();

        super.destroy();
    }
}