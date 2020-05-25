//
// --- Wifi App
//
class WiFi extends App
{
  constructor()
  {
    // init() i preload() haurien de ser mètodes comunes a totes les apps
    super();
    this.buttons = [
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      ['0', 'C', 'E']
    ];
    this.pad = null;
    this.title = "Xarxes WiFi";
    this.xarxes = [
      ["Xarxa WiFi pública biblioteca", "Protegida"],
      ["MyBo-XONE", "Fora de l\'abast"],
      ["MiWiFI_2dcX", "Fora de l\'abast"]
    ];
    this.xarxa = [];
    this.message = null;
    this.isMessageActive = false;
  }

  preload()
  {
    // provisional?
    this.load.image('pepe', 'assets/img/pepe.png');
    this.load.image('tmp-wallpaper', 'assets/img/tmp-wallpaper.png');
  }

  // @NOTE:
  // Recorda que els mètodes preload i init estan derivats de la class App

  create()
  {
    let t = this;
    let { width, height } = t.sys.game.canvas;
    t.width = width;
    t.height = height;
    t.x = width / 2;
    t.y = height / 2;
    var pepe = t.add.sprite(64, 64, 'pepe').setOrigin(0.5);

    var container = [];
    // Add a wallpaper or whatever
    let wallpaper = t.add.image(t.x, t.y, 'tmp-wallpaper')
           .setOrigin(0.5, 0.5);

    // Add and set false display out of range message
    // @TODO: Make a class or prefab!
    // ref: https://phaser.discourse.group/t/how-to-remove-text/742

    t.message = t.add.text(t.x - 220, -50, "Fora de l'abast. Connexió no disponible", {
      fill : '#ff0',
      font : '24px cursive'
    }).setOrigin(0).setVisible(false);

    // Display the wifi names avalaibles
    var offset = 0;
    var xarxa = [];
    for (var i = 0; i < t.xarxes.length; i++)
    {
      var name = t.xarxes[i];

      t.xarxa[i] = t.add.text(t.x - 256, t.y + (i * 64) + offset - 256, name, {
        fill : '#fff',
        font : '24px cursive'
      })
          .setInteractive()
          .setOrigin(0);

      //
      t.xarxa[i].on('pointerdown', function(){

        // ho sé, molt cutre
        var firstLetter = t.xarxes[0][0][0];
        if (this.text[0] === firstLetter)
        {
          console.log("La red está protegida por contraseña");
          t.showPad();
        } else {
          if (t.isMessageActive) {
            return;
          }
          console.log("Fuera del alcanze. Conexión no disponible");
          t.outOfRangeMessage();
        }
      });

      offset += 64;
    }
  }

  showPad()
  {
    let t = this;

    // Create numpad
    t.pad = new NumberPad(t, 0, t.height, {
      buttons: this.buttons,
      maxLength: 4
    });


    t.tweens.add({
      targets: t.pad,
      y: 0,
      duration: 700,
      ease: 'Power2',
      onStart : function(){
          // Desactivem interacció dels elements
          t.pad.disableInteractive();
          for (var i = 0; i < t.xarxa.length; i++)
          {
              t.xarxa[i].disableInteractive();
          }
      },
      onComplete: function(){
          // Activem només la del Pad
          t.pad.setInteractive();
      }
    });
  }


  outOfRangeMessage()
  {
    let t = this;
    t.message.setVisible(true);

    t.tweens.add({
      targets: t.message,
      y: 70,
      duration: 500,
      ease: 'Power2',
      yoyo: true,
      repeat: 0,
      hold: 750,
      onStart : t.onStartHandler,
      onStartScope: t,
      onComplete: t.onCompleteHandler,
      onCompleteScope: t,
      onCompleteParams: [ t.message ]
    });
  }

  onStartHandler(tween, targets)
  {
    let t = this;
    t.isMessageActive = true;
    console.log(t.isMessageActive);
  }

  onCompleteHandler(tween, targets, myMessage)
  {
    let t = this;
    t.isMessageActive = false;
    console.log(t.isMessageActive);
    myMessage.setVisible(false);
  }

  afterNumPadDestroy() {
      let t = this;
      for (var i = 0; i < t.xarxa.length; i++)
      {
          // Un cop destruit el Pad, tornem a activar les xarxes
          t.xarxa[i].setInteractive();
      }
  }
}
