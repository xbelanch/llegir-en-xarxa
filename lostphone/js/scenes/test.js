// Scene for testing purpose

class Test extends Phaser.Scene {
  constructor(){ super('test'); }

  preload()
  {

  }
  
  create()
  {
    // add icons to the main window
    var iconClock = this.add.image(32, 32, 'clock').setOrigin(0);

    // Add functionality
    iconClock.on('pointerup', function() {
      openApp(Clock);
    }, this);
    
  }

  // openApp function
  openApp(func) {
    log("App clock");
    var app = new func(); // what?
//    this.scene.add(app); 
  }  
}



  // // Informació bàsica en pantalla
  //   var fullscreen = this.sys.game.device.fullscreen;
  //   var text = this.add.text(0, 0, '', {fontFamily: 'roboto', fontSize: 24, color: '#cfcfcf', linespacing: -13 });
  //   text.setText([
  //     'Game Title: ' + titleGame,
  //     'Version: ' + gameVersion,
  //     'Fullscreen avalaible?: ' + fullscreen.available
  //   ]);

  //   // Fullscreen mode
  //   // Source: https://codepen.io/samme/pen/deKZjx
  //   // @Note: Aquesta opció hauria de formar part del conjunt
  //   // de preferències del sistema del mòbil?
  //   var canvas = this.sys.game.canvas;
  //   var startBtn = document.createElement('button');
  //   var stopBtn = document.createElement('button');

  //   startBtn.textContent = 'Start Fullscreen';
  //   stopBtn.textContent = 'Stop Fullscreen';

  //   canvas.parentNode.appendChild(startBtn);
  //   canvas.parentNode.appendChild(stopBtn);
    
  //   startBtn.addEventListener('click', function () {
  //     if (document.fullscreenElement) { return; }
  //     canvas[fullscreen.request]();
  //   });    

