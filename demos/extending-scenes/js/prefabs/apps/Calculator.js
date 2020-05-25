//
// --- Calculator App
//
// --- Based on https://freshman.tech/calculator/
// ---
// @TODO: Set limit of characters to display
// @BUG: SetOrigin method and rtl doesn't work as expected.

class Calculator extends App
{
  constructor()
  {
    // init() i preload() haurien de ser mètodes comunes a totes les apps
    super();
    this.g_display = null;
    this.buttons = [
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '*'],
      ['0', '.', 'C', '/'],
      ['=']
    ];
  }
  create()
  {
    let t = this;
    let { width, height } = t.sys.game.canvas;
    t.width = width;
    t.height = height;
    t.x = width / 2;
    t.y = height / 2;

    // Add a wallpaper or whatever
    let wallpaper = t.add.image(t.x, t.y, 'clock-wallpaper')
           .setOrigin(0.5, 0.5);

    let pad = new NumberPad(t, 0, 0, {
      defaultValue: '0',
      buttons: this.buttons
    });
  }
}
