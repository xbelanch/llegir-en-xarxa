
export default class LostPhoneScene extends Phaser.Scene
{
  constructor(key)
  {
    super(key);
    this.backFunction = undefined;

  }

  addGoBackFunction(functionName = undefined) {
    this.backFunction = functionName;

    let ui = this.scene.get('PhoneUI');
    ui.backButton.off('pointerup').on(
      'pointerup',
      functionName === undefined ? () => ui.backHome() : () => this.backFunction()
    ).setVisible(true);
  }
}