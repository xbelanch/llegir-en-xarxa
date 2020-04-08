// Preload
// Escena on carregarà el conjunt d'assets del joc (sprites, àudio, videos....)
class Preload extends Phaser.Scene
{
  preload()
  {
    // load resources
    this.load.image('bart', 'assets/img/bart.png');
    this.load.image('clock-wallpaper', 'assets/img/homer.jpg');
    this.load.image('homescreen-wallpaper', 'assets/img/homescreen-wallpaper.png');
    this.load.atlas('phoneui', 'assets/img/phoneui.png', 'assets/img/phoneui_atlas.json');
    this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');    
  }

  create()
  {
    // this.sound.play();
    this.game.events.emit(GameEvents.PreloadFinished);
  }
}
