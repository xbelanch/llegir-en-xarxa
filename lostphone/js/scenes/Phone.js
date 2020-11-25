import { DPR, assetsDPR } from '../main.js';
import Homescreen from './Homescreen.js';
import PhoneUI from './PhoneUI.js';


export default class Phone extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'Phone'});
  };

  init()
  {
    let t = this;

    t.scene.add('Homescreen', Homescreen);
    t.scene.add('PhoneUI', PhoneUI);
    // t.scene.add('wifiApp', WifiApp);

    // Definim el cursor
    // let imgFolder = t.registry.get('imgFolder');
    // @NOTE:
    // https://stackoverflow.com/questions/19560878/css-change-custom-cursor-image-origin-hotspot-to-center
    // Incorporem les Apps definides al fitxer app.json
    // let apps = t.cache.json.get('apps');
    // for (var index in apps) {
    //   var app = apps[index];
    //   t.scene.add(app.key, eval(app.class));
    // }
  }

  create()
  {
    let t = this;

    // -- Set a random wallpaper
    let wallpapers = t.cache.json.get('config').wallpapers;
    let wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)] + '-wallpaper';
    let scale = t.textures.get(wallpaper).getSourceImage();
    t.add.image(
      Math.round(t.game.config.width / 2),
      Math.round(t.game.config.height / 2),
      wallpaper)
      .setOrigin(0.5, 0.5)
      .setScale(
        t.game.config.width / scale.width,
        t.game.config.height / scale.height
      );

    // --- Set default cursor
    t.input.setDefaultCursor("url(" + `assets/img/cursors/fingerprint.png` + ") 24 24, auto");
    t.scene.launch('Homescreen');
    t.scene.launch('PhoneUI');
  }
}
