class LoadScreen extends Phaser.Scene {
  constructor(){
    super('loadScreen');
  }

  init(){
    // recuperem el valor del directori img
    this.imgFolder = this.registry.get('imgfolder');
    // recuperem el logo per ubicar el text correctament
    this.pepe = this.textures.get('logo-pepe').getSourceImage();
  }

  preload(){
    // Saltem a l'escena següent, en el moment de completar
    // la càrrega d'assets (imatges, audios, animacions, vídeos...)
    // ara mateix, anem a l'escena 'test'
    this.load.on('complete', ()=>{
      this.scene.start('HomeScreen');
    }, this);

    // Mostra la barra de progrés on inclou logo i text style
    this.load.on('progress', this.updateLoad, this);
    let logo = this.add.image(
      // @NOTE:
      // L'origen de coordenades de la imatge és... al centre de la imatge!
      this.game.config.width / 2,
      this.game.config.height / 3,
      'logo-pepe');

    // Set text loading under the logo
    this.text_loading = this.add.text(
      logo.x,
      logo.y + logo.height / 1.33,
      'IOC Free Operating System');
    // Text loading style
    this.text_loading.setOrigin(0.5);
    this.text_loading.setFontFamily('roboto');
    this.text_loading.setFontSize(24);
    this.text_loading.setColor('#efefef');

    // Carrega en memòria tots els arxius del miniop

    // --- Sounds
    // Recorda que caldrà organitzar els diferents audios en un audioSprite?
    this.load.audio('click', 'assets/sounds/433641__dersuperanton__click-sound.mp3');

    // --- Backgrounds
    this.load.image('background-homescreen', `assets/img/${this.imgFolder}/background_homescreen.png`);
    this.load.image('background-wifi', `assets/img/${this.imgFolder}/background_wifi.jpg`);
    // --- Cursor
    this.load.image('cursor', `assets/icons/${this.imgFolder}/cursor.png`);

    // --- Icons Apps
    // test icons from https://www.iconfinder.com/iconsets/circle-icons-1
    var apps = this.cache.json.get('apps');

    for (var app in apps) {
      this.load.image(apps[app]['type'], `assets/icons/${this.imgFolder}/${apps[app]['icon']}`);
    }
  }


  // --- Mètodes privats
  updateLoad(progress){
    this.text_loading.text = `IOC Free Operating System... ${Math.round(progress * 100)}%`;
  }
}
