// ---
// --- PhoneUI.js
// ---

import { DPR, assetsDPR } from '../config.js';
import Time from '../prefabs/time.js';

export default class PhoneUI extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'PhoneUI' });
    this.time;
    this.notifications = [];
    this.notificationOn = false;
    this.nextDelay = 'random';
  };

  create()
  {
    let t = this;
    let { width, height } = t.cameras.main;
    let barColor = 0x1c1c1c;

    // --- Display top and bottom bars
    let topBar = t.add.rectangle(0, 0, width, Math.floor(24 * assetsDPR), barColor, 1.0).setOrigin(0);
    let bottomBar = t.add.rectangle(0, height - Math.floor(48 * assetsDPR), width, Math.floor(48 * assetsDPR), barColor, 1.0).setOrigin(0);


    // --- Volume icon
    // By default, volume icon is on
    // @TODO: icon atlas
    this.add.image(width - Math.floor(18 * assetsDPR), 12 * assetsDPR, 'volume-icon-on')
        .setScale(1 / (assetsDPR * 4))
        .setTintFill(0xffffff)
        .setInteractive()
        .on('pointerup', function(){
          t.game.sound.mute === true  ? this.setTexture('volume-icon-on') : this.setTexture('volume-icon-off');
          t.game.sound.mute = !t.game.sound.mute;
        });

    // --- Home button
    this.add.image(Math.floor(width / 2), height - Math.floor(48 * assetsDPR / 2), 'button-homescreen')
      .setInteractive()
      .on('pointerup', function(){
        var scenes = t.game.scene.getScenes(true);
        for (var i in scenes) {
          if (/App/.test(scenes[i].scene.key))
            var app = scenes[i].scene.key;
        };

        if (typeof app !== 'undefined') {
          t.game.scene.sleep(app);
          t.game.scene.wake('Homescreen');
        }
      });

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
