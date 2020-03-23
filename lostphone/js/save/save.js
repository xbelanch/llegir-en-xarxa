/**
 * Save a state and save the game
 */
Phaser.Game.prototype.saveState = function(app, key, value) {
    this.state[app][key] = value;
    this.save('autosave');
}

/**
 * Get a state
 */
Phaser.Game.prototype.getState = function(app, key) {
    return this.state[app][key];
}

/**
 * Check if condition is fulfilled
 */
Phaser.Game.prototype.checkCondition = function(conditions) {
    let complete = true;

    if (conditions === null) {
        return complete;
    }

    if (!Array.isArray(conditions)) {
        conditions = [conditions];
    }

    for (let i=0; i<conditions.length; i++) {
        if (!this.getState('complete', conditions[i])) {
            complete = false;
            break;
        }
    }

    return complete;
}

/**
 * Serialize method
 */
Phaser.Game.prototype.serialize = function() {
    return JSON.stringify(this.state);
};

/**
 * Unserialize method
 */
Phaser.Game.prototype.unserialize = function(saveObject) {
    this.state = JSON.parse(saveObject);
    return true;
};

/**
 * Save the game state.
 */
Phaser.Game.prototype.save = function(key) {
    if (key === undefined) key = 'default';
    localStorage.setItem('save-'+key, this.serialize());
};

/**
 * Load a game state.
 *
 */
Phaser.Game.prototype.loadSave = function(key) {
    if (key === undefined) key = 'default';
    var state = localStorage.getItem('save-'+key);
    if (state) {
        this.unserialize(state);
    }
    console.log('Loaded ' +key);
};

/**
 * Autosave on
 */
Phaser.Game.prototype.autosaveOn = function(interval) {
    if (interval === undefined) interval = 5000;
    var self = this;
    this.autosaveTimer = setInterval(function() {
        console.log("Autosaving...");
        self.save('autosave');
    }, interval);
};

/**
 * Autosave off
 */
Phaser.Game.prototype.autosaveOff = function() {
    if (this.autosaveTimer) {
        clearInterval(this.autosaveTimer);
        this.autosaveTimer = null;
    }
};
