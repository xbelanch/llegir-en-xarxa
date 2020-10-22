// ---
// --- Wifi App
// ---

class WifiApp extends App
{
  constructor()
  {
    super();
    this.config = null;
    this.xarxes;
    this.xarxesEstat;
    this.outOfRangeMessage; // popup
    this.wifiPasswordInputForm;
    this.numberPad;
    this.colors;
    this.password;
  }

  init()
  {
    let t = this;
    super.init();
    t.registry.set('activeApp', 'wifiApp');    
  }

  preload()
  {
    let t = this;
    super.preload();
    t.colors = t.cache.json.get('config').colors;
    t.config = t.cache.json.get('wifi');
  }

  create()
  {
    let t = this;
    super.create();
    let Phone = t.game.config;
    const x = Math.round(Phone.width / 2);
    const y = Math.round(Phone.height / 2);

    let scale = t.getImageScale(t.config.wallpaper);

    // Pintem el fons de pantalla
    let wallpaper = t.add.image(x, y, t.config.wallpaper)
        .setOrigin(0.5, 0.5)
        .setScale(scale.w, scale.h);

    // Pintem el títol de l'App
    let title = t.add.text(
      Phone.width > 570 ? 24 : 12,
      Phone.height > 720 ? 72 : 48,
      t.config.title, {
        fontFamily : 'Roboto',
        fill : '#ffffff',
        fontSize : (Phone.width >= 525 ? 24 : 18) * DPR
      }).setOrigin(0);

    // Presentem la llista de xarxes disponibles
    t.xarxes = new Array();
    t.xarxesEstat = new Array();
    for (var xarxa in t.config.networks)
    {
      var name = t.config.networks[xarxa][0];
      var access = t.config.networks[xarxa][1];
      var message = t.config.networks[xarxa][2];
      var password = t.config.networks[xarxa][3];

      t.xarxes[xarxa] = t.add.text(title.x, title.y + 128 +  (xarxa * 72), name, {
        fontFamily : 'Roboto',
        fontSize : (Phone.width >=  525 ? 20 : 12)        
      })
        .setDataEnabled()
        .setData('name', name)
        .setData('access', access)
        .setData('message', message)
        .setData('password', password)
        .setInteractive()
        .on('pointerover', function(){
          this.setTint(0xffff00);
        })
        .on('pointerout', function(){
          this.setTint(0xffffff);
        })
        .on('pointerup', function(){
          if (!this.getData('password'))
          {
            if (t.outOfRangeMessage === undefined)
            {
              // Creem el popup
              t.outOfRangeMessage = new Popup(t, this.getData('message'));  
            }
            if (!t.outOfRangeMessage.isActive)
            {
              t.outOfRangeMessage.display({
                hold: 2000
              });
            }
            
          } else {
            // Afegim el formulari de contrasenya de la xarxa    
            if (t.wifiPasswordInputForm === undefined)
            {
              t.wifiPasswordInputForm = t.newPasswordInputForm(x, y, this.getData('message'));
            } else {
              t.wifiPasswordInputForm.setVisible(true);
            }
            // desactivem la interacció de les xarxes
            t.disableInteractive();
          }
        });

      t.xarxesEstat[xarxa] = t.add.text(t.xarxes[xarxa].x + 360, t.xarxes[xarxa].y + 5, access, {
        fontFamily : 'Roboto',
        fontSize : (Phone.width >= 525 ? 20 : 12)
      });
    }    
  }

  disableInteractive()
  {
    let t = this;
    for (const xarxa in t.xarxes)
    {
      t.xarxes[xarxa].disableInteractive();
    }
  }

  enableInteractive()
  {
    let t = this;
    for (const xarxa in t.xarxes)
    {
      t.xarxes[xarxa].setInteractive();
    }
  }


