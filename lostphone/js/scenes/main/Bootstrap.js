// --- Bootstrap
import { DPR, assetsDPR } from '/Config';
import {WebFontFile} from "/libs/webfont/WebFontFile";

export const PhoneEvents = {
  PreloadFinished : 'preload-finished',
  Notification: 'notification-launched',
  SettingsUpdated: 'settings-updated'
}

export default class Bootstrap extends Phaser.Scene
{
  constructor()
  {
    super();
    this.group;
    this.assetsDPR = assetsDPR;
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
    //width /= t.assetsDPR;
    //height /= t.assetsDPR;

    // --- Set background color
    t.cameras.main.setBackgroundColor('#421278');


    // --- Emulate black fade in at start-up
    if (!['dev'].includes(t.game.debug))
      this.cameras.main.fadeIn(1000, 0, 0, 0);


    // --- Display logo - text - booting phone
    let config = {
        key: 'run',
        frames: 'muybridge',
        frameRate: 15,
        repeat: -1
    }

    t.anims.create(config);

    //  Each frame is 119px wide
    t.group = t.add.group();

    t.group.createMultiple({
      key: 'muybridge',
      frame: 10,
      repeat: 7,
      setOrigin: { x: 0.5, y: 0.5 },
      setScale: { x: DPR, y: DPR },
      setXY: { x: width / 2 , y: height / 2 , stepX: 0 }
    });

    t.anims.play('run', t.group.getChildren(), -100, false);

    // --- Initialize game and app states
    t.game.initializeState();
    let apps = t.cache.json.get('apps');
    for (var i = 0; i < apps.length; i++) {
      t.game.registry.set(apps[i].type, {});
    }

    // ---  Check if password via URL
    let passValue = t.game.getPassword();
    if (passValue) {
      t.game.saveCustom('autosave', passValue[1]);
    }

    // --- Load saved game
    t.game.loadSave('autosave');

    // --- Load all the assets stuff
    if (['dev'].includes(t.game.debug)) {
      t.scene.run('Preload');
    } else {
      t.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (cam, effect) => {
        t.time.delayedCall(0, () => {
          t.scene.run('Preload');
        });
      });
    }
  }

  handlePreloadFinished()
  {
    let t = this;
    t.scene.remove('Preload');
    t.anims.remove('run');
    t.group.remove(this);


    // --- Let's start the game
    t.scene.launch('Phone');
    t.scene.remove();

    // --- Play a melodic sound when display homescreen
    if (!['dev'].includes(t.game.debug))
      t.sound.play('startup');

  }
}
