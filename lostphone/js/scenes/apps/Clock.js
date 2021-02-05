//--
//-- Clock.js
//--
//-- @From: Clock Source: https://phaser.io/examples/v3/view/scenes/drag-scenes-demo#
import PhoneApp from '/scenes/PhoneApp';

export default class ClockApp extends PhoneApp
{
  constructor()
  {
    super({ key: 'ClockApp'});
    this.clockSize;
    this.graphics;
    this.angle;
    this.size;
    this.dest;
    this.p1;
    this.p2;
    this.size;
    this.date;
    this.hours;
    this.mins;
    this.seconds;
  }

  create()
  {
    let t = this;
    t.clockSize = Math.round(t.width / 2.5);
    t.graphics = t.add.graphics();
  }

  update(delta, time)
  {
    let t = this;
    let p1;
    let p2;

    // Clear the graphics every frame
    t.graphics.clear();
    // The frame
    t.graphics.fillStyle(t.colors.blue, 0.5);
    t.graphics.lineStyle(10, t.colors.white, 0.5);
    t.graphics.fillCircle(t.x, t.y, t.clockSize);
    t.graphics.strokeCircle(t.x, t.y, t.clockSize);

    t.date = new Date;
    t.seconds = t.date.getSeconds() / 60;
    t.mins = t.date.getMinutes() / 60;
    // @BUG: No dóna correctament les hores!
    // @DONE: Recorda que el rellotge no és de 24 hores, sinó de 12!
    // Aquest bug es compartit amb la font oroginal
    t.hours = t.date.getHours() / 12;

    //---  The hours hand
    t.size = t.clockSize * 0.8;
    t.angle = (360 * t.hours) - 90;
    t.dest = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(t.angle), t.size);
    t.graphics.fillStyle(0xff0000, 0.7);
    t.graphics.beginPath();
    t.graphics.moveTo(t.x, t.y);
    p1 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(t.angle - 5), t.size * 0.7);
    t.graphics.lineTo(p1.x, p1.y);
    t.graphics.lineTo(t.dest.x, t.dest.y);
    t.graphics.moveTo(t.x, t.y);
    p2 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(t.angle + 5), t.size * 0.7);
    t.graphics.lineTo(p2.x, p2.y);
    t.graphics.lineTo(t.dest.x, t.dest.y);
    t.graphics.fillPath();
    t.graphics.closePath();

    //--- The minutes hand
    t.size = t.clockSize * 0.9;
    t.angle = (360 * t.mins) - 90;
    t.dest = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(t.angle), t.size);
    t.graphics.fillStyle(0x0000ff, 0.7);
    t.graphics.beginPath();
    t.graphics.moveTo(t.x, t.y);
    p1 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(t.angle - 5), t.size * 0.5);
    t.graphics.lineTo(p1.x, p1.y);
    t.graphics.lineTo(t.dest.x, t.dest.y);
    t.graphics.moveTo(t.x, t.y);
    p2 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(t.angle + 5), t.size * 0.5);
    t.graphics.lineTo(p2.x, p2.y);
    t.graphics.lineTo(t.dest.x, t.dest.y);
    t.graphics.fillPath();
    t.graphics.closePath();

    //--- The seconds hand
    t.size = t.clockSize * 0.9;
    t.angle = (360 * t.seconds) - 90;
    t.dest = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(t.angle), t.size);
    t.graphics.fillStyle(0x00ff00, 0.7);
    t.graphics.beginPath();
    t.graphics.moveTo(t.x, t.y);
    p1 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(t.angle - 5), t.size * 0.3);
    t.graphics.lineTo(p1.x, p1.y);
    t.graphics.lineTo(t.dest.x, t.dest.y);
    t.graphics.moveTo(t.x, t.y);
    p2 = Phaser.Math.RotateAroundDistance({ x: t.x, y: t.y }, t.x, t.y, Phaser.Math.DegToRad(t.angle + 5), t.size * 0.3);
    t.graphics.lineTo(p2.x, p2.y);
    t.graphics.lineTo(t.dest.x, t.dest.y);
    t.graphics.fillPath();
    t.graphics.closePath();
  }
}