  newNumberPad()
  {
    let t = this;
    let Phone = t.game.config;

    var displayPassword = '';
    var passwordValue = '';

    var numberPad  = t.add.container(0, Phone.height);
    var numberPadButtons = t.add.container(0, Phone.height);


    var boxPad = t.add.graphics({ x : 0, y : Phone.height });
    var boxPadHeight = Math.floor(Phone.height * 0.65);
    boxPad.fillStyle(t.colors.black, 1);
    boxPad.fillRect(0, 0, Phone.width, boxPadHeight);

    var enterNumberPad = new Phaser.GameObjects.Rectangle(t, boxPad.x, boxPad.y, Phone.width, 64);
    enterNumberPad.setFillStyle(t.colors.white, 1);
    enterNumberPad.setOrigin(0);

    var displayNumberPad = t.add.text(
      enterNumberPad.x + Math.floor(enterNumberPad.width / 2),
      enterNumberPad.y + Math.floor(enterNumberPad.height / 2),
      displayPassword, {
        fontFamily: 'Roboto',
        fontSize: 52,
        align: 'center',
        color : t.colors.numberPad_numbers
      }).setOrigin(0.5);
    
    // create a second container for Pad buttons
    var padding = 4;
    var margin = 18;
    var buttonWidth = Math.floor((Phone.width  - (margin * 2) - (padding * 2)) / 3 );
    var buttonHeight = 92;
    var yOffset = enterNumberPad.y + enterNumberPad.height + margin;
    var buttons = new Array();
    var numberText = new Array();
    var row = 0;
    for (var i = 0; i < 12; i++)
    {
      // Calculem la posició de cada butó del Pad
      var posX = ((i % 3) * buttonWidth) + (i === 0 ? margin : margin + (padding * (i % 3)));
      if (i % 3 === 0 && i > 0)
        row++;
      var posY = yOffset + (buttonHeight * row) + (row > 0 ? padding * row : 0);

      // Creem el butó amb la interactivitat
      buttons[i] = new Phaser.GameObjects.Rectangle(t, posX, posY, buttonWidth, buttonHeight);
      if (i === 9)
        buttons[i].setFillStyle(t.colors.numberPad_delete, 1);
      else if (i === 11)
        buttons[i].setFillStyle(t.colors.numberPad_enter, 1);
      else 
        buttons[i].setFillStyle(t.colors.numberPad_buttons, 1);
      
      buttons[i].setOrigin(0);

      // Set the correct value
      if (i === 0)
        buttons[i].setData({ 'value' : 1 });
      else if (i === 9)
        buttons[i].setData({ 'value' : 'Del' });
      else if (i === 10)
        buttons[i].setData({ 'value' : 0 });
      else if (i === 11)
        buttons[i].setData({ 'value' : 'Enter' });
      else
        buttons[i].setData({ 'value' : i + 1});
      
      buttons[i].setInteractive()
        .on('pointerover', function(){
          var value = this.getData('value');
          if (value === 'Del')
            this.setFillStyle(t.colors.numberPad_delete, 1);
          else if (value === 'Enter')
            this.setFillStyle(t.colors.numberPad_enter, 1);
          else 
            this.setFillStyle(t.colors.numberPad_buttons_over, 1);
        })
        .on('pointerout', function(){
          var value = this.getData('value');
          if (value === 'Del')
            this.setFillStyle(t.colors.numberPad_delete, 1);
          else if (value === 'Enter')
            this.setFillStyle(t.colors.numberPad_enter, 1);
          else 
            this.setFillStyle(t.colors.numberPad_buttons, 1);          
        })
        .on('pointerup', function(){
          var value = this.getData('value').toString();

          if (value.localeCompare('Del') === 0)
          {
            passwordValue = passwordValue.slice(0, -1);
          }
          else if (value.localeCompare('Enter') === 0)
          {
            numberPad.setVisible(false);
            var textFormDisplay = t.wifiPasswordInputForm.getAt(6);
            console.log(passwordValue.length);
            textFormDisplay.text =  Array(passwordValue.length + 1).join('*');
            // textFormDisplay.setData('password', passwordValue);
            t.password = passwordValue;
          }
          else if (passwordValue.length < t.config.limitPasswordCharacters)
          {
            passwordValue += value;            
          }

          // update display value
          displayNumberPad.text = passwordValue;          
        });

      // Afefim els nombres
      numberText[i] = t.add.text(buttons[i].x + Math.floor(buttonWidth / 2), buttons[i].y + Math.floor(buttonHeight / 2), buttons[i].getData('value'), {
        fontFamily: 'Roboto',
        fontSize: 52,
        color : t.colors.numberPad_numbers
      }).setOrigin(0.5);

    }
    
    numberPad.add(boxPad);
    numberPad.add(enterNumberPad);
    numberPad.add(buttons);
    numberPad.add(numberText);
    numberPad.add(displayNumberPad);
    return numberPad;
  }

