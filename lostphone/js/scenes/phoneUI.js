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
    this.load.image('foreground-phone', `assets/img/${this.imgFolder}/foreground_phone.png`);
    this.load.image('home', `assets/icons/${this.imgFolder}/iconfinder_House_2638333.png`);
  }
  
  create()
  {
    let t = this;
    let s = t.sc;
        // Set foreground image
    t.add.image(0, 0, 'foreground-phone').setOrigin(0);
    // Add clock at the top of the phone
    t.time = new Time(t, (t.game.config.width / 2), 24, 32);
    t.date = new MyDate(t, (t.game.config.width / 2), 48, 24, 'text');
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
    // Add Home icon
    t.buttonHome = new Button(t, ((t.game.config.width / 2) - 64), (t.game.config.height - 160), 'home');
    t.buttonHome.on('pointerdown', () => {
      // stop the active app and back to the home screen
      let activeApp = t.registry.get('activeApp');
      if (activeApp)
      {
        t.scene.stop(activeApp);
        console.log(activeApp + 'is stopped');
        t.scene.launch('HomeScreen');
      }
      // sound and back to home screen
      t.buttonHome.click();
    });
  }

  
}

