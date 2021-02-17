import PhoneApp from '/scenes/main/PhoneApp';
import IconApp from '/prefabs/IconApp';

export default class Homescreen extends PhoneApp
{

  constructor()
  {
    super({ key: 'Homescreen'});
    this.apps;
    this.icons = {};
  }

  init()
  {
    super.init();

    let t = this;
    t.apps = this.cache.json.get('apps');
  }

  preload()
  {
    super.preload();

    let t = this;
    // --- Testing iconApp
    if (['dev'].includes(this.game.debug))
      t.load.image('lorem-appsum', `assets/img/iconApp-@${t.assetsDPR}.png`);
  }

  create()
  {
    let t = this;
    t.addIconApps();
    t.addBalloons();
  }

  addIconApps()
  {
    // Files de quatre icones
    let t = this;

    // ubica les icones de les apps a tres columenes.
    let apps = [];
    let app = undefined;
    for (let index in t.apps) {
      if (['dev'].includes(t.game.debug)) {
        app = new IconApp(t, t.apps[index], 0, 0, 'lorem-appsum').addLabel(t.apps[index].name);
      } else {
        app = new IconApp(t, t.apps[index], 0, 0, t.apps[index].key).addLabel(t.apps[index].name);
      };

      t.icons[t.apps[index]['type']] = app;
      apps.push(app);
    };

    t.addGrid(apps, { columns:3, height: 2, y: 1 });
  };

  addBalloons()
  {
    let t = this;
    let notifications = t.game.registry.get('notifications');

    for (let index in t.apps) {
      let found = notifications.filter(element => element['type'] === this.apps[index]['type']).length;
      t.icons[t.apps[index]['type']].addBalloon(found);
    }
  }
};
