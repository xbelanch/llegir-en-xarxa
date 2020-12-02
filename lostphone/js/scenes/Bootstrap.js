// --- Bootstrap
import { DPR, assetsDPR } from '../main.js';
import Preload from './Preload.js';
import Phone from './Phone.js';
import Image from '../prefabs/image.js';
import Sprite from '../prefabs/sprite.js';


export const PhoneEvents = {
  PreloadFinished : 'preload-finisihed'
};


export default class Bootstrap extends Phaser.Scene
{
  constructor()
  {
    super();
    this.group;
  };

  init()
  {
    let t = this;

    // --- Add scenes
    t.scene.add('Preload', Preload);
    t.scene.add('Phone', Phone);
  }

  preload()
  {
    let t = this;

    // --- Carrega les fonts amb l'ajut de la llibreria adaptada
    // Typekit... una mica outdated, però sembla ser que funcional
    const fonts = new WebFontFile(this.load,[
      'Roboto',
      'Righteous'
    ]);
    t.load.addFile(fonts);


    // --- Carreguem els fitxers de configuració
    let config = ['config', 'apps', 'tracks', 'wifi', 'mail', 'colors'];
    for (var i = 0; i < config.length; i++) t.load.json(config[i], `config/${config[i]}.json`);

    // --- Emet un esdeveniment anomenat 'preload-finished' que,
    // en el moment que s'executi (només una vegada al preload),
    // executarà el mètode privat 'handlePreloadFinished'
    t.game.events.once(PhoneEvents.PreloadFinished, t.handlePreloadFinished, t);

    // --- Add logo and preloader name (testing)
    // src: https://labs.phaser.io/edit.html?src=src/animation/muybridge.js&v=3.24.1
    t.load.spritesheet('muybridge', 'assets/animations/muybridge01.png', { frameWidth: 119, frameHeight: 228 });
  }

  create()
  {
    let t = this;

    // --- Set Debug level
    t.game.debug = t.cache.json.get('config').debug;

    // --- Set width and height main camera
    let { width, height } = t.cameras.main;
    width /= assetsDPR;
    height /= assetsDPR;

    // --- Set background color
    t.cameras.main.setBackgroundColor('#421278');


    // --- Emulate black fade in at start-up
    if (!['dev'].includes(t.game.debug))
      this.cameras.main.fadeIn(1000, 0, 0, 0);


    // --- Display logo - text - booting phone
    var config = {
        key: 'run',
        frames: 'muybridge',
        frameRate: 15,
        repeat: -1
    };

    this.anims.create(config);

    //  Each frame is 119px wide
    t.group = this.add.group();

    t.group.createMultiple({
      key: 'muybridge',
      frame: 10,
      repeat: 7,
      setOrigin: { x: 0, y: 0 },
      setScale: { x: DPR, y: DPR },
      setXY: { x: (width * assetsDPR) / 2 , y: (height * assetsDPR) / 2 , stepX: 0 }
    });

    t.anims.play('run', t.group.getChildren(), -100, false);

    // --- Initialize game and app states
    t.game.state = {};
    t.game.state['complete'] = {};
    let apps = t.cache.json.get('apps');
    for (var i = 0; i < apps.length; i++)
      t.game.state[apps[i].type] = {};

    // ---  Check if password via URL
    let passValue = t.game.getPassword();
    if (passValue) {
      t.game.saveCustom('autosave', passValue[1]);
    }

    // --- Load saved game
    t.game.loadSave('autosave');

    // --- Load all the assets stuff
    if (['dev'].includes(t.game.debug)) {
      this.scene.run('Preload');
    } else {
      this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
        this.time.delayedCall(0, () => {
          this.scene.run('Preload');
        });
      });
    };
  };

  handlePreloadFinished()
  {
    let t = this;
    t.scene.remove('Preload');
    t.anims.remove('run');
    t.group.destroy(t);

    // --- Let's start the game
    t.scene.start('Phone');

    // --- Play a melodic sound when display homescreen
    if (!['dev'].includes(t.game.debug))
      t.sound.play('startup');

  }
}
