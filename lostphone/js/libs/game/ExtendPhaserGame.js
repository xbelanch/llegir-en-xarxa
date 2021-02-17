import { PhoneEvents } from '/libs/Const';
import GameSettings from '/libs/GameSettings';
import '/libs/game/ExtendPhaserGameURL';

/**
 * Log function
 * @param {*} message
 */
Phaser.Game.prototype.log = function(message) {
  message = '[Game] ' + message;

  if (this.debug) {
    console.log(message);
  }
}

/**
 * Initialize the data manager (useful when resetting in game)
 */
Phaser.Game.prototype.initializeState = function() {
  this.registry.reset();
  this.registry.set('complete',{});
  this.registry.set('notifications',[]);
  this.registry.set('pendingNotifications',[]);
  this.registry.set('settings',{});
  this.settings = new GameSettings(this);
}

/**
 * Save a single state and save the game
 */
Phaser.Game.prototype.saveState = function(app, key, value) {
  let save = this.registry.get(app);
  let notifications = this.registry.get('notifications');
  let pendingNotifications = this.registry.get('pendingNotifications');

  if (app === 'complete' && save[key] === undefined) {
    save[key] = value;

    // Add new elements to notifications array
    let items = this.getNewElements(key);
    notifications = [...notifications, ...items];

    // If show popups is enabled, we also add them to pending list
    if (this.settings.getSettingValue('notificationPopup')) {
      pendingNotifications = [...pendingNotifications, ...items];
    } else {
      pendingNotifications = [];
    }

    // Splice the element that has been completed
    let found = notifications.filter(element => element['id'] === key);
    if (found.length > 0) {
      let index = notifications.indexOf(found[0]);
      if (index !== -1) notifications.splice(index, 1);
    }

    this.events.emit(PhoneEvents.Notification);
  } else {
    save[key] = value;
  }

  this.registry.set(app, save);
  this.registry.set('notifications', notifications);
  this.registry.set('pendingNotifications', pendingNotifications);

  this.save('autosave');
};

/**
 * Delete all states and start anew
 */
Phaser.Game.prototype.deleteState = function() {
  this.initializeState();
  localStorage.removeItem('save-autosave');
  this.updateURL();
  this.events.emit(PhoneEvents.Notification);
  this.events.emit(PhoneEvents.SettingsUpdated);
}

/**
 * Save the game state
 */
Phaser.Game.prototype.save = function(key='autosave') {
  this.saveCustom(key, btoa(this.registry.serialize()));
};

/**
 * Save the game state using a custom key
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
    this.log('Cannot save provided password ' + value);
  }
};

/**
  * Load a game state using a key
 */
Phaser.Game.prototype.loadSave = function(key) {
  if (key === undefined) key = 'default';
  let state = localStorage.getItem('save-'+key);
  if (state) {
    this.updateURL(state);
    this.registry.unserialize(atob(state));
    this.settings.fullSync();
  }
  this.log('Loaded ' +key);
};

/**
 * Get elements that have been unlocked when completing another
 * @param {*} triggerItem
 */
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

/**
 * Check if condition to show element is fulfilled
 */
Phaser.Game.prototype.checkCondition = function(conditions) {
  let complete = true;

  if (conditions === null) {
    return complete;
  }

  if (!Array.isArray(conditions)) {
    conditions = [conditions];
  }

  let save = this.registry.get('complete');
  for (let i=0; i<conditions.length; i++) {
    if (!save[conditions[i]]) {
      complete = false;
      break;
    }
  }

  return complete;
};
