import PhoneApp from '../PhoneApp';

export default class SandboxApp extends PhoneApp
{
  constructor()
  {
    super({ key: 'SandboxApp'});
  }

  preload()
  {
    let t = this;
    t.load.image('raster', 'assets/images/raster-bw-64.png');
  }

  create()
  {
    let t = this;

    t.cameras.main.setBackgroundColor(0xff0088);

    let group = t.add.group();

    group.createMultiple({ key: 'raster', repeat: 16 });

    let ci = 0;
    let colors = [ 0xef658c, 0xff9a52, 0xffdf00, 0x31ef8c, 0x21dfff, 0x31aade, 0x5275de, 0x9c55ad, 0xbd208c ];

    group.children.iterate(function (child) {

        child.x = 0;
        child.y = 512;
        child.depth = 9 - ci;

        child.tint = colors[ci % 8];

        ci++;

        t.tweens.add({
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
