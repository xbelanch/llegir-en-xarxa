// --- App
//
//
export default class App extends Phaser.Scene
{
  constructor()
  {
    super();
  }

  init()
  {

  }
  
  create()
  {
    let t = this;
    t.cameras.main.setBackgroundColor(0xc3c3c3);
    // --- I have no idea if there's outside a better
    // way to handle with this
    t.scene.bringToTop('PhoneUI');
  }

}
