class Wifi extends Phaser.Scene {
  constructor()
  {
    super({ key: 'wifi' });
  }

  init()
  {
    let t = this;
    t.scene.bringToTop('PhoneUI');

    // Load config
    t.config = t.cache.json.get('wifi');

  }
  
  create()
  {
    var text = this.add.text(10, 128, 'Xarxes Wi-Fi', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
    
    // source: https://phaser.io/examples/v3/view/game-objects/dom-element/css-text#
    var h1 = this.add.dom(450, 100, 'h1', null, 'CHROME');
    h1.setClassName('chrome');

    // TODO: 
    // Forms: https://phaser.io/examples/v3/view/game-objects/dom-element/form-input    
    
  }
}
