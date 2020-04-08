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
    
    // PhoneUI sempre estarà per sobre de la resta d'escenes
    t.scene.bringToTop();

    // Obtenim l'amplada i alçada del canvas del joc
    let { width, height } = t.sys.game.canvas;

    const x = width * 0.5;
    const y = height * 0.3;

    // --- Basic UI top - bottom
    // Mostrem la part superior i inferior de fons on s'ubicaran
    // els botons comuns del mòbil (home, back, clock, bateria, wifi...)
    const heightFrontBottomPhoneUI = t.textures.getFrame('phoneui', 'phoneui-front-bottom').height;
    
    let phoneui_front_top = t.add.image(x, 0, 'phoneui', 'phoneui-front-top')
        .setScale(DPR)
        .setOrigin(0.5, 0);
    let phoneui_front_bottom = t.add.image(x, height - heightFrontBottomPhoneUI, 'phoneui', 'phoneui-front-bottom')
        .setScale(DPR)
        .setOrigin(0.5, 0);

    // --- Wifi
    // @TODO Aquest factor d'escala dependrà de les dimensions de pantalla
    // Ara mateix només contemplem desktop amplada > 1024
    let factorScale = 0.5;
    t.wifi = t.add.image(x - (phoneui_front_top.width / 2), 0, 'phoneui', 'wifi-icon-lock')
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
        if (SceneManager.active != SceneKeys.Clock)
        {
          t.scene.stop(SceneKeys.HomeScreen);
          t.scene.launch(SceneKeys.Clock, {
            toScene: SceneKeys.Clock,
            fromScene : SceneKeys.HomeScreen });          
        }
      })
    ;

    // --- Home button
    // Cada vegada que l'usuari el clica, torna a la homeScreen
    // i atura l'anterior scene en actiu
    t.homescreen = t.add.image(x, height - (heightFrontBottomPhoneUI * 0.3), 'phoneui', 'phoneui-home-button')
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
    const fontSize = 24;
    t.time = new Time(t, x, fontSize, {
      fontFamily: 'Roboto',
      fontSize,
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
