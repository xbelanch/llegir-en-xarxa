//
// --- Clock App
//

class Clock extends App
{
  constructor()
  {
    super();
  }

  // @NOTE:
  // Recorda que els mètodes preload i init estan derivats de la class App
  
  create()
  {
    let t = this;
  
    // Playing with a sad Bart
    let { width, height } = t.sys.game.canvas;
    let x = width / 2;
    let y = height / 2;
    let bart = t.add.image(x, y, 'clock-wallpaper')
        .setOrigin(0.5, 0.5);
  }

  update(delta, time)
  {
    let t = this;
  }
}

