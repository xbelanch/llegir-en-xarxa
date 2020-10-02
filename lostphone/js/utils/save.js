/**
 * Save the game state 
 * Source: https://github.com/xbelanch/llegir-en-xarxa/compare/password#diff-09cb85cb83d4a472620eba8dfb8eb5d9
 * Source: https://github.com/xbelanch/llegir-en-xarxa/commits/3d4cfd1286cea0249b5327c77b6d6f76d11bf757/lostphone/js/save/save.js
 */

/**
 * Update URL with password
 */
Phaser.Game.prototype.getPassword = function() {
  const url = window.location.href;
  const param = 'pass';
  const reg = new RegExp( '[?&]' + param + '=([^&#]*)', 'i' );
  const passValue = reg.exec(url);

  return passValue;
};

Phaser.Game.prototype.updateURL = function(value) {
  const url = window.location.href;
  const passValue = this.getPassword();

  let path = url;
  if (passValue) {
       path = url.replace(passValue[0], "");
  }

  window.history.pushState("", "", path + '?pass=' + value);
};


/**
 * Save a state and save the game
 */
Phaser.Game.prototype.saveState = function(app, key, value) {
    this.state[app][key] = value;
    this.save('autosave');
};

/**
 * Get a state
 */
Phaser.Game.prototype.getState = function(app, key) {
    return this.state[app][key];
};

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
};

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

// Phaser.Game.prototype.save = function(key) {
//     if (key === undefined) key = 'default';
//     localStorage.setItem('save-'+key, this.serialize());
// };

/**
 * Save the game state.
 */
Phaser.Game.prototype.save = function(key) {
    this.saveCustom(key, btoa(this.serialize()));
};
  

/**
 * Save the game state.
 */
Phaser.Game.prototype.saveCustom = function(key, value) {
    if (key === undefined) {
        key = 'default';
    }

    // Check if value is correct before saving
    try {
        test = atob(value);
        test = JSON.parse(test);

        localStorage.setItem('save-' + key, value);
        this.updateURL(value);
    } catch (error) {
        console.log('Cannot save provided password ' + value);
    }
};

Phaser.Game.prototype.getPassword = function() {
  const url = window.location.href;
  const param = 'pass';
  const reg = new RegExp( '[?&]' + param + '=([^&#]*)', 'i' );
  const passValue = reg.exec(url);

  return passValue;
}
  
/**
 * Update URL with password
 */
Phaser.Game.prototype.updateURL = function(value) {
  const url = window.location.href;
  const passValue = this.getPassword();

  let path = url;
  if (passValue) {
       path = url.replace(passValue[0], "");
   }
  
  window.history.pushState("", "", path + '?pass=' + value);
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


















