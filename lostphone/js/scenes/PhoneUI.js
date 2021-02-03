// ---
// --- PhoneUI.js
// ---

import { assetsDPR } from '/Config';
import Time from '/prefabs/time';
import Popup from '/prefabs/popup';
import Notification from '/prefabs/notification';
import { PhoneEvents } from '/scenes/Bootstrap';

export default class PhoneUI extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'PhoneUI' });
    this.time;
    this.notificationOn = false;
    this.nextDelay = 'random';
    this.drawer;
    this.notificationsArea;
    this.drawerOut = false;
    this.topNotificationBar;
    this.barColor = 0x1c1c1c;
    this.homeButton;
    this.backButton;
    this.dragZone;
    this.notificationsMaskZone;
    this.assetsDPR = assetsDPR;
  };

  preload() {
    let t = this;
    t.load.image('lorem-appsum-test', `assets/img/iconApp-@${t.assetsDPR}.png`);
  }

  create()
  {
    let t = this;
    let { width, height } = t.cameras.main;

    // --- Display top and bottom bars
    let topBar = t.add.rectangle(0, 0, width, Math.floor(24 * t.assetsDPR), t.barColor, 1.0).setOrigin(0);
    let bottomBar = t.add.rectangle(0, height - Math.floor(48 * t.assetsDPR), width, Math.floor(48 * assetsDPR), t.barColor, 1.0).setOrigin(0);

    // --- Volume icon
    // By default, volume icon is on
    // @TODO: icon atlas
    t.add.image(width - Math.floor(24 * t.assetsDPR), 12 * t.assetsDPR, 'volume-icon-on')
        .setScale(1 / (t.assetsDPR * 4))
        .setTintFill(0xffffff)
        .setInteractive()
        .on('pointerup', function(){
          t.game.sound.mute === true  ? t.setTexture('volume-icon-on') : t.setTexture('volume-icon-off');
          t.game.sound.mute = !t.game.sound.mute;
        });

    // --- Home button
    t.homeButton = this.add.image(Math.floor(width / 2), height - Math.floor(48 * t.assetsDPR / 2), 'button-homescreen')
      .setInteractive()
      .on('pointerup', () => t.backHome());

    // --- Go back Button
    t.backButton = t.add.text(
      Math.floor(width / 5), height - Math.floor(48 * t.assetsDPR / 2),
       "↩",
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(30 * t.assetsDPR),
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
      fontSize : Math.floor(13 * t.assetsDPR),
      color: '#ffffff',
      align: 'center'
    })
      .setOrigin(0.5, 0.5)
      .setResolution(Math.floor(t.assetsDPR));

    t.createDrawer();
    t.createNotificationBar();

    t.game.events.on(PhoneEvents.Notification, function() {
      t.launchNotification();
    });
    t.launchNotification();
  };

  backHome()
  {
    let t = this;

    let scenes = t.game.scene.getScenes(true);
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
    let t = this;
    popup.isActive = false;
    popup.setVisible(false);
    popup.destroy();
    t.notificationOn = false;

    let notifications = t.game.state['pendingNotifications'];
    if (notifications.length > 0) {
      notifications.splice(0, 1);
      t.game.save();
      if (notifications.length > 0) {
        t.nextDelay = 0;
        t.game.events.emit(PhoneEvents.Notification);
      }
    }
  }

  createNotificationBar() {
    let t = this;
    let { width, height } = t.cameras.main;
    let notificationBarColor = 0x9c9c9c;
    t.drawerOut = false;

    this.topNotificationBar = this.add.container(
      width - Math.floor(16 * t.assetsDPR),
      -height,
      [
        t.add.rectangle(
          0, 0,
          16 * t.assetsDPR,
          height + Math.floor(24 * t.assetsDPR),
          notificationBarColor
        ).setOrigin(0,0),
        t.add.triangle(
          0, 0,
          0,height+Math.floor(24 * t.assetsDPR),
          Math.floor(16 * t.assetsDPR), height+Math.floor(24 * t.assetsDPR),
          Math.floor(16 * t.assetsDPR) / 2, height + Math.floor(24 * t.assetsDPR) + Math.floor(8 * assetsDPR),
          notificationBarColor
        ).setOrigin(0,0),
        t.add.text(
          Math.floor(8*t.assetsDPR), height + Math.floor(10*t.assetsDPR), "↡", {
          fontFamily: 'Roboto',
          fontSize : Math.floor(13 * t.assetsDPR),
          color: '#ffffff',
          align: 'center'
        })
          .setOrigin(0.5, 0.5)
          .setResolution(Math.floor(t.assetsDPR))
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

    this.notificationsMaskZone = t.add.rectangle(
      0, - height + Math.floor(70*t.assetsDPR),
      width, height - Math.floor(70*t.assetsDPR) - Math.floor(48*t.assetsDPR),
      t.barColor, 1.0
    ).setOrigin(0,0);
    let mask = new Phaser.Display.Masks.GeometryMask(t, this.notificationsMaskZone);

    t.drawer = t.add.container(
      0, -height,
      [
        t.add.rectangle(
          0, 0,
          width, height - Math.floor(48*t.assetsDPR),
          t.barColor, 1.0
        ).setOrigin(0,0),
        t.add.text(
          Math.floor(width / 2), Math.floor(50*t.assetsDPR),
          "Notificacions",
          {
            fontFamily: 'Roboto',
            fontSize : Math.floor(13 * t.assetsDPR),
            color: '#ffffff',
            align: 'center'
          }
        )
        .setOrigin(0.5, 0)
        .setResolution(Math.floor(t.assetsDPR)),
        t.add.line(
          0, 0,
          Math.floor(30*t.assetsDPR), Math.floor(70*t.assetsDPR),
          width - Math.floor(30*t.assetsDPR), Math.floor(70*t.assetsDPR),
         0xffffff)
        .setOrigin(0,0),
        t.add.line(
          0, 0,
          Math.floor(30*t.assetsDPR), height - Math.floor(48*t.assetsDPR) - 1,
          width - Math.floor(30*t.assetsDPR), height - Math.floor(48*t.assetsDPR) - 1,
         0xffffff)
        .setOrigin(0,0)
      ]
    );

    t.notificationsArea = new Phaser.GameObjects.Container(
      t,
      width * 0.1,
      Math.floor(100*t.assetsDPR)
    );
    t.drawer.add(t.notificationsArea);

    let notifications = [...t.game.state['notifications']];
    notifications.reverse();

    for (let i=0; i<notifications.length; i++) {
      this.notificationsArea.add(new Notification(
          t,
          'Nou '+notifications[i]['type']+': '+notifications[i]['subject'],
          notifications[i],
          {
            y: Math.floor(60*t.assetsDPR) * i,
            width: width*0.8,
            height: Math.floor(50*t.assetsDPR),
            bgcolor: 0x999999,
            alpha: 1.0 - (Math.min(i*0.2, 0.6)),
            strokeWidth: 2,
            strokeColor: 0xdddddd,
            //icon: notifications[i]['type']
            icon: 'lorem-appsum-test',
            ellipsis: 30,
            iconScale: 0.5
          }
        )
      );
    }

    t.notificationsArea.setMask(mask);
  }

  showDrawer() {
    let t = this;
    let { width, height } = this.cameras.main;
    t.log('Drawer out!');
    t.tweens.add({
      targets: [this.drawer, this.notificationsMaskZone],
      y: '+='+height,
      duration : 500
    });
    t.tweens.add({
      targets: [this.topNotificationBar],
      y: 0 - Math.floor(32*t.assetsDPR),
      duration : 500
    });

    t.dragZone = this.add.zone(
      0,
      Math.floor(120*t.assetsDPR),
      width - (16 * t.assetsDPR),
      height - Math.floor(120*t.assetsDPR) - Math.floor(48*t.assetsDPR)
    ).setOrigin(0).setInteractive();

    let max_height = Math.floor(60*t.assetsDPR) * (t.game.state['notifications'].length) - Math.floor(100*assetsDPR);

    t.dragZone.on('pointermove', function (pointer) {
      if (pointer.isDown) {
        t.notificationsArea.y += (pointer.velocity.y / 3);
        t.notificationsArea.y = Phaser.Math.Clamp(
          t.notificationsArea.y,
          -max_height,
          Math.floor(100*t.assetsDPR)
        );
      }
    });
  }

  hideDrawer() {
    let t = this;
    let { width, height } = t.cameras.main;
    t.log('Drawer in!');
    t.tweens.add({
      targets: [t.drawer, t.topNotificationBar, t.notificationsMaskZone],
      y: '-='+height,
      duration : 500,
      onComplete: function () {
        t.drawer.destroy();
        t.createDrawer();
        t.topNotificationBar.destroy();
        t.createNotificationBar();
      },
      onCompleteScope: t
    });

    if (t.dragZone !== undefined) {
      t.dragZone.destroy();
    }
  }
}
