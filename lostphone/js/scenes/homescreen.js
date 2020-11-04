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
    if (['dev'].includes(t.game.debug)) {
      // @TODO:
      // L'elecció de les mides de separació entre icones no estan
      // calculades segons una fòrmula sinó visualment. Cal, per tant,
      // establir una regla que determini la ubicació a tres columnes de
      // les icones i que, la segona, passi justament pel mig de l'amplada
      // de la pantalla de l'smartphone
      
      new IconApp(t, 'Lorem Ipsum', width / 1.25, height / 16, 'lorem-appsum');
      new IconApp(t, 'Lorem Ipsum', width / 2, height / 16, 'lorem-appsum');
      new IconApp(t, 'Lorem Ipsum', width / 5, height / 16, 'lorem-appsum');
    };

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
