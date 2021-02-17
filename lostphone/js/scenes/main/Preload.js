// -- Preload.js
//
//
import { PhoneEvents } from '/scenes/main/Bootstrap';

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
    let progressBox = this.add.graphics();
    let progressBar = this.add.graphics();
    progressBox.fillStyle(0x000000, 1);
    progressBox.fillRect(width / 2 - 160, height - 128, 320, 50);

    let loadingText = this.make.text({
      x: width / 2,
      y: height - 256,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#000'
      }
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
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

    // Loading test images
    if (['dev'].includes(t.game.debug)) {
      t.load.image('volume-icon-on', 'assets/img/volume-icon-on.png');
      t.load.image('volume-icon-off', 'assets/img/volume-icon-off.png');
      t.load.image('button-homescreen', 'assets/images/button-homescreen.png');
    /*
      for (let i = 0; i < 2; i++) {
        t.load.image('test' + i, 'assets/img/560x1024/backgrounds/city-blurred-hd.jpg');
      };
    */
    };

    // --- Load wallpapers
    let wallpapers = t.cache.json.get('config').wallpapers;
    for (let i = 0; i < wallpapers.length; i++)
      t.load.image(wallpapers[i]+ '-wallpaper', `assets/img/wallpapers/${wallpapers[i]}.png`);

    /*
    // --- Load icon apps
    let apps = t.cache.json.get('apps');
    for (let app in apps)
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

    // --- Load lofi - music - podcasts tracks
    let tracks = t.cache.json.get('tracks');
    t.load.audio(tracks);

    // --- Load shaders
    t.load.glsl('bundle', 'assets/shaders/bundle.glsl.js');
  }

  create()
  {
    let t = this;
    t.game.events.emit(PhoneEvents.PreloadFinished);
    t.log("Preload finished in " + (Date.now() - t.startTimer) / 1000  + " seconds");
  }
}
