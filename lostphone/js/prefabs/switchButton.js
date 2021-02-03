// --- SwitchButton
import { assetsDPR } from '/Config';

export default class SwitchButton extends Phaser.GameObjects.Image
{
    constructor(scene, x, y, texture, settingKey) {
        super(scene, x, y, texture, scene.icons['switchOff']);

        let t = this;

        if(t.resolve(settingKey, t.scene.game)) {
            this.setFrame(scene.icons['switchOn']);
        }

        t.setInteractive().setScale(2*assetsDPR);
        t.on('pointerup', function(){
            t.resolve(settingKey,t.scene.game) === true  ? t.setFrame(t.scene.icons['switchOff']) : t.setFrame(t.scene.icons['switchOn']);
            t.set(settingKey, t.scene.game, !t.resolve(settingKey, t.scene.game));
        });

        scene.add.existing(t);
    }

    resolve(path, obj) {
        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : null
        }, obj || self)
    }

    set(path, obj, value) {
        var schema = obj;
        var pList = path.split('.');
        var len = pList.length;
        for(var i = 0; i < len-1; i++) {
            var elem = pList[i];
            if( !schema[elem] ) schema[elem] = {}
            schema = schema[elem];
        }

        schema[pList[len-1]] = value;
    }
}