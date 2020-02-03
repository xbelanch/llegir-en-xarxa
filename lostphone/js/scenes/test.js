// Scene for testing purpose

class Test extends Phaser.Scene {
  constructor(){ super('test'); }

  preload()
  {
    this.load.image('clock', 'assets/icons/noun_clock_3073449.png');
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
