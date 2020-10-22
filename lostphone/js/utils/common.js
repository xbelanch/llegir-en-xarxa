// --- Common.js
// define some bunch of methods commons to all scenes


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
                if (content[type+'s'][element]['condition'] === this.lastmod) {
                    content['mails'][element]['type'] = type;
                    items.push(content['mails'][element]);
                }
            }
        }
    }

    return items;
}
