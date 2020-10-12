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
    super.init();
    t.registry.set('activeApp', 'calculatorApp');    
  }

  preload()
  {
    super.preload();
  }

  create()
  {
    let t = this;
    super.create();

    // @@TESTING@@
    var numberPad = new NumberPad(t, {});
    
  }

}
