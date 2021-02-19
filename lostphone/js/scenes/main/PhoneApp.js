import { DPR, assetsDPR } from '/Config';
export default class PhoneApp extends Phaser.Scene
{
  constructor(key)
  {
    super(key);
    this.backFunction = undefined;
    this.icons = {
      'switchOff': 22,
      'switchOn': 21,
      'warning' : 23,
      'ok': 0,
      'ko': 7
    };

    this.rowCount = 12;
    this.colCount = 4;

    this.DPR = DPR;
    this.assetsDPR = assetsDPR;

    this.lastX = 0;
    this.lastY = 0;
    this.biggestY = 0;

    this.dragZone;
  }

  init() {
    let t = this;

    t.input.setTopOnly(false);

    t.getConfig();
    t.colors = t.config.colors;
    t.UIelements = t.scene.get('PhoneUI').elements;

    t.originalHeight = t.cameras.main.height;
    t.originalWidth = t.cameras.main.width;

    t.cameras.main.setViewport(
      0,
      t.UIelements['topBar']['height'] - 2,
      t.cameras.main.width,
      t.cameras.main.height - t.UIelements['topBar']['height'] - t.UIelements['bottomBar']['height'] + 2
    );

    this.lastY = 0;

    let { width, height } = t.cameras.main;
    t.width = width;
    t.height = height;
    t.x = t.width / 2;
    t.y = t.height / 2;

    t.createDragZone();
    t.addGoBackFunction();
  }

  preload()
  {
    let t = this;
    t.load.spritesheet('icons', 'assets/sprites/pixelIcons.png', { frameWidth: 16, frameHeight: 16});
  }

  getConfig(key='config') {
    let t = this;
    t.config = t.cache.json.get(key);
  }

  getTextProperties(properties = {}) {
    let textProperties = {
      fontFamily: 'Roboto',
      color: '#ffffff',
      align: 'center'
    };

    for (let key in properties) {
      textProperties[key] = properties[key];
    }

    return textProperties;
  }

  createDragZone() {
    let t = this;
    t.log('Added drag zone!');

    t.dragZone = t.add.rectangle(0,0,1,1, 0x0000ff, 0.5)
      .setOrigin(0,0)
      .setInteractive({draggable: true})
      .setName('SceneDragZone');

    t.input.dragDistanceThreshold = 16;
    t.input.on('drag', function(pointer, gameObject) {
      if (typeof gameObject !== 'object') {
        return;
      }
      if (gameObject.name = 'SceneDragZone') {
        t.cameras.main.scrollY -= (pointer.position.y - pointer.prevPosition.y);

        t.cameras.main.scrollY = Phaser.Math.Clamp(
          t.cameras.main.scrollY,
          0,
          t.biggestY >= t.rowCount ? t.atRow(t.biggestY+1) - t.height : 0
        );
      }
    });

    t.dragZone.input.hitArea.setSize(t.width, t.atRow(t.biggestY+1));
  }

  addGoBackFunction(functionName) {
    let t = this;
    t.backFunction = functionName;

    let ui = t.scene.get('PhoneUI');

    if (ui.backButton !== undefined) {
      ui.backButton.off('pointerup').on(
        'pointerup',
        functionName === undefined ? () => ui.backHome() : () => t.backFunction()
      ).setVisible(true);
    }
  }

  addRow(elements, options = {}) {
    let t = this;

    // Accept single elements
    if (!Array.isArray(elements)) {
      elements = [elements];
    }

    // Check defaults
    if (options['height'] === undefined) {
      options['height'] = 1;
    }

    if (options['position'] === undefined) {
      options['position'] = Phaser.Display.Align.CENTER;
    }

    if (options['y'] !== undefined) {
      t.lastY = options['y'];
    }

    Phaser.Actions.GridAlign(elements, {
      x: t.width / elements.length / 2,
      y: t.atRow(t.lastY),
      width: -1,
      height: 1,
      cellWidth: t.width / elements.length,
      cellHeight: t.rowHeight() * options['height'],
      position: options['position']
    });

    if (t.lastY > t.biggestY) {
      t.biggestY = t.lastY;
      if (t.biggestY > t.rowCount) {
        t.dragZone.input.hitArea.setSize(t.width, t.atRow(t.biggestY+1));
      }
    }

    t.lastY += options['height'];
  }

  /*addColumn(elements, options = {}) {
    let t = this;

    // Accept single elements
    if (!Array.isArray(elements)) {
      elements = [elements];
    }

    if (options['position'] === undefined) {
      options['position'] = Phaser.Display.Align.CENTER;
    }

    Phaser.Actions.GridAlign(elements, {
      x: t.lastX,
      y: 0,
      width: 1,
      height: -1,
      cellWidth: options['width'],
      cellHeight: t.height / elements.length,
      position: options['position']
    });
  }*/

  addGrid(elements, options = {}) {
    let t = this;

    // Accept single elements
    if (!Array.isArray(elements)) {
      elements = [elements];
    }

    if (options['offsetY'] === undefined) {
      options['offsetY'] = 0;
    }

    if (options['y'] !== undefined) {
      t.lastY = options['y'];
    }

    if (options['height'] === undefined) {
      options['height'] = 1;
    }

    if (options['columns'] === undefined) {
      options['columns'] = t.colCount;
    }

    if (options['rows'] === undefined) {
      options['rows'] = t.rowCount;
    }

    if (options['position'] === undefined) {
      options['position'] = Phaser.Display.Align.CENTER;
    }

    Phaser.Actions.GridAlign(elements, {
      x: (t.width / elements.length / 2) +  (t.width / options['columns']) / options['columns'],
      y: t.atRow(t.lastY) + options['offsetY'],
      width: options['columns'],
      height: options['rows'],
      cellWidth: t.width / options['columns'],
      cellHeight: (t.height / options['rows']) * options['height'],
      position: options['position']
    });

    if (t.lastY > t.biggestY) {
      t.biggestY = t.lastY;
      if (t.biggestY > t.rowCount) {
        t.dragZone.input.hitArea.setSize(t.width, t.atRow(t.biggestY+1));
      }
    }

    t.lastY += Math.floor(elements.length / options['columns'] * options['height']);
  }

  rowHeight() {
    let t = this;

    return t.height / t.rowCount;
  }

  atRow(rowNumber) {
    let t = this;

    if (rowNumber < 0) {
      rowNumber = t.rowCount + rowNumber;
    }

    return Math.floor((t.rowHeight() * rowNumber) + t.rowHeight()/2);
  }

/*   destroy() {
    let t = this;
    t.dragArea.destroy();
    super.destroy();
  } */
}