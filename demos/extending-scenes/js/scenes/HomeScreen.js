class HomeScreen extends Phaser.Scene
{
  constructor()
  {
    super({
      key : 'homescreen'
    });
  }

  preload()
  {

  }

  init()
  {
    let t = this;
  }
  
  create()
  {
    console.log("HomeScreen is active");

    let t = this;

    // Add a simple sad lofi wallpaper
    let wallpaper = t.add.image(0, 0, 'homescreen-wallpaper').setOrigin(0);

    // Display the icon apps

    // Create the app if click the icon
    // t.createApp(ClockApp, 'clockApp');

  }
  
  createApp(func, handle)
  {
    let t = this;
    let app = new func(handle);
    t.scene.add(handle, app, true);
  }

}
