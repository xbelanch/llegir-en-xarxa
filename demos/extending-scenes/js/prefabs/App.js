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

  }

  // Private methods
  myPrivate()
  {
    console.log("Testing a simple dummy private method");
  }
}
