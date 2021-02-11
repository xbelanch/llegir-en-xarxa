// ---
// --- PhoneUI.js
// ---

import { assetsDPR } from '/Config';
import Time from '/prefabs/Time';
import Popup from '/prefabs/Popup';
import Notification from '/prefabs/Notification';
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

  init() {
    let t = this;

    let { width, height } = t.cameras.main;
    t.width = width;
    t.height = height;

    t.elements = {
      'topBar' : {
        'width': t.width,
        'height': t.calcDPR(36),
      },
      'bottomBar': {
        'width': t.width,
        'height': t.calcDPR(60)
      },
      'backButton': {
        'fontSize': t.calcDPR(30)
      },
      'clock': {
        'fontSize': t.calcDPR(16)
      },
      'notificationBar': {
        'color': 0x9c9c9c,
        'width': t.width / 12,
        'fontSize': t.calcDPR(24)
      },
      'notificationTitle': {
        'y': t.calcDPR(16),
        'fontSize': t.calcDPR(24)
      },
      'drawerLines' : {
        'y': t.calcDPR(24),
        'padding': t.calcDPR(5)
      },
      'notificationArea': {
        'y': t.calcDPR(20)
      },
      'notificationBox': {
        'height': t.calcDPR(50),
        'offset': t.calcDPR(10),
        'bgcolor': 0x999999
      }
    }
  }

  preload() {
    let t = this;
    t.load.image('lorem-appsum-test', `assets/img/iconApp-@${t.assetsDPR}.png`);
  }

  create()
  {
    let t = this;

    t.createBars();
    t.createButtons();
    t.createClock();
    t.createIcons();

    t.createDrawer();
    t.createNotificationBar();

    t.game.events.on(PhoneEvents.Notification, function() {
      t.launchNotification();
    });
    t.launchNotification();
  };

  createBars() {
    let t = this;

    // --- Display top and bottom bars
    let topBar = t.add.rectangle(
      0,
      0,
      t.elements['topBar']['width'],
      t.elements['topBar']['height'],
      t.barColor,
      1.0
    ).setOrigin(0);
    let bottomBar = t.add.rectangle(
      0,
      t.height - t.elements['bottomBar']['height'],
      t.elements['bottomBar']['width'],
      t.elements['bottomBar']['height'],
      t.barColor,
      1.0
    ).setOrigin(0);
  }

  createButtons() {
    let t = this;

    // --- Home button
    t.homeButton = this.add.image(
      t.elements['bottomBar']['width']/2,
      t.height - t.elements['bottomBar']['height']/2,
      'button-homescreen'
    )
      .setInteractive()
      .setOrigin(0.5, 0.5)
      .on('pointerup', () => t.backHome())
      .setScale(t.assetsDPR * 0.5);

    // --- Go back Button
    t.backButton = t.add.text(
      t.width / 5,
      t.height - t.elements['bottomBar']['height']/2,
       "↩",
      {
        fontFamily: 'Roboto',
        fontSize : t.elements['backButton']['fontSize'],
        color: '#ffffff',
        align: 'center'
      }
    )
    .setOrigin(0.5, 0.5)
    .setInteractive()
    .setVisible(false);
  }

  createClock() {
    let t = this;

    // --- Clock time at the upper bar
    t.time = new Time(t,
    t.elements['topBar']['width'] / 2,
    t.elements['topBar']['height'] / 2,
    {
      fontFamily: 'Roboto',
      fontSize : t.elements['clock']['fontSize'],
      color: '#ffffff',
      align: 'center'
    })
      .setOrigin(0.5, 0.5)
      .setResolution(t.assetsDPR);
  }

  createIcons() {
    let t = this;

    // --- Volume icon
    // By default, volume icon is on
    // @TODO: icon atlas
    const muteSwitch = t.add.image(
      t.width - t.elements['notificationBar']['width']*2.1,
      t.elements['topBar']['height'] / 2,
      !t.game.settings.getSettingValue('muteSound') ? 'volume-icon-on' : 'volume-icon-off'
    )
      .setScale(t.assetsDPR * 0.15)
      .setTintFill(0xffffff)
      .setInteractive()
      .setOrigin(0, 0.5)
      .on('pointerup', function(){
        t.game.settings.toggleSetting('muteSound');
      }
    );
    t.game.events.on(PhoneEvents.SettingsUpdated, function(){
      !t.game.settings.getSettingValue('muteSound') ? muteSwitch.setTexture('volume-icon-on') : muteSwitch.setTexture('volume-icon-off');
    });
  }

  createNotificationBar() {
    let t = this;

    this.topNotificationBar = this.add.container(
      t.width - t.elements['notificationBar']['width'],
      -t.height,
      [
        t.add.rectangle(
          0, 0,
          t.elements['notificationBar']['width'],
          t.height + t.elements['topBar']['height'],
          t.elements['notificationBar']['color']
        ).setOrigin(0,0),
        t.add.triangle(
          0, 0,
          0,t.height+t.elements['topBar']['height'],
          t.elements['notificationBar']['width'],
          t.height+t.elements['topBar']['height'],
          t.elements['notificationBar']['width'] / 2,
          t.height + t.elements['topBar']['height'] + t.elements['notificationBar']['width']/2,
          t.elements['notificationBar']['color']
        ).setOrigin(0,0),
        t.add.text(
          t.elements['notificationBar']['width'] / 2,
          t.height + t.elements['topBar']['height'] / 2,
          t.drawerOut ? '↟' : '↡',
          {
            fontFamily: 'Roboto',
            fontSize : t.elements['notificationBar']['fontSize'],
            color: '#ffffff',
            align: 'center'
          }
        )
          .setOrigin(0.5, 0.5)
          .setInteractive()
          .on('pointerup', function(){
              t.drawerOut = !t.drawerOut;
              !t.drawerOut ? this.setText('↡') : this.setText('↟');
              !t.drawerOut ? t.hideDrawer() : t.showDrawer();
            })
      ]
    );
  }

  createDrawer() {
    let t = this;
    let y = 0;

    this.notificationsMaskZone = t.add.rectangle(
      0,
      - t.height + t.elements['topBar']['height'] + t.elements['notificationTitle']['y'] + t.elements['notificationTitle']['fontSize'],
      t.width,
      t.height - t.elements['topBar']['height'] - t.elements['notificationTitle']['y'] - t.elements['notificationTitle']['fontSize'] - t.elements['bottomBar']['height'],
      t.barColor,
      0.0
    ).setOrigin(0,0);
    let mask = new Phaser.Display.Masks.GeometryMask(t, this.notificationsMaskZone);

    t.drawer = t.add.container(
      0, -t.height,
      [
        t.add.rectangle(
          0, 0,
          t.width,
          t.height,
          t.barColor,
          1.0
        ).setOrigin(0,0),
        t.add.text(
          (t.width - t.elements['notificationBar']['width']) / 2,
          t.elements['topBar']['height'] + t.elements['notificationTitle']['y'],
          "Notificacions",
          {
            fontFamily: 'Roboto',
            fontSize : t.elements['notificationTitle']['fontSize'],
            color: '#ffffff',
            align: 'center'
          }
        )
        .setOrigin(0.5, 0.5),
        t.add.line(
          0, 0,
          (t.width - t.elements['notificationBar']['width']) * 0.1 - t.elements['drawerLines']['padding'],
          t.elements['topBar']['height'] + t.elements['notificationTitle']['y'] + t.elements['notificationTitle']['fontSize'],
          (t.width - t.elements['notificationBar']['width']) * 0.9 + t.elements['drawerLines']['padding'],
          t.elements['topBar']['height'] + t.elements['notificationTitle']['y'] + t.elements['notificationTitle']['fontSize'],
         0xffffff)
        .setOrigin(0,0),
        t.add.line(
          0, 0,
          (t.width - t.elements['notificationBar']['width']) * 0.1 - t.elements['drawerLines']['padding'],
          t.height - t.elements['bottomBar']['height'] - 1,
          (t.width - t.elements['notificationBar']['width']) * 0.9 + t.elements['drawerLines']['padding'],
          t.height - t.elements['bottomBar']['height'] - 1,
         0xffffff)
        .setOrigin(0,0)
      ]
    );

    y = t.elements['topBar']['height'] + t.elements['notificationTitle']['y'] + t.elements['notificationTitle']['fontSize'];

    t.notificationsArea = new Phaser.GameObjects.Container(
      t,
      (t.width - t.elements['notificationBar']['width']) * 0.1,
      y + t.elements['notificationArea']['y']
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
            y: (t.elements['notificationBox']['height'] + t.elements['notificationBox']['offset']) * i,
            width: (t.width - t.elements['notificationBar']['width'])*0.8,
            height: t.elements['notificationBox']['height'],
            bgcolor: t.elements['notificationBox']['bgcolor'],
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

    t.notificationsArea.setSize(
      t.width * 2,
      (t.elements['notificationBox']['height'] + t.elements['notificationBox']['offset']) * (t.game.state['notifications'].length) * 2
    );
    t.notificationsArea.setMask(mask);
  }

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

  showDrawer() {
    let t = this;

    const drag_zone_y = t.elements['topBar']['height'] + t.elements['notificationTitle']['y'] + t.elements['notificationTitle']['fontSize'];
    const drag_zone_height = t.height - (t.elements['topBar']['height'] + t.elements['notificationTitle']['y'] + t.elements['notificationTitle']['fontSize']) - t.elements['bottomBar']['height'];

    t.drawer.destroy();
    t.createDrawer();
    t.topNotificationBar.destroy();
    t.createNotificationBar();

    t.log('Drawer out!');
    t.tweens.add({
      targets: [this.drawer, this.notificationsMaskZone],
      y: '+='+t.height,
      duration : 500
    });
    t.tweens.add({
      targets: [this.topNotificationBar],
      y: 0 - t.elements['topBar']['height'],
      duration : 500
    });

    t.notificationsArea.setInteractive();
    t.input.setDraggable(t.notificationsArea);

    const notifications_size = (t.elements['notificationBox']['height'] + t.elements['notificationBox']['offset']) * (t.game.state['notifications'].length);
    const max_height = notifications_size - drag_zone_height - drag_zone_y;

    t.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      t.notificationsArea.y = dragY;
      t.notificationsArea.y = Phaser.Math.Clamp(
        t.notificationsArea.y,
        notifications_size >= drag_zone_height ?
          -max_height :
          drag_zone_y + t.elements['notificationArea']['y'],
        drag_zone_y + t.elements['notificationArea']['y']
      );
    });
  }

  hideDrawer() {
    let t = this;
    let { width, height } = t.cameras.main;
    t.log('Drawer in!');
    t.tweens.add({
      targets: [t.drawer, t.notificationsMaskZone],
      y: '-='+height,
      duration : 500,
      onCompleteScope: t
    });

    t.tweens.add({
      targets: [t.topNotificationBar],
      y: -height,
      duration : 500,
      onCompleteScope: t
    });

    if (t.dragZone !== undefined) {
      t.dragZone.destroy();
    }
  }
}
