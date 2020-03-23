const config = {
  type: Phaser.WEBGL,
  parent: 'phone',
  width: 512,
  height: 800,
  scene: [Boot, Phone, PhoneUI, HomeScreen]
};
const game = new Phaser.Game(config);
