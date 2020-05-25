class NumberPad extends Phaser.GameObjects.Container
{
    constructor(scene, x, y, params) {
        super(scene, x, y);
        let t = this;
        this.calculator = {
          firstOperand: null,
          waitingForSecondOperand: false,
          displayValue: '0',
          operator: null
        };
        this.defaultValue = '';
        this.maxLength = 12;
        this.startNotInteractive = false;

        this.config(params);
        this.clear();

        scene.add.existing(this);

        // Display the rectangle matrix
        var graphics = scene.add.graphics({
          fillStyle: { color: 0x3c3c3c },
          lineStyle: { color: 0xefefef }
        });

        this.rectangles = [];
        var displayResult = null;
        // @TODO: Size of rectangle related to the phone screen
        // At the moment 552 pixels :-/
        var rectangle_width = (552 * DPR) / this.buttons[0].length;
        var rectangle_height = rectangle_width;

        var xoffset = scene.x;
        var yoffset = scene.y;

        // create the calculator matrix
        graphics.clear();
        for (const [index, row] of this.buttons.entries())
        {
          var nrow = index;
          t.rectangles[index] = [];
          for (const [index, column] of row.entries())
          {
            var ncolumn = index;
            var character = column;
            // @TODO: change 552 width display phone to handle different screen sizes
            //
            t.rectangles[nrow][ncolumn] = new Phaser.GameObjects.Rectangle(scene, scene.x - (552 / 2) + (rectangle_width * ncolumn), (rectangle_height * nrow) + scene.y - 256, character === '=' ? 552 : rectangle_width, rectangle_height, 0xff00ff)
              .setOrigin(0)
              .setData({ 'c' : character })
              .setInteractive();

            // Add text
            var text = scene.add.text(t.rectangles[nrow][ncolumn].x + (t.rectangles[nrow][ncolumn].width / 2), t.rectangles[nrow][ncolumn].y + (rectangle_height / 2), character, {
              fill : '#fff',
              font : '32px cursive'
            }).setOrigin(0.5, 0.5);
            t.add(text);

            t.rectangles[nrow][ncolumn].on('pointerdown', function(){
              graphics.fillStyle(0xcfcfcf, 1);
              graphics.fillRectShape(this);
            });
            t.rectangles[nrow][ncolumn].on('pointerup', function(){
              graphics.fillStyle(0x3c3c3c, 1);
              graphics.lineStyle(1, 0xefefef, 1);
              graphics.fillRectShape(this);
              graphics.strokeRectShape(this);

              t.handleInput(this.getData('c'));
            });

            graphics.fillRectShape(t.rectangles[nrow][ncolumn]);
            graphics.strokeRectShape(t.rectangles[nrow][ncolumn]);

          }
        }

        t.addAt(graphics,0);

        // paint the rectangle - display - result
        scene.g_display = new Phaser.GameObjects.Rectangle(scene, scene.x - (552 / 2), 92, 552, 148);
        graphics.fillStyle(0xffffff, 1);
        graphics.fillRectShape(scene.g_display);
        t.add(scene.g_display);

        // display the text value
        // @BUG: added setOrigin(0) method and rtl stops working
        scene.g_displayText = scene.add.text(
          scene.g_display.x + scene.g_display.width - 72,
          scene.g_display.y + (scene.g_display.height / 2) - (72 / 2) ,
          this.calculator.displayValue,
          {
            fill : '#2c2c2c',
            font : '72px cursive',
            rtl: true
          });

        t.add(scene.g_displayText);

        if (t.startNotInteractive) {
            t.disableInteractive();
        }
    }

    config(params) {
        if (params['defaultValue'] !== undefined) {
            this.defaultValue = params['defaultValue'];
        }

        if (params['buttons'] !== undefined) {
            this.buttons = params['buttons'];
        }

        if (params['maxLength'] !== undefined) {
            this.maxLength = params['maxLength'];
        }

        if (params['startNotInteractive'] !== undefined) {
            this.startNotInteractive = params['startNotInteractive'];
        }
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

        if (c === 'E') {
            // Check password and then destroy
            if (typeof t.scene.afterNumPadDestroy === "function") {
                t.scene.afterNumPadDestroy();
            }
            t.disableInteractive();
            t.destroy();
            return;
        }

        // Debug
        console.table(this.calculator);

        t.updateDisplay();
    }

  inputDigit(digit)
  {
    let t = this;
    const { displayValue, waitingForSecondOperand } = this.calculator;

    if (waitingForSecondOperand === true) {
      this.calculator.displayValue = digit;
      this.calculator.waitingForSecondOperand = false;
    } else {

      if (this.calculator.displayValue.length + 1 > this.maxLength) {
          return;
      }

      this.calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }

  inputDecimal(dot)
  {
    let t = this;
    if (!this.calculator.displayValue.includes(dot))
      // Append the decimal dot
      // @BUG: It show firt before the number value
      this.calculator.displayValue += dot;
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
    const { firstOperand, displayValue, operator } = this.calculator;
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      this.calculator.firstOperand = inputValue;
    } else if (operator) {
      const result = t.performCalculation[operator](firstOperand, inputValue);

      this.calculator.displayValue = String(result);
      this.calculator.firstOperand = result;
    }


    this.calculator.waitingForSecondOperand = true;
    this.calculator.operator = nextOperator;

  }

  // Show the value at the calculator display
  updateDisplay()
  {
    let t = this;
    // update display Value

    // If number higher than 15 ---> error
    if (this.calculator.displayValue.length > this.maxLength) {
      t.scene.g_displayText.text = 'Error';
      t.clear();
      return;
    }

    //Hack for . and - (UGLY!)
    if(this.calculator.displayValue[this.calculator.displayValue.length-1] === '.') {
      t.scene.g_displayText.text = '.' + this.calculator.displayValue.replace('.','');
    } else if(this.calculator.displayValue[0] === '-') {
      t.scene.g_displayText.text = this.calculator.displayValue.replace('-','')+'-';
    } else {
      t.scene.g_displayText.text = this.calculator.displayValue;
    }
  }

  clear()
  {
    let t = this;
    this.calculator.displayValue = this.defaultValue;
    this.calculator.firstOperand = null;
    this.calculator.waitingForSecondOperand = null;
    t.operator = null;
  }

    setInteractive() {
        let t = this;
        for (const [index, row] of this.buttons.entries()) {
            var nrow = index;
            for (const [index, column] of row.entries()) {
                var ncolumn = index;

                t.rectangles[nrow][ncolumn].setInteractive();
            }
        }
    }
    disableInteractive() {
        let t = this;
        for (const [index, row] of this.buttons.entries()) {
            var nrow = index;
            for (const [index, column] of row.entries()) {
                var ncolumn = index;

                t.rectangles[nrow][ncolumn].removeInteractive();
            }
        }
    }
}
