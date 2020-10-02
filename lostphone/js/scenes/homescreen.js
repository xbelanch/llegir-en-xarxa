class HomeScreen extends Phaser.Scene
{
  init()
  {

  }
  
  create()
  {
    let t = this;
    let Phone = t.game.config;
    const x = Math.round(Phone.width / 2);
    const y = Math.round(Phone.height / 2);

    let scale = t.getImageScale('home-wallpaper');
    let wallpaper = t.add.image(x, y, 'home-wallpaper')
        .setOrigin(0.5, 0.5)
        .setScale(scale.w, scale.h);
    
    t.addIconApps();

    t.registry.set('activeApp', 'homescreen');

  }


  addIconApps()
  {
    // Files de quatre icones
    let t = this;
    let Phone = t.game.config;
    let s = t.registry.get('scale');
    var apps = t.cache.json.get('apps');
    let widthAppIcon = t.textures.get(apps[0]['type']).getSourceImage();
    let offset = Phone.width < 480 ? 48 : 24; // distància entre icones en funció de l'amplada de pantalla del dispositiu
    let margin = Math.round((Phone.width - ((widthAppIcon.width * 4) + (offset * 3))) / 2);
    margin = margin < 0 ? -margin : margin;
    
    var i = 0;
    for (var index in apps) {
      var app = apps[index];
      new IconApp(
        t,
        app.name,
        app.type + "App",
        app.type,
        s * (margin + ((widthAppIcon.width + ((i%4 >= 1 && i%4 <= 3) ? offset : 0)) * (i % 4))), // Posició X (rota cada 3 posicions)
        s * (75 + (160 * (Math.floor(i / 4))))  // Posició Y (augmenta cada 3 icones)
      );
      i++;
    }
  }

  getImageScale(keyImg)
  {
    let t = this;
    let Phone = t.game.config;
    let scaleWidth, scaleHeight = 1.0;
    let img = t.textures.get(keyImg).getSourceImage();
    if (img.width < Phone.width || img.width > Phone.width)
    {
      scaleWidth = Phone.width / img.width;
    }
    if (img.height < Phone.height || img.height > Phone.height)
    {
      scaleHeight = Phone.height / img.height;
    }    
    return { w : scaleWidth, h : scaleHeight };
  }
}
