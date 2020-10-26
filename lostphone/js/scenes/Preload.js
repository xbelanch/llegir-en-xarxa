// -- Preload.js
//
//
import { assetsDPR } from '../main.js';
import { PhoneEvents } from './Bootstrap.js';

export default class Preload extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'Preload'});
  }
  
  preload()
  {
    let t = this;
    
    var startTimer = Date.now();
    
    // --- Load wallpapers
    /*
    let imgFolder = t.registry.get('imgFolder');
    t.load.image('home-wallpaper', `assets/img/${imgFolder}/wallpapers/home-wallpaper.png`);
    t.load.image('another-wallpaper', `assets/img/${imgFolder}/wallpapers/another-wallpaper.png`);
    t.load.image('wifi-wallpaper', `assets/img/${imgFolder}/wallpapers/wifi-wallpaper.png`);

    // --- Load icon apps
    var apps = t.cache.json.get('apps');
    for (var app in apps)
    {
      t.load.image(apps[app]['type'], `assets/img/${imgFolder}/appIcons/${apps[app]['icon']}`);
    }

    // --- Load atlas img - json
    this.load.atlas('phone_ui_icons_states',
                    `assets/img/${imgFolder}/atlas/phone_ui_icons_states.png`,
                   `assets/img/${imgFolder}/atlas/phone_ui_icons_states.json`);
    
    // --- Load lofi - music tracks
    // @Kenneth: Carreguem en aquest moment els tracks d'audio o deixem aquesta tasca en el moment que l'usuari obre l'app de podcast? (dilluns 26/10/2020 19:00)    
    var tracks = t.cache.json.get('tracks');
    for (var track in tracks)
    {
      t.load.audio(tracks[track]['id'], `assets/audio/tracks/${tracks[track]['filename']}`);
    }
    */
    t.log("Preload finished in " + (Date.now() - startTimer) / 1000  + " seconds");
    
  }
  
  create()
  {
    let t = this;
    let Phone = t.game;
    // t.sound.play();
    Phone.events.emit(PhoneEvents.PreloadFinished);
  }
}
