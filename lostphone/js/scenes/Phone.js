class SmartPhone extends Phaser.Scene
{
  preload()
  {

  }

  init()
  {
    let t = this;
    t.scene.add('homescreen', HomeScreen);
    t.scene.add('phoneUI', PhoneUI);
    t.scene.add('wifiApp', WifiApp);

    // Definim el cursor
    let imgFolder = t.registry.get('imgFolder');
    // @NOTE:
    // https://stackoverflow.com/questions/19560878/css-change-custom-cursor-image-origin-hotspot-to-center
    t.input.setDefaultCursor("url(" + `assets/img/${imgFolder}/cursors/fingerprint.png` + ") 24 24, auto");

    // Incorporem les Apps definides al fitxer app.json 
    let apps = t.cache.json.get('apps');
    for (var index in apps) {
      var app = apps[index];
      t.scene.add(app.key, eval(app.class));
    }
  }
    

  create()
  {
    let t = this;
    let Phone = t.game.config;
    t.scene.launch('homescreen');
    t.scene.launch('phoneUI');
    t.scene.bringToTop('phoneUI');
  }
}
