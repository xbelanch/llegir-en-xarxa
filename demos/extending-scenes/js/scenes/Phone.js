class Phone extends Phaser.Scene
{
  constructor()
  {
    super({
      key : 'phone'
    });
  }

  preload()
  {

  }

  init()
  {
    let t = this;
    // Display Phone UI
    t.scene.launch('phoneui');
    t.scene.launch('homescreen');

  }
  
  create()
  {
    let t = this;
    console.log("Phone Game is active");
  }

  
}
