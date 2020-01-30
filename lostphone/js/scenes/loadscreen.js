class LoadScreen extends Phaser.Scene {
  constructor(){
    super('loadScreen');
  }

  init(){
    var text = this.add.text(0, 0, '', {fontFamily: 'roboto', fontSize: 24, color: '#cfcfcf', linespacing: -13 });
    text.setText([
      'Game Title: ' + titleGame,
      'Version: ' + gameVersion,
      'Fullscreen: ' + this.scale.isFullscreen
    ]);
  }  
}
