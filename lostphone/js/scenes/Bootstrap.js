// Bootstrap
// 

const DPR = window.devicePixelRatio;
const MAX_DPR = 2;

class Bootstrap extends Phaser.Scene
{
  init()
  {
    let t = this;
    let Phone = t.game;

    // Determinem el directori d'assets imatges segons les dimensions de pantalla del dispositiu
    // Actualment tenim dues opcions
    // 360 x 740 --> SmartPhones
    // 570 x 1024 --> Tablets / Deskytop
    if (Phone.config.height <= 740)
    {      
      t.registry.set('imgFolder', '360x740');  // 0.4864 aspect ratio    
      t.registry.set('scale', 0.75);
    } else {
      t.registry.set('imgFolder', '560x1024'); // 0.5468 aspect ratio
      t.registry.set('scale', 1);
    }

    t.registry.set('scaleRatio', window.devicePixelRatio / MAX_DPR);
  }
  
  preload()
  {
    let t = this;
    let Phone = t.game;

    // --- Carrega les fonts amb l'ajut de la llibreria adaptada
    // Typekit... una mica outdated, però sembla ser que funcional
    const fonts = new WebFontFile(this.load,[
      'Roboto',
      'Righteous'
    ]);
    t.load.addFile(fonts);

    // Carreguem els fitxers de configuració
    t.load.json('config', 'config/config.json');
    t.load.json('apps', 'config/apps.json');
    t.load.json('tracks', 'config/tracks.json');
    t.load.json('wifi', 'config/wifi.json');
    t.load.json('mail', 'config/mail.json');

    // Carreguem ara els tracks d'audio?
    
    
    // --- Emet un esdeveniment anomenat 'preload-finished' que,
    // en el moment que s'executi (només una vegada al preload),
    // executarà el mètode privat 'handlePreloadFinished'
    Phone.events.once(PhoneEvents.PreloadFinished, t.handlePreloadFinished, t);

    // Add logo and preloader name
    let imgFolder = t.registry.get('imgFolder');
    t.load.image('preloader-logo', `assets/img/${imgFolder}/preloader-logo.png`);

    
  }

  create()
  {
    let t = this;
    let Phone = t.game;
    Phone.state = {};
    
    let config = t.cache.json.get('config');
    Phone.debug = config['debug'];

    t.log("Debug started");

    // --- Initialize Phone apps state
    const apps = t.cache.json.get('apps');
    Phone.state['complete'] = {};
    for (let i = 0; i < apps.length; i++) {
      Phone.state[apps[i].type] = {};
    }

    // ---  Check if password via URL
    const passValue = Phone.getPassword();
    if (passValue) {
      Phone.saveCustom('autosave', passValue[1]);
    }

    // --- Load the game if saved before
    Phone.loadSave('autosave');
    
    let x = Math.round(Phone.config.width * 0.5);
    let y = Math.round(Phone.config.height * 0.5);

    // --- Display logo - text - booting phone
    // Set scale first before display it
    t.log('DPR: ' +  DPR);
    let scale = t.registry.get('scale');
    t.add.sprite(x, y, 'preloader-logo')
      .setOrigin(0.5)
      .setScale(scale);
    
    t.add.text(x, y, config['preloader']['name'], {
      fontFamily: 'Righteous',
      fontSize: (Phone.config.width > 570 ? 32 : 12) * DPR
    }).setOrigin(0.5, 0.5);
    
    // --- Un cop carregades les fonts, crida
    // l'escena de preload per carregar tots els
    // assets del joc
    t.scene.run('preload');
  }
  
  handlePreloadFinished()
  {
    // --- Aturem l'escena preload...
    let t = this;
    let Phone = t.game;
    t.scene.stop('preload');
    // iniciem l'escena del mòbil
    t.scene.start('phone');
  }
}
  
