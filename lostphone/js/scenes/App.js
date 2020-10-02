// --- App
//
//
class App extends Phaser.Scene
{
  constructor()
  {
    super();
    
  }
        
  init(data)
  {
    let t = this;
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
      y : 70,
      duration : 500,
      ease : 'Power2',
      yoyo : true,
      repeat : 0,
      hold : 750,
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
