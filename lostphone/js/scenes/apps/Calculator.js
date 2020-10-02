//--
//-- Calculator.js
//--
//-- @Note:
//-- @Todo:
//-- @From:


class CalculatorApp extends App
{
  constructor()
  {
    super();
  }

  init()
  {
    let t = this;
    t.registry.set('activeApp', 'calculatorApp');    
  }

  create()
  {
    let t = this;
    let { width, height } = t.getPhoneDimensions();
    t.width = width;
    t.height = height;
    t.x = width / 2;
    t.y = height / 2;
    let scale = t.getImageScale('home-wallpaper');
    let wallpaper = t.add.image(t.x, t.y, 'home-wallpaper')
        .setOrigin(0.5, 0.5)
        .setScale(scale.w, scale.h);
    t.graphics = t.add.graphics();

    // @@TESTING@@
    var numberPad = new NumberPad(t, {});
    
  }

}