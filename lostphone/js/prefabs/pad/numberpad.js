//--
//-- numberpad.js
//--
//-- @Note:
//-- @Todo:
//-- @From:


class NumberPad extends Phaser.GameObjects.GameObject
{
  constructor(scene, config)
  {
    super(scene);
    this.new(config);
    this.colors;
  }

  new(config)
  {
    let t = this.scene;
    let Phone = t.game;

    // --- Get config values
    t.colors = t.cache.json.get('config').colors;
    
    var displayPassword = '';
    var passwordValue = '';

    var numberPad  = t.add.container(0, Phone.config.height);
    var numberPadButtons = t.add.container(0, Phone.config.height);

    var boxPad = t.add.graphics({ x : 0, y : Phone.config.height });
    var boxPadHeight = Math.floor(Phone.config.height * 0.65);
    boxPad.fillStyle(t.colors.black, 1);
    boxPad.fillRect(0, 0, Phone.config.width, boxPadHeight);

    numberPad.add(boxPad);

  }
  
  
}
