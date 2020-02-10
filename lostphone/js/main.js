// Globals
// @NOTE: Segurament que, més endavant, aquestes variables globals
// formaran part d'un arxiu json
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
          width: width,
          height: height,
          fullscreenTarget: 'container'
        },
    scene: [Boot, LoadScreen, HomeScreen]
  };
  new Phaser.Game(config);
}

// Detecta la mida de pantalla i determina els valors més òptims segons aquella
window.onload = function(){
  let clientHeight = document.getElementById('container').clientHeight;
  // Per defecte, Galaxy S5 dimensions
  let width = 512;
  let height = 732;
  // Altrament, mides de Desktop o portàtil
  if (clientHeight > 700)
  {
    width = 895;
    height = 1280;
  }
  runGame(width, height);
};
