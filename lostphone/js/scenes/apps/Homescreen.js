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

    // fix values
    const left_column  = t.width / 3;
    const center_column = t.width / 2;
    const right_column = 2 * left_column;
    // change this values to play with space between icon apps and margin top
    const margin = t.width / 8;
    const top_margin = t.height / 12;

    // ubica les icones de les apps a tres columenes.
    let row = 0;
    for (let index in this.apps) {
      let app = undefined;
      if (index % 3 === 0) row += 1;
      if (['dev'].includes(t.game.debug)) {
        app = new IconApp(t, t.apps[index], 0, 0, 'lorem-appsum');
      } else {
        app = new IconApp(t, t.apps[index], 0, 0, t.apps[index].key);
      };
      app.setX(index % 3 == 0 ? left_column - margin : (index % 3 == 1 ? center_column : right_column + margin));
      app.setY(top_margin +  ((top_margin * 2) * (row - 1)));
      app.addLabel(t.apps[index].name);

      t.icons[t.apps[index]['type']] = app;
    };
  };

  addBalloons()
  {
    let t = this;
    let notifications = t.game.registry.get('notifications');

    for (let index in t.apps) {
      let found = notifications.filter(element => element['type'] === this.apps[index]['type']).length;
      t.icons[this.apps[index]['type']].addBalloon(found);
    }
  }
};
