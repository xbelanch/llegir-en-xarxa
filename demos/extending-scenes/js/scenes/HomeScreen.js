class HomeScreen extends Phaser.Scene
{
  preload()
  {
  }

  init()
  {
    let t = this;
    // Determinem que la pantalla d'inici sigui la visible i activa
    SceneManager.active = SceneKeys.HomeScreen;
    // PhoneUI sempre estarà per sobre de la resta d'escenes
    t.scene.bringToTop(SceneKeys.PhoneUI);

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
    let clockApp = t.add.image(width / 2 - 150, y - 250, 'clockApp')
        .setOrigin(0.5, 0.5)
        .setScale(DPR * 0.75)
        .setInteractive()
        .on('pointerdown', function(){
          clockApp.tint = 0xffff00;
        })
        .on('pointerup', function(){
            t.scene.stop(SceneKeys.HomeScreen);
            t.scene.launch(SceneKeys.Clock, {
            toScene: SceneKeys.Clock,
            fromScene : SceneKeys.HomeScreen });          
        });
    let podcastApp = t.add.image(width / 2, y - 250, 'podcastApp')
        .setOrigin(0.5, 0.5)
        .setScale(DPR * 0.75)
        .setInteractive()
        .on('pointerdown', function(){
          podcastApp.tint = 0xffff00;          
        })
        .on('pointerup', function(){
            t.scene.stop(SceneKeys.HomeScreen);
            t.scene.launch(SceneKeys.Podcast, {
            toScene: SceneKeys.Podcast,
            fromScene : SceneKeys.HomeScreen });                    
        });
  }
 
}
