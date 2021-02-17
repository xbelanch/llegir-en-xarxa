import PhoneApp from '/scenes/main/PhoneApp';
import IconApp from '/prefabs/IconApp';
import { PhoneEvents } from '/scenes/main/Bootstrap';

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
    let t = this;
    t.apps = this.cache.json.get('apps');
  }

  preload()
  {
    let t = this;
    // --- Testing iconApp
    if (['dev'].includes(this.game.debug))
      t.load.image('lorem-appsum', `assets/img/iconApp-@${t.assetsDPR}.png`);
  }

  create()
  {
    let t = this;
    t.addIconApps();
    t.game.events.on(PhoneEvents.Notification, () => this.addBalloons());
    t.addBalloons();
  }

  addIconApps()
  {
    // Files de quatre icones
    let t = this;

    // --- Set width and height main camera
    let { width, height } = t.cameras.main;
    width /= t.assetsDPR;
    height /= t.assetsDPR;

    // fix values
    const left_column  = width / 3;
    const center_column = width / 2;
    const right_column = 2 * width / 3;
    // change this values to play with space between icon apps and margin top
    const margin = width / 8;
    const top_margin = height / 12;

    // ubica les icones de les apps a tres columenes.
    var row = 0;
    for (var index in this.apps) {
      let app = undefined;
      if (index % 3 === 0) row += 1;
      if (['dev'].includes(t.game.debug)) {
        app = new IconApp(t, t.apps[index], 0, 0, 'lorem-appsum');
      } else {
        app = new IconApp(t, t.apps[index], 0, 0, t.apps.key);
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

    for (var index in t.apps) {
      let found = notifications.filter(element => element['type'] === this.apps[index]['type']).length;
      t.icons[this.apps[index]['type']].addBalloon(found);
    }
  }
};
