class PhoneUI extends Phaser.Scene
{
  constructor()
  {
    super({
      key : 'phoneui'
    });
    this.time;
    this.wifi;
    this.homescreen;
  }

  init()
  {
    let t = this;
  }

  create()
  {
    let t = this;
    t.scene.bringToTop();

    // get the game canvas size
    let { width, height } = t.sys.game.canvas;

    // Display the UI
    let phoneui_front_top = t.add.image(0, 0, 'phoneui', 'phoneui-front-top').setOrigin(0);
    let phoneui_front_bottom = t.add.image(0, 0, 'phoneui', 'phoneui-front-bottom').setOrigin(0);
    phoneui_front_bottom.y = height - phoneui_front_bottom.height;

    // --- Buttons
    // --- Wifi
    t.wifi = t.add.image(16, 8, 'phoneui', 'wifi-icon-lock').setOrigin(0).setScale(0.5);

    // --- Home
    t.homescreen = t.add.image(0, 0, 'phoneui', 'phoneui-home-button').setOrigin(0);
    t.homescreen.y = height - (t.homescreen.height * 1.5);
    t.homescreen.x = (width / 2) - (t.homescreen.width / 2);
    t.homescreen.setInteractive();
    t.homescreen.setData('scene', 'homescreen');
    t.homescreen.setData('isVisible', true);
    t.homescreen.on('pointerover', function(){
      t.homescreen.tint = 0xff0000;
    });
    t.homescreen.on('pointerout', function(){
      t.homescreen.clearTint();
    });
    t.homescreen.on('pointerdown', function(){
      t.homescreen.tint = 0xff00ff;
    });
    t.homescreen.on('pointerup', function(){
      t.setActiveScene(t.homescreen);
    });

    
    // Display a simple digital clock
    t.time = new Time(t, 0, 0, 'font', 0xffffff).setScale(0.5);
    t.time.x = (width / 2) - (t.time.width / 2);

  }

  update(delta, time)
  {
    let t = this;
    t.time.update();
  }

  setActiveScene(btn)
  {
    let t = this;
    t.currentScene = this.scene.get(btn.getData('scene'));
    if (t.scene.isVisible(t.currentScene))
    {
      console.log(btn.getData('scene') + ' is visible');
      t.scene.setVisible(false, t.currentScene);
    } else {
      console.log(btn.getData('scene') + ' is not visible');
      t.scene.setVisible(true, t.currentScene);      
    }    
    if (t.scene.isActive(t.currentScene)){
      console.log(btn.getData('scene') + ' is active');
      t.scene.stop(t.currentScene);
    }
  }
  
}
