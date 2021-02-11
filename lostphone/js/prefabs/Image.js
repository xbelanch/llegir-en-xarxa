export default class Image extends Phaser.GameObjects.Image {
  constructor (scene, x, y, texture, frame) {
    super(scene, x * scene.assetsDPR, y * scene.assetsDPR, texture, frame);
    this.setOrigin(0.5, 0);
    scene.add.existing(this);
  }

  setX(x) { super.setX(Math.round(x * this.scene.assetsDPR)); }
  setY(y) { super.setY(Math.round(y * this.scene.assetsDPR)); }
}
