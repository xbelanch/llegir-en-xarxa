// ---
// --- PhoneUI.js
// ---

import { DPR, assetsDPR } from '../main.js';
import Time from '../prefabs/time.js';

export default class PhoneUI extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'PhoneUI' });
    this.time;
  };

  create()
  {
    let t = this;
    let { width, height } = t.cameras.main;
    let barColor = 0x1c1c1c;

    // --- Display top and bottom bars
    let topBar = t.add.rectangle(0, 0, width, Math.floor(24 * assetsDPR), barColor, 1.0).setOrigin(0);
    let bottomBar = t.add.rectangle(0, height - Math.floor(48 * assetsDPR), width, Math.floor(48 * assetsDPR), barColor, 1.0).setOrigin(0);

    // --- Set the home button
    var circle = new Phaser.Geom.Circle(Math.floor(width / 2), height - Math.floor(48 * assetsDPR / 2 ), Math.floor(18 * assetsDPR));
    var graphics = t.add.graphics({ fillStyle: { color: 0xffffff } });
    graphics.fillCircleShape(circle);

    // --- Clock time at the upper bar 
    t.time = new Time(t, Math.floor(width / 2), height / 56, {
      fontFamily: 'Roboto',
      fontSize : Math.floor(13 * assetsDPR),
      color: '#ffffff',
      align: 'center'
    })
      .setOrigin(0.5, 0.5)
      .setResolution(Math.floor(assetsDPR));    
  };
  
  update(delta, time)
  {
    let t = this;
    t.time.update(delta);
    /*
    t.watchNotification();
    t.launchNotification();
    */
  };
  
  
}

/*
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
    this.notifications = [];
    this.notificationOn = false;
    this.nextDelay = 'random';
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
    t.watchNotification();
    t.launchNotification();
  }

  watchNotification()
  {
    let t = this;
    
    // Don't do anything if game state has not been modified
    if (t.game.lastmod !== undefined) {
      let elements = t.game.getNewElements();
      t.game.lastmod = undefined;

      // TODO: Will overlap if multiple elements
      for (let x in elements) {
        this.notifications.push(new Popup(
          t,
          'New '+elements[x]['type']+': '+elements[x]['subject'],
          { icon: elements[x]['type'] }
        ));
        this.log("Added notifications to queue.");
      }
    } 
  }

  launchNotification()
  {
    if (!this.notificationOn && this.notifications !== undefined && this.notifications.length > 0) {

      this.notificationOn = true;
      let notification = this.notifications[0];
      this.notifications.splice(0, 1);

      notification.display({
        delay: this.nextDelay,
        onComplete: this.onCompleteHandler,
        onCompleteScope: this
      });
      this.log("Notification launched");
    } else if (this.notificationOn) {
      this.nextDelay = 0;
    } else if (this.notifications === undefined || this.notifications.length === 0) {
      this.nextDelay = 'random';
    }
  }

  onCompleteHandler(tween, targets, popup)
  {
    popup.isActive = false;
    popup.setVisible(false);
    popup.destroy();
    this.notificationOn = false;
  }
}
*/
