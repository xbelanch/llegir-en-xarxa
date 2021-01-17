import LostPhoneScene from '../LostPhoneScene';

export default class SandboxApp extends LostPhoneScene
{
  constructor()
  {
    super({ key: 'SandboxApp'});
    this.config;
    this.colors;
  }

  init()
  {
    this.config = this.cache.json.get('config');
    this.colors = this.config.colors;
  }

  preload()
  {
    this.load.image('raster', 'assets/images/raster-bw-64.png');
  }

  create()
  {
    this.cameras.main.setBackgroundColor(0xff0088);

    var group = this.add.group();

    group.createMultiple({ key: 'raster', repeat: 16 });

    var ci = 0;
    var colors = [ 0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c ];

    var _this = this;

    group.children.iterate(function (child) {

        child.x = 0;
        child.y = 512;
        child.depth = 9 - ci;

        child.tint = colors[ci % 8];

        ci++;

        _this.tweens.add({
            targets: child,
            x: 640,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut',
            duration: 1500,
            delay: 100 * ci
        });

    });
  }

  update(delta, time)
  {

  }
}
