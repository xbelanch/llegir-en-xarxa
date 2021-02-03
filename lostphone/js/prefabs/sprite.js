export default class Sprite extends Phaser.GameObjects.Sprite {
  constructor (scene, x, y, texture, frame) {
    super(scene, x * scene.assetsDPR, y * scene.assetsDPR, texture, frame);
    scene.add.existing(this);
  }

  setX(x) { super.setX(Math.round(x * this.scene.assetsDPR)); }
  setY(y) { super.setY(Math.round(y * this.scene.assetsDPR)); }
}
