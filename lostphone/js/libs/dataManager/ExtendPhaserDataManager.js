/**
 * Serialize method
 */
Phaser.Data.DataManager.prototype.serialize = function() {
    return JSON.stringify(this.getAll());
};

/**
 * Unserialize method
 */
Phaser.Data.DataManager.prototype.unserialize = function(saveObject) {
    let values = JSON.parse(saveObject);
    for (key in values) {
        this.set(key, values[key]);
    }
    return true;
};