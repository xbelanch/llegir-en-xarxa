import WebFont from 'webFontLoader'
// --- lib lostphone

// --- Debug
// --------------------------------------------------------

Phaser.Scene.prototype.log = function(message) {
    message = '[Scene:' + this.scene.key + '] ' + message;

    if (this.game.debug) {
        console.log(message);
    }
}

// --- Common
// --------------------------------------------------------
// Define some bunch of methods commons to all scenes

Object.defineProperty(Phaser.Structs.List.prototype, 'current', {
  get() {
    return this.getAt(this.position);
  }
});

Phaser.Game.prototype.getNewElements = function() {

    if (this.lastmod === undefined) {
        return [];
    }

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
                if (conditions.includes(this.lastmod)) {
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
      this.lastmod = key;
    }
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

// ---- WebFontFile.js
// Source: https://gist.github.com/supertommy/bc728957ff7dcb8016da68b04d3a2768

//const WebFont = window.WebFont;

export class WebFontFile extends Phaser.Loader.File
{
  /**
   * @param {Phaser.Loader.LoaderPlugin} loader
   * @param {string | string[]} fontNames
   * @param {string} [service]
   */

  constructor(loader, fontNames, service = 'google')
  {
    super(loader, {
      type: 'webfont',
      key: fontNames.toString()
    });

    this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
    this.service = service;
    this.fontsLoadedCount = 0;
  }
  load()
  {
    const config = {
      fontactive: (familyName) => {
	this.checkLoadedFonts(familyName)
      },
      fontinactive: (familyName) => {
	this.checkLoadedFonts(familyName)
      }
    }

    switch (this.service)
    {
      case 'google':
      config[this.service] = this.getGoogleConfig()
      break

      case 'adobe-edge':
      config['typekit'] = this.getAdobeEdgeConfig()

      default:
      throw new Error('Unsupported font service')
    }
    WebFont.load(config)
  }

  getGoogleConfig()
  {
    return {
      families: this.fontNames
    }
  }

  getAdobeEdgeConfig()
  {
    return {
      id: this.fontNames.join(';'),
      api: '//use.edgefonts.net'
    }
  }

  checkLoadedFonts(familyName)
  {
    if (this.fontNames.indexOf(familyName) < 0)
    {
      return
    }

    ++this.fontsLoadedCount
    if (this.fontsLoadedCount >= this.fontNames.length)
    {
      this.loader.nextFile(this, true)
    }
  }
}

















