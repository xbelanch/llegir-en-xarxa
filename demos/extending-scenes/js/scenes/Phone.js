class Phone extends Phaser.Scene
{
  constructor()
  {
    super();
  }
  
  preload()
  {

  }

  init()
  {
    let t = this;
    // Iniciem en paral·lel les escenes
    // del Homescreen i UI del Phone
    const PhoneUI = t.scene.launch(SceneKeys.PhoneUI);
    const HomeScreen = t.scene.launch(SceneKeys.HomeScreen);
    SceneKeys.active = SceneKeys.HomeScreen;
  }
  
  create()
  {
    let t = this;
    console.log("Phone Game is active");
  }  
}
