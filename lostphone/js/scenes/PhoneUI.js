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
    this.notificationsArea;
    this.drawerOut = false;
    this.topNotificationBar;
    this.barColor = 0x1c1c1c;
    this.homeButton;
    this.backButton;
    this.dragZone;
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
    this.homeButton = this.add.image(Math.floor(width / 2), height - Math.floor(48 * assetsDPR / 2), 'button-homescreen')
      .setInteractive()
      .on('pointerup', () => t.backHome());

    // --- Go back Button
    this.backButton = this.add.text(
      Math.floor(width / 5), height - Math.floor(48 * assetsDPR / 2),
       "↩",
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(30 * assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    )
    .setOrigin(0.5, 0.5)
    .setInteractive()
    .setVisible(false);

    // --- Clock time at the upper bar
    t.time = new Time(t, Math.floor(width / 2), height / 56, {
      fontFamily: 'Roboto',
      fontSize : Math.floor(13 * assetsDPR),
      color: '#ffffff',
      align: 'center'
    })
      .setOrigin(0.5, 0.5)
      .setResolution(Math.floor(assetsDPR));

    t.createDrawer();
    t.createNotificationBar();

    this.emitter.on('notification', function() {
      t.launchNotification();
    });
    this.launchNotification();
  };

  backHome()
  {
    let t = this;

    var scenes = t.game.scene.getScenes(true);
    for (var i in scenes) {
      if (/App/.test(scenes[i].scene.key))
        var app = scenes[i].scene.key;
    };

    if (typeof app !== 'undefined') {
      t.game.scene.stop(app);
      t.game.scene.wake('Homescreen')
      t.backButton.setVisible(false);
      t.hideDrawer();
    }
  }

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
        this.nextDelay = 0;
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
      width - Math.floor(16 * assetsDPR),
      -height,
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

    const top_part = t.add.rectangle(
      0, 0,
      width, Math.floor(70*assetsDPR),
      t.barColor, 1.0
    ).setOrigin(0,0);

    const bottom_part = t.add.rectangle(
      0, Math.floor(70*assetsDPR),
      width, height - Math.floor(70*assetsDPR) - Math.floor(48*assetsDPR),
      t.barColor, 1.0
    ).setOrigin(0,0);

    t.drawer = this.add.container(
      0, -height,
      [
        top_part,
        bottom_part,
        t.add.text(
          Math.floor(width / 2), Math.floor(50*assetsDPR),
          "Notificacions",
          {
            fontFamily: 'Roboto',
            fontSize : Math.floor(13 * assetsDPR),
            color: '#ffffff',
            align: 'center'
          }
        )
        .setOrigin(0.5, 0)
        .setResolution(Math.floor(assetsDPR)),
        t.add.line(
          0, 0,
          Math.floor(30*assetsDPR), Math.floor(70*assetsDPR),
          width - Math.floor(30*assetsDPR), Math.floor(70*assetsDPR),
         0xffffff)
        .setOrigin(0,0),
        t.add.line(
          0, 0,
          Math.floor(30*assetsDPR), height - Math.floor(48*assetsDPR) - 1,
          width - Math.floor(30*assetsDPR), height - Math.floor(48*assetsDPR) - 1,
         0xffffff)
        .setOrigin(0,0)
      ]
    );

    this.notificationsArea = new Phaser.GameObjects.Container(
      this,
      width * 0.1, 
      Math.floor(100*assetsDPR)
    );
    t.drawer.add(this.notificationsArea);

    let notifications = [...this.game.state['notifications']];
    notifications.reverse();

    for (let i=0; i<notifications.length; i++) {
      this.notificationsArea.add(new Notification(
          this,
          'Nou '+notifications[i]['type']+': '+notifications[i]['subject'],
          notifications[i],
          {
            y: Math.floor(110*assetsDPR) * i,
            width: width*0.8,
            height: Math.floor(100*assetsDPR),
            bgcolor: 0x999999,
            alpha: 1.0 - (Math.min(i*0.2, 0.6)),
            strokeWidth: 2,
            strokeColor: 0xdddddd,
            //icon: notifications[i]['type']
            icon: 'lorem-appsum-test',
            ellipsis: 30
          }
        )
      );
    }

    let mask = new Phaser.Display.Masks.GeometryMask(t, bottom_part);
    this.notificationsArea.setMask(mask);
  }

  showDrawer() {
    let t = this;
    let { width, height } = this.cameras.main;
    this.log('Drawer out!');
    this.tweens.add({
      targets: [this.drawer],
      y: 0,
      duration : 500
    });
    this.tweens.add({
      targets: [this.topNotificationBar],
      y: 0 - Math.floor(32*assetsDPR),
      duration : 500
    });

    this.dragZone = this.add.zone(
      0,
      Math.floor(120*assetsDPR),
      width - (16 * assetsDPR),
      height - Math.floor(120*assetsDPR) - Math.floor(48*assetsDPR)
    ).setOrigin(0).setInteractive();

    const max_height = Math.floor(110*assetsDPR) * this.game.state['notifications'].length - height + Math.floor(120*assetsDPR);
    
    this.dragZone.on('pointermove', function (pointer) {
      if (pointer.isDown) {
        t.notificationsArea.y += (pointer.velocity.y / 3);
        t.notificationsArea.y = Phaser.Math.Clamp(
          t.notificationsArea.y,
          -max_height,
          Math.floor(100*assetsDPR)
        );
      }
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

    if (this.dragZone !== undefined) {
      this.dragZone.destroy();
    }
  }
}
