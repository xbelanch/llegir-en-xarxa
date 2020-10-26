// debug.js
//
// @Kenneth: és possible exportar aquest mètode?

Phaser.Scene.prototype.log = function(message) {
    message = '[Scene:' + this.scene.key + '] ' + message;

    if (this.game.debug) {
        console.log(message);
    }
}
