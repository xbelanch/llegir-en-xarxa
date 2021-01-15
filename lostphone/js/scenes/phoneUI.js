// ---
// --- PhoneUI.js
// ---

import { DPR, assetsDPR } from '../config.js';
import Time from '../prefabs/time.js';
import Popup from '../prefabs/popup.js';
import ExclusivePopup from '../prefabs/exclusivePopup.js';
import Notification from '../prefabs/notification.js';
import EventDispatcher from '../libs/EventDispatcher.js';

export default class PhoneUI extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'PhoneUI' });
    this.time;
    this.notificationOn = false;
    this.nextDelay = 'random';
    this.emitter = EventDispatcher.getInstance();
    this.drawer;
    this.drawerOut = false;
    this.topNotificationBar;
    this.barColor = 0x1c1c1c;
  };

  preload() {
    this.load.image('lorem-appsum-test', `assets/img/iconApp-@${assetsDPR}.png`);
  }

  create()
  {
    let t = this;
    let { width, height } = t.cameras.main;

    // --- Display top and bottom bars
    let topBar = t.add.rectangle(0, 0, width, Math.floor(24 * assetsDPR), t.barColor, 1.0).setOrigin(0);
    let bottomBar = t.add.rectangle(0, height - Math.floor(48 * assetsDPR), width, Math.floor(48 * assetsDPR), t.barColor, 1.0).setOrigin(0);
    t.createDrawer();
    t.createNotificationBar();


    // --- Volume icon
    // By default, volume icon is on
    // @TODO: icon atlas
    this.add.image(width - Math.floor(24 * assetsDPR), 12 * assetsDPR, 'volume-icon-on')
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
          t.game.scene.stop(app);
          t.game.scene.wake('Homescreen');
          t.hideDrawer();
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


    this.emitter.on('notification', function() {
      t.launchNotification();
    });
    this.launchNotification();
  };

  update(delta, time)
  {
    let t = this;
    t.time.update(delta);
  };

  launchNotification()
  {
    let t = this;
    let notifications = this.game.state['pendingNotifications'];

    if (!this.notificationOn && notifications !== undefined && notifications.length > 0) {

      this.notificationOn = true;
      let notification = notifications[0];

      new Popup(
        t,
        'Nou '+notification['type']+': '+notification['subject'],
        {
          //icon: notification['type'],
          icon: 'lorem-appsum-test',
          ellipsis: 30
        }
      ).display({
        delay: this.nextDelay,
        onActive: this.hideDrawer(),
        onActiveScope: this,
        onComplete: this.onCompleteHandler,
        onCompleteScope: this
      });
      this.nextDelay = 'random';

      this.log("Notification launched");
    } else if (this.notificationOn) {
      this.nextDelay = 0;
    }
  }

  onCompleteHandler(tween, targets, popup)
  {
    popup.isActive = false;
    popup.setVisible(false);
    popup.destroy();
    this.notificationOn = false;

    let notifications = this.game.state['pendingNotifications'];
    if (notifications.length > 0) {
      notifications.splice(0, 1);
      this.game.save();
      if (notifications.length > 0) {
        this.emitter.emit('notification');
      }
    }
  }

  createNotificationBar() {
    let t = this;
    let { width, height } = t.cameras.main;
    let notificationBarColor = 0x9c9c9c;
    t.drawerOut = false;

    this.topNotificationBar = this.add.container(
      width - Math.floor(16 * assetsDPR), -height,
      [
        t.add.rectangle(
          0, 0,
          16 * assetsDPR,
          height + Math.floor(24 * assetsDPR),
          notificationBarColor
        ).setOrigin(0,0),
        t.add.triangle(
          0, 0,
          0,height+Math.floor(24 * assetsDPR),
          Math.floor(16 * assetsDPR), height+Math.floor(24 * assetsDPR),
          Math.floor(16 * assetsDPR) / 2, height + Math.floor(24 * assetsDPR) + Math.floor(8 * assetsDPR),
          notificationBarColor
        ).setOrigin(0,0),
        t.add.text(
          Math.floor(8*assetsDPR), height + Math.floor(10*assetsDPR), "↡", {
          fontFamily: 'Roboto',
          fontSize : Math.floor(13 * assetsDPR),
          color: '#ffffff',
          align: 'center'
        })
          .setOrigin(0.5, 0.5)
          .setResolution(Math.floor(assetsDPR))
          .setInteractive()
          .on('pointerup', function(){
              t.drawerOut ? this.setText('↡') : this.setText('↟');
              t.drawerOut ? t.hideDrawer() : t.showDrawer();
              t.drawerOut = !t.drawerOut;
            })
      ]
    );
  }

  createDrawer() {
    let t = this;
    let { width, height } = t.cameras.main;

    t.drawer = this.add.container(
      0, -height,
      [
        t.add.rectangle(0, 0, width, height, t.barColor, 1.0).setOrigin(0,0),
        t.add.text(
          Math.floor(width / 2), Math.floor(100*assetsDPR),
          "Notificacions",
          {
            fontFamily: 'Roboto',
            fontSize : Math.floor(13 * assetsDPR),
            color: '#ffffff',
            align: 'center'
          }
        )
        .setOrigin(0.5, 0.5)
        .setResolution(Math.floor(assetsDPR)),
        t.add.line(
          0, 0,
          Math.floor(30*assetsDPR), Math.floor(120*assetsDPR),
          width - Math.floor(30*assetsDPR), Math.floor(120*assetsDPR),
         0xffffff)
        .setOrigin(0)
      ]
    );

    let notificationsArea = new Phaser.GameObjects.Container(this,width * 0.1, Math.floor(140*assetsDPR));
    t.drawer.add(notificationsArea);

    let notifications = this.game.state['notifications'];

    for (let i=0; i<notifications.length; i++) {
      notificationsArea.add(new Notification(
          this,
          'Nou '+notifications[i]['type']+': '+notifications[i]['subject'],
          notifications[i],
          {
            y: Math.floor(110*assetsDPR) * i,
            width: width*0.8,
            height: Math.floor(100*assetsDPR),
            bgcolor: 0x999999,
            alpha: 1.0,
            strokeWidth: 2,
            strokeColor: 0xdddddd,
            //icon: notifications[i]['type']
            icon: 'lorem-appsum-test',
            closeButton: true,
            ellipsis: 30
          }
        )
      );
    }
  }

  showDrawer() {
    let { width, height } = this.cameras.main;
    this.log('Drawer out!');
    this.tweens.add({
      targets: [this.drawer, this.topNotificationBar],
      y: - Math.floor(48 * assetsDPR),
      duration : 500
    });
  }

  hideDrawer() {
    let { width, height } = this.cameras.main;
    this.log('Drawer in!');
    this.tweens.add({
      targets: [this.drawer, this.topNotificationBar],
      y: -height,
      duration : 500,
      onComplete: function () {
        this.drawer.destroy()
        this.createDrawer();
        this.topNotificationBar.destroy();
        this.createNotificationBar();
      },
      onCompleteScope: this
    });
  }
}