  showNumberPad()
  {
    let t = this;
    let Phone = t.game.config;
    
    t.tweens.add({
      targets : t.numberPad,
      y : -(Math.floor(Phone.height / 1.77)),
      duration : 700,
      ease : 'Power2'
    });
  }
  
  newPasswordInputForm()
  {
    let t = this;
    let Phone = t.game.config;
    const x = Math.round(Phone.width / 2);
    const y = Math.round(Phone.height / 2);
    const width = 350;
    const height = 256;
    const padding = 40;
    const password  = t.config.password;
    const inputPassword = undefined;
    const displayPassword = undefined;
    
    var container = t.add.container(x - Math.floor(width / 2), y - Math.floor(height / 2));

    var bubble = t.add.graphics({ x: 0, y: 0 });
    bubble.fillStyle(0xacacac, 1);
    bubble.lineStyle(4, 0x565656, 1);
    bubble.strokeRoundedRect(0, 0, width, height, 16);
    bubble.fillRoundedRect(0, 0, width, height, 16);
    
    var text = t.add.text(Math.floor(width / 2), Math.floor(padding * 1.3), "La xarxa està protegida per contrasenya", {
      fontFamily: 'Roboto',
      fontSize: 24,
      color: '#ffffff',
      align: 'center',
      wordWrap: {
        width: width - (padding * 2)
      }
    }).setOrigin(0.5);

    var displayForm = new Phaser.GameObjects.Rectangle(t, text.x, text.y + 72, 192, 48);
    displayForm.setFillStyle(0xffffff, 1);
    displayForm.setInteractive().on('pointerup', function(){
      if (t.numberPad === undefined )
      {
        t.numberPad = t.newNumberPad();
        t.showNumberPad();
      } else {
        t.numberPad.y = Phone.height;
        t.numberPad.setData('password', undefined);
        t.numberPad.setVisible(true);
        t.showNumberPad();
      }
    });

    // Mostra aquest text o popup ? si la contrasenya no és correcta
    var passwordIncorrect = t.add.text(text.x, 300, "Contrasenya incorrecta", {
      fontFamily: 'Roboto',
      fontSize: 18,
      color: '#ff0000',
      align: 'center',                  
    }).setVisible(false);

    // Mostra aquest text o popup si la contrasenya és vàlida
    var passwordIsValid = t.add.text(text.x, 300, "Contrasenya correcta", {
      fontFamily: 'Roboto',
      fontSize: 32,
      color: '#00ff00',
      align: 'center',                  
    }).setVisible(false);


    // Verifica si la contrasenya és o no correcta
    var accept = new TextButton(t, text.x, displayForm.y + padding, "Acceptar", {
      fontFamily: 'Roboto',
      fontSize: 24,
      color: t.colors.white,
      align: 'center'
    }, () => t.checkPassword());
    
    var cancel = new TextButton(t, accept.x, accept.y + padding, "Cancel·lar",{
      fontFamily: 'Roboto',
      fontSize: 24,
      color: t.colors.white,
      align: 'center'
    }, () => t.cancelInputPassword());


    var passwordFormDisplay = t.add.text(displayForm.x, displayForm.y, null , {
      fontFamily : 'Roboto',
      fontSize: 32,
      color: t.colors.black,
      align: 'center'
    }).setOrigin(0.5);
    
    
    container.add(bubble);
    container.add(text);
    container.add(accept);
    container.add(cancel);
    container.add(passwordIncorrect);
    container.add(displayForm);
    container.add(passwordFormDisplay);
    container.setVisible(true);
    return container;
  }

  checkPassword()
  {
    let t = this;
    if (t.password !== undefined)
    {
      if (t.password.localeCompare(t.config.password) === 0)
      {
        t.unlockWiFi();
        return;
      }      
    }
    console.log("Password is incorrect"); // Popup
  }

  cancelInputPassword()
  {
    let t = this;
    t.enableInteractive();
    t.wifiPasswordInputForm.setVisible(false);      
  }


  unlockWiFi()
  {
    let t = this;
    t.enableInteractive();
    t.wifiPasswordInputForm.setVisible(false);
    // Actualitzem la informació de Protegida a Connectada
    t.xarxesEstat[0].text = 'Connectada';
    // Actualitzem la icona de la wifi!
    var wifi_signal_icon = t.scene.get('phoneUI').wifi_signal_icon;
    wifi_signal_icon.setTexture('phone_ui_icons_states', 'wifi-signal-on');
    t.registry.set('unlockWifi', true);    
  }

  
}

  
