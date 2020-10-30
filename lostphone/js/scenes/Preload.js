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
    this.starterTimer;
  };
  
  preload()
  {
    let t = this;
    t.startTimer = Date.now();

    let { width, height } = t.cameras.main;

    // --- Progress Bar Loader
    // https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/?a=13
    var progressBox = this.add.graphics();
    var progressBar = this.add.graphics();
    progressBox.fillStyle(0x000000, 1);
    progressBox.fillRect(width / 2 - 160, height - 128, 320, 50);

    var loadingText = this.make.text({
      x: width / 2,
      y: height - 256,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#000'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    var percentText = this.make.text({
      x: width / 2,
      y: height - 200,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ff0000'
      }
    });
    percentText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xff0000, 1);
      progressBar.fillRect(width / 2 - 150, height - 118, 300 * value, 30);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    // testing bar progress
    for (var i = 0; i < 10; i++) {
      t.load.image('test' + i, 'assets/img/560x1024/backgrounds/city-blurred-hd.jpg');    
    };

    
    // --- Load wallpapers
    /*
    t.load.image('home-wallpaper', `assets/img/${imgFolder}/wallpapers/home-wallpaper.png`);
    let imgFolder = t.registry.get('imgFolder');
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
    
    */

    // --- Load sounds effects
    t.load.audio('startup', 'assets/audio/sounds/320664__pizzaiolo__lovelyboot1.ogg');
    
    // --- Load lofi - music tracks
    // @Kenneth: Carreguem en aquest moment els tracks d'audio o deixem aquesta tasca en el moment que l'usuari obre l'app de podcast? (dilluns 26/10/2020 19:00)    
    t.load.audio(t.cache.json.get('tracks'));
    
  }
  
  create()
  {
    let t = this;
    t.game.events.emit(PhoneEvents.PreloadFinished);
    t.log("Preload finished in " + (Date.now() - t.startTimer) / 1000  + " seconds");
  }
}
