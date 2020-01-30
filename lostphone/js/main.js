var titleGame = "Llegir en xarxa";
var gameVersion = "0.0.1";

function runGame(width, height)
{
  var config = {
        type: Phaser.WEBGL,
        backgroundColor: 0x343434,
        scale: {
          parent: 'game',
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          // #1 Sembla que no funciona?
          // minWidth: width,
          // maxWidth: height,
          width: width,
          height: height,
          fullscreenTarget: 'container'
        },
    scene: [Boot, LoadScreen]
      };
  new Phaser.Game(config);
}

// Check screen size and set width and height properly values
window.onload = function(){
  let clientHeight = document.getElementById('container').clientHeight;
  // Per defecte, Galaxy S5 dimensions
  let width = 512;
  let height = 732;
  // well, students are visiting the web on a desktop or laptop
  if (clientHeight > 900)
  {
    width = 912;
    height = 1464;
  }
  runGame(width, height);
};
