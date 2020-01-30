var titleGame = "Llegir en xarxa";
var gameVersion = "0.0.1";
var seed = 1419463258969;

function runGame(width, height)
{
  var config = {
        type: Phaser.AUTO,
        backgroundColor: 0x343434,
        scale: {
          parent: 'game',
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: width,
          height: height
        },
    scene: [Boot, LoadScreen]
      };
  new Phaser.Game(config);
}

class Boot extends Phaser.Scene {
  constructor(){
    super('boot');
  }
  
  preload(){
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  create(){
    let t = this;
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
}

class LoadScreen extends Phaser.Scene {
  constructor(){
    super('loadScreen');
  }

  init(){
    var text = this.add.text(0, 0, '', {fontFamily: 'roboto', fontSize: 14, color: '#ff0', linespacing: -13 });
    text.setText([
      'Game Title: ' + titleGame,
      'Version: ' + gameVersion
    ]);
  }  
}

function gofull() {
    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }
}

// Check screen size and set width and height properly values
window.onload = function(){
  let clientHeight = document.getElementById('container').clientHeight;
  // by default, Galaxy S5 dimensions
  let width = 412;
  let height = 732;
  // well, students are visiting the web on a desktop or laptop
  if (clientHeight > 900)
  {
    width = 824;
    height = 1464;
  }
  runGame(width, height);
};
