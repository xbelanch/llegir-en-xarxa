
export default class PhoneApp extends Phaser.Scene
{
  constructor(key)
  {
    super(key);
    this.backFunction = undefined;

  }

  init() {
    let t = this;

    t.getConfig();
    t.colors = t.config.colors;

    let { width, height } = t.cameras.main;
    t.width = width;
    t.height = height; 
    t.x = t.width / 2;
    t.y = t.height / 2;

    t.addGoBackFunction();
  }

  getConfig(key='config') {
    let t = this;
    t.config = t.cache.json.get(key);
  }


  addGoBackFunction(functionName = undefined) {
    let t = this;
    t.backFunction = functionName;

    let ui = t.scene.get('PhoneUI');
    ui.backButton.off('pointerup').on(
      'pointerup',
      functionName === undefined ? () => ui.backHome() : () => t.backFunction()
    ).setVisible(true);
  }
}