class ClockApp extends App
{
  constructor(handle)
  {
    super();
    this.id = handle;    
  }
  
  create()
  {
    let t = this;
    console.log(t.id + ' is created');

    // Playing with a sad Bart
    let { width, height } = t.sys.game.canvas;
    let bart = t.add.image(0, 0, 'bart').setOrigin(0).setScale(1);
    bart.x = (width / 2 ) - (bart.width / 2);
    bart.y = (height / 2 ) - (bart.height / 2);
  }
}

