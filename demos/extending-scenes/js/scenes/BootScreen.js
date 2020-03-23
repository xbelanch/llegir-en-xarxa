class Boot extends Phaser.Scene
{
  constructor()
  {
    super({
      key : 'boot'
    });
  }

  // from: https://github.com/nkholski/phaser3-es6-webpack/blob/master/src/scenes/BootScene.js
  preload()
  {
    this.load.on('complete', ()=>{
      this.scene.start('phone');
    }, this);

    // load resources
    this.load.image('bart', 'assets/img/bart.png');
    this.load.image('homescreen-wallpaper', 'assets/img/homescreen-wallpaper.png');
    this.load.atlas('phoneui', 'assets/img/phoneui.png', 'assets/img/phoneui_atlas.json');
    this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
    
  }
}
