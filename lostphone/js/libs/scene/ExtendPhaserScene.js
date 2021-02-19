// Phaser.Scene
Phaser.Scene.prototype.log = function(message) {
    message = '[Scene:' + this.scene.key + '] ' + message;

    if (this.game.debug) {
        console.log(message);
    }
}

Phaser.Scene.prototype.calcDPR = function(elem) {
    return Math.ceil(elem * this.assetsDPR);
}