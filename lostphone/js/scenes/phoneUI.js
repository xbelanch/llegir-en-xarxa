// ---
// --- PhoneUI.js
// ---

class PhoneUI extends Phaser.Scene
{
  constructor()
  {
    super();
    this.time;
    this.wifi_signal_icon;
    this.width;
    this.height;
    this.x;
    this.y;
  }
  
  init()
  {
    let { width, height } = this.getPhoneDimensions();    
    this.width = width;
    this.height = height;
    this.x = width / 2;
    this.y = height / 2;
  }

  create()
  {
    let t = this;
    let Phone = t.game.config;
    let heightTopBar = 42;
    let heightBottomBar = 64;

    // Display top and bottom bars
    let phoneTopBar = t.add.rectangle(0, 0, Phone.width, heightTopBar, 0x1c1c1c, 1.0).setOrigin(0);
    let phoneBottomBar = t.add.rectangle(0, Phone.height - heightBottomBar, Phone.width, heightBottomBar, 0x0, 1.0).setOrigin(0);

    // WiFi icon
    t.wifi_signal_icon = t.add.image(8, 2, 'phone_ui_icons_states',
                                       t.registry.get('unlockWifi') ? 'wifi-signal-on' : 'wifi-signal-off')
        .setScale(this.registry.get('scaleRatio')*0.75)
        .setInteractive()
        .on('pointerover', function(){
          this.tint = 0xaaaaaa;
        })
        .on('pointerout', function(){
          this.tint = 0xffffff;
        })
        .on('pointerup', function(){
          var activeApp = t.registry.get('activeApp');
          if (activeApp != 'wifiApp')
          {
            t.scene.stop(activeApp);
            t.scene.launch('wifiApp');
          }
        });

    // Volume icon
    t.registry.set('unlockVolume', true);
    let volume_icon = t.add.image(Phone.width - 48, 2, 'phone_ui_icons_states',
                                  t.registry.get('unlockVolume') ? 'volume-signal-on' : 'volume-signal-off')
        .setScale(this.registry.get('scaleRatio')*0.75)
        .setInteractive()
        .on('pointerover', function(){
          this.tint = 0xaaaaaa;
        })
        .on('pointerout', function(){
          this.tint = 0xffffff;
        })
        .on('pointerup', function(){
          t.registry.set('unlockVolume',  t.registry.get('unlockVolume') ? false : true);
          // update icon?
          if (t.registry.get('unlockVolume'))
          {
              this.setTexture('phone_ui_icons_states', 'volume-signal-on');
              t.game.sound.mute = false;
          } else {
              this.setTexture('phone_ui_icons_states', 'volume-signal-off');
              t.game.sound.mute = true;
          }
        });
    
    // Home button
    var circle = new Phaser.Geom.Circle(Math.floor(Phone.width / 2), Phone.height - Math.floor(heightBottomBar / 2), Math.floor(heightBottomBar / 2.5));
    var graphics = t.add.graphics({ fillStyle: { color: 0xffffff } });
    graphics.fillCircleShape(circle);

    t.input.on('pointermove', function (pointer) {
      graphics.clear();

      if(circle.contains(pointer.x, pointer.y))
      {
        graphics.fillStyle(0xaaaaaa);
      }
      else
      {
        graphics.fillStyle(0xffffff);
      }
      graphics.fillCircleShape(circle);
    });

    t.input.on('pointerdown', function(pointer){
      var activeApp = t.registry.get('activeApp');
      if(circle.contains(pointer.x, pointer.y))
      {
        if (activeApp != 'homescreen');
        t.scene.sleep(activeApp);
        //t.scene.transition({ target: 'homescreen', duration: 1000 });
        t.scene.launch('homescreen');
      }
    });
    
    
    // Clock
    t.time = new Time(t, Math.floor(Phone.width / 2), Math.floor(heightTopBar / 2), {
      fontFamily: 'Roboto',
      fontSize : 22,
      color: '#ffffff',
      align: 'center'
    })
      .setOrigin(0.5, 0.5)
      .setResolution(2);
  }

  getPhoneDimensions()
  {
    let t = this;
    let Phone = t.game.config;
    return {
      width : Phone.width,
      height : Phone.height
    };
  }


  update(delta, time)
  {
    let t = this;
    t.time.update();
    t.launchNotification();
  }

  launchNotification()
  {
    let t = this;
    
    if (t.game.lastmod !== undefined) {
      t.game.lastmod = undefined;
      t.displayPopup(new Popup(t, 'New notification!', {icon:'mail'}));
    } 
  }

  displayPopup(popup)
  {
    let t = this;
    t.tweens.add({
      targets: popup,
      y : 140,
      duration : 500,
      delay: 3000 + Math.random() * 4000, 
      ease : 'Power2',
      yoyo : true,
      repeat : 0,
      hold : 5000,
      onStart : t.onStartHandler,
      onStartScope : t,
      onStartParams : [ popup ],
      onComplete : t.onCompleteHandler,
      onCompleteScope : t,
      onCompleteParams : [ popup ]
    });
  } 

  onStartHandler(tween, targets, popup)
  {
    popup.isActive = true;
    popup.setVisible(true);
  }

  onCompleteHandler(tween, targets, popup)
  {
    popup.isActive = false;
    popup.setVisible(false);
  }

}
