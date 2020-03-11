class Boot extends Phaser.Scene {
  constructor(){
    super('boot');
  }

  init(){
    // Registrem el directori de les imatges segons les dimensions de pantalla
    this.imgFolder = this.game.config.width + 'x' + this.game.config.height;
    this.registry.set('imgfolder', this.imgFolder);
    // Determinem el valor d'escala
    if(this.game.config.height > 640){
      this.registry.set('scale', 2);
    } else {
      this.registry.set('scale', 1);
    }
  }

  preload(){
    // Carreguem els json necessaris
    this.load.json('config', 'config/config.json');
    this.load.json('apps', 'config/apps.json');

    // Load the game if saved before
    this.game.loadSave('autosave');

    // Turn on autosave
    this.game.autosaveOn();

    // Incorporem la llibreria webfont per tal de treballar sempre amb la font roboto
    // independentment si el client la té o no instal·lada.
    this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    // Carreguem diferents logos
    this.load.image('logo', `assets/img/${this.imgFolder}/logo.png`);
    this.load.image('logo-pepe', `assets/img/${this.imgFolder}/logo-pepe.png`);
  }

  create(){
    let t = this;
    // Carrrega la font roboto, com qualsevol altra font
    // necessària per altres motius...
    WebFont.load({
      custom: {
        families: ['roboto']
      },
      active: function ()
      {
        t.scene.start('loadScreen');
      }
    })
  }

}
