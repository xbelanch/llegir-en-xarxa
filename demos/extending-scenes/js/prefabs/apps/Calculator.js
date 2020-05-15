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
    this.calculator = {
      firstOperand: null,
      waitingForSecondOperand: false,
      displayValue: '0',
      operator: null
    };
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
    
    // Display the rectangle matrix
    var graphics = this.add.graphics({
      fillStyle: { color: 0x3c3c3c },
      lineStyle: { color: 0xefefef }
    });
    var rectangles = [];
    var displayResult = null;
    // @TODO: Size of rectangle related to the phone screen
    // At the moment 552 pixels :-/
    var rectangle_width = (552 * DPR) / 4;
    var rectangle_height = rectangle_width;
    
    var xoffset = t.x;
    var yoffset = t.y;

    // create the calculator matrix
    graphics.clear();
    for (const [index, row] of t.buttons.entries())
    {
      var nrow = index;
      rectangles[index] = [];
      for (const [index, column] of row.entries())
      {
        var ncolumn = index;
        var character = column;
        // @TODO: change 552 width display phone to handle different screen sizes
        //  
        rectangles[nrow][ncolumn] = new Phaser.GameObjects.Rectangle(t, t.x - (552 / 2) + (rectangle_width * ncolumn), (rectangle_height * nrow) + t.y - 256, character === '=' ? 552 : rectangle_width, rectangle_height, 0xff00ff)
          .setOrigin(0)
          .setData({ 'c' : character })
          .setInteractive();

        // Add text
        t.add.text(rectangles[nrow][ncolumn].x + (rectangles[nrow][ncolumn].width / 2), rectangles[nrow][ncolumn].y + (rectangle_height / 2), character, {
          fill : '#fff',
          font : '32px cursive'
        }).setOrigin(0.5, 0.5);
        
        // paint them!
        // if (ncolumn === 3)
        // {
        //   graphics.fillStyle(0xffff00, 1);
        // } else {
        //   graphics.fillStyle(0xff00ff, 1);
        // }
        // if (value === 'C')
        //   graphics.fillStyle(0xff0000, 1);

        // if (value === '=')
        //   graphics.fillStyle(0x00ffff, 1);
          
        graphics.fillRectShape(rectangles[nrow][ncolumn]);
        graphics.strokeRectShape(rectangles[nrow][ncolumn]);

      }
    }

    // paint the rectangle - display - result
    t.g_display = new Phaser.GameObjects.Rectangle(t, t.x - (552 / 2), 92, 552, 148);
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRectShape(t.g_display);

    // display the text value
    // @BUG: added setOrigin(0) method and rtl stops working
    t.g_displayText = t.add.text(
      t.g_display.x + t.g_display.width - 72,
      t.g_display.y + (t.g_display.height / 2) - (72 / 2) ,
      t.calculator.displayValue,
      {
        fill : '#2c2c2c',
        font : '72px cursive',
        rtl: true
      });

    t.input.on('gameobjectdown', function(pointer, gameObject, event){
      graphics.fillStyle(0xcfcfcf, 1);
      graphics.fillRectShape(gameObject);
    });
    t.input.on('gameobjectup', function(pointer, gameObject, event){
      graphics.fillStyle(0x3c3c3c, 1);
      graphics.lineStyle(1, 0xefefef, 1);
      graphics.fillRectShape(gameObject);
      graphics.strokeRectShape(gameObject);
      // handle with character button
      // @TODO: Hi ha alguna altra manera d'evitar l'ús del setData/getData?
      t.handleInput(gameObject.getData('c'));
    });
  }

  handleInput(c)
  {
    let t = this;

    // Clean value display
    if (c === 'C')
    {
      t.clear();
    }

    if (/^\d+$/.test(c))
      t.inputDigit(c);

    if (c === '.')
      t.inputDecimal(c);

    if (c === '+' || c === '-' || c === '*' || c === '/' || c === '=' )
      t.handleOperator(c);
 
    // Debug
    console.table(t.calculator);

    t.updateDisplay();
  }

  inputDigit(digit)
  {
    let t = this;
    const { displayValue, waitingForSecondOperand } = t.calculator;

    if (waitingForSecondOperand === true) {
      t.calculator.displayValue = digit;
      t.calculator.waitingForSecondOperand = false;
    } else {
      t.calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }    
  }
  
  inputDecimal(dot)
  {
    let t = this;
    if (!t.calculator.displayValue.includes(dot))
      // Append the decimal dot
      // @BUG: It show firt before the number value
      t.calculator.displayValue += dot;
  }

  performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
  };
  
  handleOperator(nextOperator)
  {
    let t = this;
    const { firstOperand, displayValue, operator } = t.calculator;
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      t.calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = t.performCalculation[operator](firstOperand, inputValue);

      t.calculator.displayValue = String(result);
      t.calculator.firstOperand = result;
    }


    t.calculator.waitingForSecondOperand = true;
    t.calculator.operator = nextOperator;
    
  }

  // Show the value at the calculator display
  updateDisplay()
  {
    let t = this;
    // update display Value
    
    // If number higher than 15 ---> error
    if (t.calculator.displayValue.length > 15) {
      t.g_displayText.text = 'Error';
      t.clear();
      return;
    }
    
    //Hack for . and - (UGLY!)
    if(t.calculator.displayValue[t.calculator.displayValue.length-1] === '.') {
      t.g_displayText.text = '.' + t.calculator.displayValue.replace('.','');
    } else if(t.calculator.displayValue[0] === '-') {
      t.g_displayText.text = t.calculator.displayValue.replace('-','')+'-';
    } else {
      t.g_displayText.text = t.calculator.displayValue;    
    }
  }
  
  clear()
  {
    let t = this;
    t.calculator.displayValue = '0';
    t.calculator.firstOperand = null;
    t.calculator.waitingForSecondOperand = null;
    t.operator = null; 
  }
  
}
