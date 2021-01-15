import { DPR, assetsDPR } from '../config.js';
import IconApp from '../prefabs/iconApp.js';
// import ClockApp from './apps/clock.js';
import PhoneUI from './PhoneUI.js';
import EventDispatcher from '../libs/EventDispatcher.js';


export default class Homescreen extends Phaser.Scene
{

  constructor()
  {
    super({ key: 'Homescreen'});
    this.apps;
    this.icons = {};
    this.emitter = EventDispatcher.getInstance();
  }

  init()
  {
    this.apps = this.cache.json.get('apps');
  }

  preload()
  {
    // --- Testing iconApp
    if (['dev'].includes(this.game.debug))
      this.load.image('lorem-appsum', `assets/img/iconApp-@${assetsDPR}.png`);
  }

  create()
  {
    this.addIconApps();
    this.emitter.on('notification', () => this.addBalloons());
    this.addBalloons();
  }

  addIconApps()
  {
    // Files de quatre icones
    let t = this;

    // --- Set width and height main camera
    let { width, height } = t.cameras.main;
    width /= assetsDPR;
    height /= assetsDPR;

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
      if (index % 3 === 0) row += 1;
      if (['dev'].includes(t.game.debug)) {
        var app = new IconApp(t, this.apps[index], 0, 0, 'lorem-appsum');
      } else {
        var app = new IconApp(t, this.apps[index], 0, 0, this.apps.key);
      };
      app.setX(index % 3 == 0 ? left_column - margin : (index % 3 == 1 ? center_column : right_column + margin));
      app.setY(top_margin +  ((top_margin * 2) * (row - 1)));
      app.addLabel(this.apps[index].name);

      this.icons[this.apps[index]['type']] = app;
    };
  };

  addBalloons()
  {

    let notifications = this.game.state['notifications'];

    for (var index in this.apps) {
      let found = notifications.filter(element => element['type'] === this.apps[index]['type']).length
      if (found !== 0) {
        this.icons[this.apps[index]['type']].addBalloon(found);
      }
    }
  }
};
