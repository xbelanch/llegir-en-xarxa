
import { PhoneEvents } from '/scenes/Bootstrap';

// Phaser.Scene
Phaser.Scene.prototype.log = function(message) {
    message = '[Scene:' + this.scene.key + '] ' + message;

    if (this.game.debug) {
        console.log(message);
    }
}

// Phaser.Game
Phaser.Game.prototype.getNewElements = function(triggerItem) {

    // Change this
    let items = [];
    let apps = this.cache.json.get('apps');
    for (let app in apps) {
        let type = apps[app]['type'];
        let content = this.cache.json.get(type);

        if (content !== undefined) {
            // Need to rethink this! mails is hardcoded
            for (let element in content[type+'s']) {
                let conditions = content[type+'s'][element]['condition'];

                if (!Array.isArray(conditions)) {
                    conditions = [conditions];
                }
                if (conditions.includes(triggerItem)) {
                    if (this.checkCondition(conditions)) {
                        content[type+'s'][element]['type'] = type;
                        items.push(content[type+'s'][element]);
                    }
                }
            }
        }
    }

    return items;
}

// --- Save
// --------------------------------------------------------
// Define some bunch of methods related to save states of the game

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
    if (app === 'complete' && this.state[app][key] === undefined) {
      this.state[app][key] = value;
      let items = this.getNewElements(key);
      this.state['notifications'] = [...this.state['notifications'], ...items];

      if (!!this.notifications && !!this.notifications.popup) {
        this.state['pendingNotifications'] = [...this.state['pendingNotifications'], ...items];
      } else {
        this.state['pendingNotifications'] = [];
      }

      let found = this.state['notifications'].filter(element => element['id'] === key);
      if (found.length > 0) {
        let index = this.state['notifications'].indexOf(found[0]);
        if (index !== -1) this.state['notifications'].splice(index, 1);
      }

      this.events.emit(PhoneEvents.Notification);
    } else {
      this.state[app][key] = value;
    }
    this.save('autosave');
};

Phaser.Game.prototype.deleteState = function() {
    this.state['complete'] = {};
    this.state['notifications'] = [];
    this.state['pendingNotifications'] = []
    localStorage.removeItem('save-autosave');
    this.updateURL();

    this.events.emit(PhoneEvents.Notification);
}

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

/**
 * Save the game state.
 */
Phaser.Game.prototype.save = function(key='autosave') {
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
        JSON.parse(atob(value));

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

  if (value !== undefined) {
    window.history.pushState("", "", path + '?pass=' + value);
  } else {
    window.history.pushState("", "", path);
  }
};


/**
 * Load a game state.
 *
 */
Phaser.Game.prototype.loadSave = function(key) {
    if (key === undefined) key = 'default';
    let state = localStorage.getItem('save-'+key);
    if (state) {
        this.updateURL(state);
        this.unserialize(atob(state));
    }
    console.log('Loaded ' +key);
};

/**
 * Autosave on
 */
Phaser.Game.prototype.autosaveOn = function(interval) {
    if (interval === undefined) interval = 5000;
    let self = this;
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

