// --- Bootstrap
import { DPR } from '../main.js';
import { assetsDPR } from '../main.js';
import Preload from './Preload.js';
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
    t.scene.add('Preload', Preload);
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

    
    // Carreguem els fitxers de configuració
    let config = ['config', 'apps', 'tracks', 'wifi', 'mail'];
    for (var i = 0; i < config.length; i++) t.load.json(config[i], `config/${config[i]}.json`);

    // --- Emet un esdeveniment anomenat 'preload-finished' que,
    // en el moment que s'executi (només una vegada al preload),
    // executarà el mètode privat 'handlePreloadFinished'
    t.game.events.once(PhoneEvents.PreloadFinished, t.handlePreloadFinished, t);

    // Add logo and preloader name
    // let imgFolder = t.registry.get('imgFolder');
    // t.load.image('preloader-logo', `assets/img/${imgFolder}/preloader-logo.png`);
    // @TODO: t.load.image('ioc-logo', `assets/img/ioc-logo-@${assetsDPR}.png`);
    t.load.image('lorem-appsum', `assets/img/iconApp-@${assetsDPR}.png`);

    // Provisional logo-animation
    // src: https://labs.phaser.io/edit.html?src=src/animation/muybridge.js&v=3.24.1
    t.load.spritesheet('muybridge', 'assets/animations/muybridge01.png', { frameWidth: 119, frameHeight: 228 });
        

  }

  create()
  {
    let t = this;
    let { width, height } = t.cameras.main;
    width /= assetsDPR;
    height /= assetsDPR;

    // Determinem nivell de debug
    t.game.debug = t.cache.json.get('config').debug;

    var iconApp = new Sprite(t, width / 16, width / 16, 'lorem-appsum').setOrigin(0);


    
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



    
    
    
    // let t = this;
    // let Phone = t.game;
    // Phone.state = {};

    // // --- Initialize Phone apps state
    // const apps = t.cache.json.get('apps');
    // Phone.state['complete'] = {};
    // for (let i = 0; i < apps.length; i++) {
    //   Phone.state[apps[i].type] = {};
    // }

    // // ---  Check if password via URL
    // const passValue = Phone.getPassword();
    // if (passValue) {
    //   Phone.saveCustom('autosave', passValue[1]);
    // }

    // // --- Load the game if saved before
    // Phone.loadSave('autosave');
    
    // let x = Math.round(Phone.config.width * 0.5);
    // let y = Math.round(Phone.config.height * 0.5);

    // // --- Display logo - text - booting phone
    // // Set scale first before display it
    // t.log('DPR: ' +  DPR);
    // let scale = t.registry.get('scale');
    // t.add.sprite(x, y, 'preloader-logo')
    //   .setOrigin(0.5)
    //   .setScale(scale);
    
    // t.add.text(x, y, config['preloader']['name'], {
    //   fontFamily: 'Righteous',
    //   fontSize: (Phone.config.width > 570 ? 32 : 12) * DPR
    // }).setOrigin(0.5, 0.5);
    
    // // --- Un cop carregades les fonts, crida
    // // l'escena de preload per carregar tots els
    // // assets del joc
    t.scene.run('Preload');
  }
  
  handlePreloadFinished()
  {
    let t = this;
    t.scene.remove('Preload');
    t.anims.remove('run');
    t.group.destroy(t);

    // t.sound.play('track02');
  //   // iniciem l'escena del mòbil
  //   t.scene.start('phone');
    //
  }
}
  
