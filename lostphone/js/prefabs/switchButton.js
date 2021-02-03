// --- SwitchButton
export default class SwitchButton extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture, state) {
        super(scene, x, y, texture, scene.icons['switchOff']);

        let t = this;

        t.updateState(state);
        t.setInteractive().setScale(2*scene.assetsDPR);
        scene.add.existing(t);
    }

    updateState(state)
    {
        let t = this;
        t.setFrame(t.scene.icons[state ? 'switchOn' : 'switchOff']);
    }
}