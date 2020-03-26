class Wifi extends Phaser.Scene {
  constructor()
  {
    super({ key: 'wifi' });
  }

  preload()
  {
    let t = this;
    // Load config
    t.config = t.cache.json.get('wifi');
    // Load HTML form
    t.load.html('wifiform', 'assets/html/wifiform.html');
  }

  init()
  {
    let t = this;
    t.scene.bringToTop('PhoneUI');
    // @TODO: Cal "remove" app anterior. És a dir, si l'usuari
    // està en l'app Time i clica WiFi, apareix renderitzat l'app Time
    // Fes seqüència -> Time -> WiFi -> HomeScreen i veuràs el resultat
  }

  create()
  {
    let t = this;

    // First of all, add the background picture
    t.addBackgroundImage();


    // Title of the app
    // @TODO: Must include it at json config
    t.add.text(92, 128, 'Xarxes Wi-Fi', { color: '#eae17f', fontFamily: 'Roboto', fontSize: '64px'});



    // @TODO: Same of this
    let xarxes = [
      {nom : 'Biblioteca', estat: 'protegida', type: 'active'},
      {nom : 'MyBox-ONE', estat: 'fora de l\'abast', type: 'inactive'},
      {nom : 'HappyPhone', estat: 'fora de l\'abast', type: 'inactive'}
    ];

    // Definir un text-globus de notificació.
    // @TODO: Prefab --
    let message = this.add.text(92,0, 'Fora de cobertura').setColor('#eae17f').setFontFamily('Roboto').setFontSize('48px');

    for (let xarxa of xarxes)
    {
      let p = this.add.text(92, 320 + (xarxes.indexOf(xarxa) * 92), xarxa.nom)
          .setColor('#eae17f').setFontFamily('Roboto').setFontSize('48px').
          setInteractive().on('pointerdown', function() {
            if (xarxa.type == 'active')
            {
              // Display formulari de connexió d'accés.
              formWiFiPassword.setVisible(true);
              t.tweens.add({
                targets: formWiFiPassword,
                y: 600,
                duration: 2000,
                ease: 'Power3',
                onComplete: function()
                {
                  // @TODO Cal bloquejar qualsevol altra interacció possible amb la resta d'elements
                  // propis de l'app Wifi
                  // p.disableInteractive();
                }
              });
            }
          });
      this.add.text(92, p.y + 48, xarxa.estat).setColor('#eae17f').setFontFamily('Roboto').setFontSize('32px').setFontStyle('bold italic');
    }

    // Password form as seen at: https://labs.phaser.io/edit.html?src=src/game%20objects/dom%20element/form%20input.js&v=3.22.0
    let formWiFiPassword = t.add.dom(400, 0).createFromCache('wifiform');
    // @ALERT There is not a way to combine depth order between dom and canvas elements
    // Read the fucking manual:
    // Dom elements appear above or below your game canvas. You cannot blend them into the display list, meaning you cannot have a DOM Element, then a Sprite, then another DOM Element behind it.
    // Source: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/domelement/
    // But... maybe a solution: https://github.com/photonstorm/phaser3-examples/blob/master/public/src/game%20objects/dom%20element/div%20position%20test%205.js

    formWiFiPassword.addListener('click');
    formWiFiPassword.setVisible(false);
    formWiFiPassword.addListener('click');
    formWiFiPassword.on('click', function (event) {
      // Deal with forms inputs
      let inputPassword = this.getChildByName('inputPassword');
      if (event.target.name === 'Acceptar')
      {
        // Check if Password is correct
        if (inputPassword.value === '1234')
        {

        } else {
          // @TODO: Mostrar missatge error en pantalla
          // Utilitzar la class .invalid de Bootstrap?
          let incorrect = formWiFiPassword.getChildByName('error').node;
          this.log(incorrect.innerText);

        }
      }
      if (event.target.name === 'Cancelar') {
        formWiFiPassword.setVisible(false);
        inputPassword.value = '';
        // @NOTE: How to remove this form from dom or reset it?
        // @TODO: Entenc que aquí tornem la interactivitat a la llista de xarxes
      }
    });
  }

  addBackgroundImage()
  {
    let t = this;
    t.add.image(0, 0, 'background-wifi').setOrigin(0);
  }

}
