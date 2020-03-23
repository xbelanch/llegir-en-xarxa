// Le HUD or UI Scene?

class PhoneUI extends Phaser.Scene {
  constructor()
  {
    super({key: 'PhoneUI', active: true});

  }

  init()
  {
    this.imgFolder = this.registry.get('imgfolder');
  }


  preload()
  {
    let t = this;
    t.load.image('foreground-phone', `assets/img/${this.imgFolder}/foreground_phone.png`);
    t.load.image('home', `assets/icons/${this.imgFolder}/iconfinder_House_2638333.png`);
    //@TODO: falten icones wifi 400x640
    t.load.image('wifi-off', `assets/icons/${this.imgFolder}/iconfinder_ic_signal_wifi_off_48px_352130.png`);
    t.load.image('wifi-on', `assets/icons/${this.imgFolder}/iconfinder_icon-wifi_211944.png`);
  }

  create()
  {
    let t = this;
    let s = t.sc;
    // Set foreground image
    t.add.image(0, 0, 'foreground-phone').setOrigin(0);
    // Add clock at the top of the phone
    t.date = new MyDate(t, (t.game.config.width / 2), 20, 18, 'numbered');
    t.time = new Time(t, (t.game.config.width / 2), 52, 48);
    // Add buttons
    t.addPhoneButtons();
  }

  update()
  {
    let t = this;
    t.time.update();
  }

  addPhoneButtons()
  {
    let t = this;
    let s = t.sc;
    // Add wifi button
    // at the moment if off
    let wifiIcon = t.textures.get('wifi-off').getSourceImage();
    t.buttonWiFi = new Button(t, wifiIcon.width, 8, 'wifi-off');
    t.buttonWiFi.on('pointerdown', () => {
      t.registry.set('activeApp', 'wifi');
      t.scene.stop('HomeScreen');
      t.scene.launch('wifi');
      t.buttonHome.click();
    });

    // Add Home icon and basic interaction
    let homeIcon = t.textures.get('home').getSourceImage();
    t.buttonHome = new Button(t, ((t.game.config.width / 2) - (homeIcon.width / 2) ), (t.game.config.height - homeIcon.height - (homeIcon.height / 4)), 'home');
    t.buttonHome.on('pointerdown', () => {
      // stop the active app and back to the home screen
      let activeApp = t.registry.get('activeApp');
      if (activeApp)
      {
        t.scene.stop(activeApp);
        this.log(activeApp + ' is stopped');
        t.scene.launch('HomeScreen');
      }
      // sound and back to home screen
      t.buttonHome.click();
    });
  }


}
