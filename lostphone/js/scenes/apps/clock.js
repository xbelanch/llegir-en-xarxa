//--
//-- Clock.js
//--
//-- @From: Clock Source: https://phaser.io/examples/v3/view/scenes/drag-scenes-demo#
import LostPhoneScene from '../LostPhoneScene';

export default class ClockApp extends LostPhoneScene
{
  constructor()
  {
    super({ key: 'ClockApp'});
    this.clockSize;
    this.graphics;
    this.config;
    this.colors;
  }

  init()
  {
    this.config = this.cache.json.get('config');
    this.colors = this.config.colors;
  }

  create()
  {
    let t = this;
    let { width, height } = t.cameras.main;
    t.x = width / 2;
    t.y = height / 2;
    t.clockSize = Math.round(width / 2.5);
    t.graphics = t.add.graphics();
    t.addGoBackFunction();
  }

  update(delta, time)
  {
    let t = this;

    // Clear the graphics every frame
    t.graphics.clear();
    // The frame
    t.graphics.fillStyle(this.colors.blue, 0.5);
    t.graphics.lineStyle(10, this.colors.white, 0.5);
    t.graphics.fillCircle(t.x, t.y, t.clockSize);
    t.graphics.strokeCircle(t.x, t.y, t.clockSize);

    var angle;
    var dest;
    var p1;
    var p2;
    var size;

    var date = new Date;
    var seconds = date.getSeconds() / 60;
    var mins = date.getMinutes() / 60;
    // @BUG: No dóna correctament les hores!
    // @DONE: Recorda que el rellotge no és de 24 hores, sinó de 12!
    // Aquest bug es compartit amb la font oroginal
    var hours = date.getHours() / 12;

    //---  The hours hand
    size = t.clockSize * 0.8;
    angle = (360 * hours) - 90;
    dest = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(angle), size);
   t.graphics.fillStyle(0xff0000, 0.7);
   t.graphics.beginPath();
   t.graphics.moveTo(t.x, t.y);
    p1 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(angle - 5), size * 0.7);
   t.graphics.lineTo(p1.x, p1.y);
   t.graphics.lineTo(dest.x, dest.y);
   t.graphics.moveTo(t.x, t.y);
    p2 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(angle + 5), size * 0.7);
   t.graphics.lineTo(p2.x, p2.y);
   t.graphics.lineTo(dest.x, dest.y);
   t.graphics.fillPath();
   t.graphics.closePath();

    //--- The minutes hand
    size = t.clockSize * 0.9;
    angle = (360 * mins) - 90;
    dest = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(angle), size);
    t.graphics.fillStyle(0x0000ff, 0.7);
    t.graphics.beginPath();
    t.graphics.moveTo(t.x, t.y);
    p1 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(angle - 5), size * 0.5);
    t.graphics.lineTo(p1.x, p1.y);
    t.graphics.lineTo(dest.x, dest.y);
    t.graphics.moveTo(t.x, t.y);
    p2 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(angle + 5), size * 0.5);
    t.graphics.lineTo(p2.x, p2.y);
    t.graphics.lineTo(dest.x, dest.y);
    t.graphics.fillPath();
    t.graphics.closePath();

    //--- The seconds hand
    size = t.clockSize * 0.9;
    angle = (360 * seconds) - 90;
    dest = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(angle), size);
    t.graphics.fillStyle(0x00ff00, 0.7);
    t.graphics.beginPath();
    t.graphics.moveTo(t.x, t.y);
    p1 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(angle - 5), size * 0.3);
    t.graphics.lineTo(p1.x, p1.y);
    t.graphics.lineTo(dest.x, dest.y);
    t.graphics.moveTo(t.x, t.y);
    p2 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(angle + 5), size * 0.3);
    t.graphics.lineTo(p2.x, p2.y);
    t.graphics.lineTo(dest.x, dest.y);
    t.graphics.fillPath();
    t.graphics.closePath();
  }
}
