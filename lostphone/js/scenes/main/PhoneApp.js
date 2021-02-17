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
    }

    this.DPR = DPR;
    this.assetsDPR = assetsDPR;
  }

  init() {
    let t = this;

    t.getConfig();
    t.colors = t.config.colors;
    t.UIelements = t.scene.get('PhoneUI').elements;
    t.cameras.main.setViewport(
      0,
      t.UIelements['topBar']['height'],
      t.cameras.main.width,
      t.cameras.main.height - t.UIelements['topBar']['height'] - t.UIelements['bottomBar']['height']
    );

    let { width, height } = t.cameras.main;
    t.width = width;
    t.height = height;
    t.x = t.width / 2;
    t.y = t.height / 2;

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
}