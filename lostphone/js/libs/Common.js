// --- Common
// --------------------------------------------------------
// Define some bunch of methods commons to all scenes

Object.defineProperty(Phaser.Structs.List.prototype, 'current', {
    get() {
        return this.getAt(this.position);
    }
});