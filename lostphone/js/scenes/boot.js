class Boot extends Phaser.Scene {
  constructor(){
    super('boot');
  }
  
  preload(){
    // Need it to load the Roboto font
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  create(){    
    let t = this;
    // This loads the Roboto main font or others fonts
    WebFont.load({
      custom: {
        families: ['roboto']
      },
      active: function ()
      {
        t.scene.start('loadScreen');
      }
    })
  }

  init(){
    // Enter fullscreen?
    this.scale.on('enterfullscreen', function() {});
  }
}
