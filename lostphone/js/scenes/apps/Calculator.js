//--
//-- Calculator.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import LostPhoneScene from '../LostPhoneScene';

export default class CalculatorApp extends LostPhoneScene
{
  constructor()
  {
    super();
  }

  init()
  {
    let t = this;
    super.init();
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
