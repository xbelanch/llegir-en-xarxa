//
// --- App
//
class App extends Phaser.Scene
{
  constructor()
  {
    super();
    // Class variables 
    this.MyApp = 'This is an App';
    this.From;
  }
      
  preload()
  {
    
  }
  
  init(data)
  {
    let t = this;
    // Indiquem l'app com a activa
    SceneManager.active = data.toScene;
    console.log(SceneManager.active);
    // Aturem l'app que vingui de l'anterior - habitualment del homescreen
    t.scene.stop(data.fromScene);
    // PhoneUI és sempre per sobre de totes la resta d'escenes.
    t.scene.bringToTop(SceneKeys.PhoneUI);
    console.log(SceneKeys.PhoneUI + ' is active?' + t.scene.isActive(SceneKeys.PhoneUI));
    console.log(data.toScene + ' is active?: ' + t.scene.isActive(data.toScene));
    console.log(data.fromScene + ' is active?: ' + t.scene.isActive(data.fromScene));
    console.log(SceneKeys.PhoneUI + 'is visible?' + t.scene.isVisible(SceneKeys.PhoneUI));
    console.log(data.toScene + ' is visible?: ' + t.scene.isVisible(data.toScene));
    console.log(data.fromScene + ' is visible?: ' + t.scene.isVisible(data.fromScene));
  }

  // Private methods
  myPrivate()
  {
    console.log("Testing a simple dummy private method");
  }
}
