class App extends Phaser.Scene
{

  preload()
  {
    
  }
  
  init()
  {
    let t = this;
    t.scene.bringToTop('HomeScreen');
  }
}
