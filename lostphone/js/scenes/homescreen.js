import { DPR, assetsDPR } from '../main.js';
import IconApp from '../prefabs/iconApp.js';

export default class Homescreen extends Phaser.Scene
{

  constructor()
  {
    super({ key: 'Homescreen'});
  };

  preload()
  {
    let t = this;
    // --- Testing iconApp
    if (['dev'].includes(t.game.debug))
      t.load.image('lorem-appsum', `assets/img/iconApp-@${assetsDPR}.png`);    
  }
  
  create()
  {
    let t = this;
    t.addIconApps();
    // t.registry.set('activeApp', 'homescreen');
  }


  addIconApps()
  {
    // Files de quatre icones
    let t = this;

    // --- Set width and height main camera
    let { width, height } = t.cameras.main;
    width /= assetsDPR;
    height /= assetsDPR;
    
    // --- Testing icon app
    if (['dev'].includes(t.game.debug))
      new IconApp(t, 'Lorem Ipsum', width / 16, height / 16, 'lorem-appsum');

    /*
    let Phone = t.game.config;
    let s = t.registry.get('scale');
    var apps = t.cache.json.get('apps');
    let widthAppIcon = t.textures.get(apps[0]['type']).getSourceImage();
    let offset = Phone.width < 480 ? 48 : 24; // distància entre icones en funció de l'amplada de pantalla del dispositiu
    let margin = Math.round((Phone.width - ((widthAppIcon.width * 4) + (offset * 3))) / 2);
    margin = margin < 0 ? -margin : margin;
    
    var i = 0;
    for (var index in apps) {
      var app = apps[index];
      new IconApp(
        t,
        app.name,
        app.type + "App",
        app.type,
        s * (margin + ((widthAppIcon.width + ((i%4 >= 1 && i%4 <= 3) ? offset : 0)) * (i % 4))), // Posició X (rota cada 3 posicions)
        s * (75 + (160 * (Math.floor(i / 4))))  // Posició Y (augmenta cada 3 icones)
      );
      i++;
    }
    */
  }
}
