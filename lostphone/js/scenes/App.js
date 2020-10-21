// --- App
//
//
class App extends Phaser.Scene
{
  constructor()
  {
    super();
  }

  // We define some global variables for scenes
  init(data)
  {
    let t = this;

    let { width, height } = this.getPhoneDimensions();    
    this.width = width;
    this.height = height;
    this.x = width / 2;
    this.y = height / 2; 
  }

  // We load the wallpaper in preload so we don't see the "pink" background
  // while the assets are loading
  preload()
  {
    let t = this;
    let scale = t.getImageScale('home-wallpaper');
    let wallpaper = t.add.image(t.x, t.y, 'home-wallpaper')
        .setOrigin(0.5, 0.5)
        .setScale(scale.w, scale.h);
    t.graphics = t.add.graphics(); 
  }
        
  // Create method
  create()
  {

  }

  // --- Private methods
  // 
  getPhoneDimensions()
  {
    let t = this;
    let Phone = t.game.config;
    return {
      width : Phone.width,
      height : Phone.height
    };
  }

  getImageScale(keyImg)
  {
    let t = this;
    let Phone = t.game.config;
    let scaleWidth, scaleHeight = 1.0;
    let img = t.textures.get(keyImg).getSourceImage();
    if (img.width < Phone.width || img.width > Phone.width)
    {
      scaleWidth = Phone.width / img.width;
    }
    if (img.height < Phone.height || img.height > Phone.height)
    {
      scaleHeight = Phone.height / img.height;
    }    
    return { w : scaleWidth, h : scaleHeight };
  }

  displayPopup(popup)
  {
    let t = this;
    t.tweens.add({
      targets: popup,
      y : 140,
      duration : 500,
      ease : 'Power2',
      yoyo : true,
      repeat : 0,
      hold : 2000,
      onStart : t.onStartHandler,
      onStartScope : t,
      onStartParams : [ popup ],
      onComplete : t.onCompleteHandler,
      onCompleteScope : t,
      onCompleteParams : [ popup ]
    });
  } 

  onStartHandler(tween, targets, popup)
  {
    popup.isActive = true;
    popup.setVisible(true);
  }

  onCompleteHandler(tween, targets, popup)
  {
    popup.isActive = false;
    popup.setVisible(false);
  }
}
