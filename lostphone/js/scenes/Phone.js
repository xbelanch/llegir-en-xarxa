import { DPR, assetsDPR } from '../config.js';
import Homescreen from './Homescreen.js';


export default class Phone extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'Phone'});
  };

  init()
  {
    // let t = this;

    // t.scene.add('Homescreen', Homescreen);
    // t.scene.add('PhoneUI', PhoneUI);
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
    // -- Set a random wallpaper
    let wallpapers = this.cache.json.get('config').wallpapers;
    let wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)] + '-wallpaper';
    let scale = this.textures.get(wallpaper).getSourceImage();
    this.add.image(
      Math.round(this.game.config.width / 2),
      Math.round(this.game.config.height / 2),
      wallpaper)
      .setOrigin(0.5, 0.5)
      .setScale(
        this.game.config.width / scale.width,
        this.game.config.height / scale.height
      );

    // --- Set default cursor
    this.input.setDefaultCursor("url(" + `assets/img/cursors/fingerprint.png` + ") 24 24, auto");
    this.scene.launch('Homescreen');
    this.scene.launch('PhoneUI');
  }
}
