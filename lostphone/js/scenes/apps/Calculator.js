//--
//-- Calculator.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import PhoneApp from '../PhoneApp';

export default class CalculatorApp extends PhoneApp
{
  constructor()
  {
    super({ key: 'CalculatorApp'});
  }

  create()
  {
    let t = this;
    super.create();

    // @@TESTING@@
    var numberPad = new NumberPad(t, {});

  }

}
