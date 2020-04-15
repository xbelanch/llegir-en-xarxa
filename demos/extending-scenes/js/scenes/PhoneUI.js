//
// --- PhoneUI
//

class PhoneUI extends Phaser.Scene
{
  constructor()
  {
    super( {key : 'phoneUI'} );
    // --- private variables
    this.time;
    this.wifi;
    this.homescreen;
  }

  init()
  {
    let t = this;
  }

  create()
  {
    let t = this;
   
    // Obtenim l'amplada i alçada del canvas del joc
    let { width, height } = t.sys.game.canvas;

    const x = width * 0.5;
    const y = height * 0.3;

    // --- Basic UI top - bottom
    // Mostrem la part superior i inferior de fons on s'ubicaran
    // els botons comuns del mòbil (home, back, clock, bateria, wifi...)
    /*
    const heightFrontBottomPhoneUI = t.textures.getFrame('phoneui', 'phoneui-front-bottom').height;
    let phoneui_front_top = t.add.image(x, 0, 'phoneui', 'phoneui-front-top')
        .setScale(DPR)
        .setOrigin(0.5, 0);
    let phoneui_front_bottom = t.add.image(x, height - heightFrontBottomPhoneUI, 'phoneui', 'phoneui-front-bottom')
        .setScale(DPR)
        .setOrigin(0.5, 0);
    */
    // @NOTE: https://viewportsizer.com/devices/
    // Cal adaptar aquestes mides fixes a la versió Desktop/Mobile?
    // Tal com ja es té en compte en la versió lostphone
    // Per obtenir els 552 pixels d'amplada es calcula a través d'una simple regla de tres
    // 1. Obtenir l'alçada disponible de l'àrea de render del navegador (per exemple, 983 px)
    // 2. 983 -> 640
    //     x  -> 360
    // x = 552    
    let phone_top_bar = this.add.rectangle(x, 0, 552 * DPR, 40 * DPR, DarkColor, 0.8)
        .setOrigin(0.5, 0);
    let phone_bottom_bar = this.add.rectangle(x, height, 552 * DPR, 60 * DPR, DarkColor, 1.0)
        .setOrigin(0.5, 1.0);

    // --- Wifi
    // @TODO Aquest factor d'escala dependrà de les dimensions de pantalla
    // Ara mateix només contemplem desktop amplada > 1024
    let factorScale = 0.5;
    // t.wifi = t.add.image(x - (phoneui_front_top.width / 2), 0, 'phoneui', 'wifi-icon-lock')
    t.wifi = t.add.image(x - (phone_top_bar.width / 2), 0, 'phoneui', 'wifi-icon-lock')
      .setScale(DPR * factorScale)
      .setOrigin(-0.1)
      .setInteractive()
      .on('pointerdown', function(){
        t.wifi.tint = 0xffff00;
      })
      .on('pointerup', function(){
        t.wifi.tint = 0xffffff;
        // Aturem l'escena de homescreen i iniciem l'app de
        // configuració de la WiFi del mòbil
        if (SceneManager.active != SceneKeys.WiFi)
        {
          t.scene.stop(SceneKeys.HomeScreen);
          t.scene.launch(SceneKeys.WiFi, {
            toScene: SceneKeys.WiFi,
            fromScene : SceneKeys.HomeScreen });          
        }
      })
    ;

    // --- Home button
    // Cada vegada que l'usuari el clica, torna a la homeScreen
    // i atura l'anterior scene en actiu
    // t.homescreen = t.add.image(x, height - (heightFrontBottomPhoneUI * 0.3), 'phoneui', 'phoneui-home-button')
    t.homescreen = t.add.image(x, height - (phone_bottom_bar.height / 2), 'phoneui', 'phoneui-home-button')
      .setOrigin(0.5, 0.5)
      .setScale(DPR)
      .setInteractive()
      .on('pointerover', function(){
        t.homescreen.tint = 0xff0000;
      })
      .on('pointerout', function(){
        t.homescreen.clearTint();
      })
      .on('pointerdown', function(){
        t.homescreen.tint = 0xff00ff;
      })
      .on('pointerup', function(){
        // @TODO: Aturar l'escena app activa
        // i mostrar el homescreen
        if (SceneManager.active != SceneKeys.HomeScreen)
        {
          t.scene.stop(SceneManager.active)
          t.scene.launch(SceneKeys.HomeScreen);
        }
        // t.setActiveScene(t.homescreen);
      });

    
    // --- Rellotge digital a la part superior del mòbil
    t.time = new Time(t, x, phone_top_bar.height / 2, {
      fontFamily: 'Roboto',
      fontSize : 22 * DPR,
      color: '#ffffff',
      align: 'center'
    })
      .setOrigin(0.5, 0.5)
      .setScale(DPR);
  }
b
  update(delta, time)
  {
    let t = this;
    t.time.update();
  }

  // @TODO: Llegir la documentació si és realment
  // aquesta l'opció per sempre disposar de l'UI per sobre
  // de la resta d'escenes.
  refresh()
  {
    let t = this;
    t.scene.bringToTop();
  }

  // --- Private methods
  setActiveScene(btn)
  {
    let t = this;
    // @TODO 
    /*
    if (t.scene.isVisible(t.currentScene))
    {
      console.log(btn.getData('scene') + ' is visible');
      t.scene.setVisible(false, t.currentScene);
    } else {
      console.log(btn.getData('scene') + ' is not visible');
      t.scene.setVisible(true, t.currentScene);      
    }    
    if (t.scene.isActive(t.currentScene)){
      console.log(btn.getData('scene') + ' is active');
      t.scene.stop(t.currentScene);
    }
    */
  }  
}
