// --- Phone.js
//
// 

function newGame(width, height)
{
  const Config = {
    type : Phaser.Auto,
    // Color púrpura com a debug
    backgroundColor : 0xff00ff,
    dom : { createContainer : true },
    scale: {
      parent : 'game',
      mode : Phaser.Scale.FIT,
      autoCenter : Phaser.Scale.CENTER_BOTH,
      width: width,
      height: height
    },
    plugins: {
      global: [
        {
          key: 'SceneWatcher', plugin: PhaserSceneWatcherPlugin, start: true, mapping: 'sceneWatcher'
        }]
    },
    callbacks: {
      postBoot: function (game) {
        game.plugins.get('SceneWatcher').watchAll();
      }
    }
  };  
  
  const Phone = new Phaser.Game(Config);
  Phone.scene.add('bootstrap', Bootstrap);
  Phone.scene.add('preload', Preload);
  Phone.scene.add('phone', SmartPhone);
  Phone.scene.start('bootstrap');
}

// Detecta la mida de pantalla i determina els valors d'ampla i alçada.
// Referències:
// https://viewportsizer.com/devices/
// https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript
// https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

window.onload = function(){

  let width;
  let height = viewport().height;

  
  switch(height)
  {
    case(740):
    {
      width = 360;
      break;
    }
    case(718):
    {
      width = 360;
      break;
    }
    case(690):
    {
      width = 412;
      break;
    }
    case(731):
    {
      width = 411;
      break;
    }
    case(812):
    {
      width = 375;
      break;
    }
    case(1366):
    {
      width = 1024;
      break;
    }
    case(1024):
    {
      width = 768;
      break;
    }
    case(800):
    {
      width = 480;
      break;
    }
    // pixel ratio : 0.5622
    default:
    {
      width = Math.floor(height * 0.5622);
      break;
    }
  }

  // Set background image if it's playing from desktop
  if (width >= 512)
  {
    let container = document.getElementById('container');
    container.style.backgroundImage = "url('assets/img/560x1024/backgrounds/city-blurred-hd.jpg')";    
  }

  
  console.log('Viewport size: ' +  width + ':' + height);
  newGame(width, height);
};


