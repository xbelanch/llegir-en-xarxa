class HomeScreen extends Phaser.Scene
{
  preload()
  {
  }

  init()
  {
    // Determinem que la pantalla d'inici sigui la visible i activa
    SceneManager.active = SceneKeys.HomeScreen;
  }
  
  create()
  {
    let t = this;
    // Obtenim l'amplada i alçada del canvas del joc
    let { width, height } = t.sys.game.canvas;

    const x = width / 2;
    const y = height / 2;

    // Add a simple sad lofi wallpaper
    let wallpaper = t.add.image(x, y, 'homescreen-wallpaper').setOrigin(0.5, 0.5);

    // Display the icon apps

    // Create the app if click the icon
    // t.createApp(ClockApp, 'clockApp');

  }
  
  // createApp(func, handle)
  // {
  //   let t = this;
  //   let app = new func(handle);
  //   t.scene.add(handle, app, true);
  // }

}
