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
      this.scene.start('homeScreen');
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
    // --- Backgrounds
    this.load.image('background-homescreen', `assets/img/${this.imgFolder}/background_homescreen.png`);
    this.load.image('foreground-phone', `assets/img/${this.imgFolder}/foreground_phone.png`);
    // --- Cursor
    this.load.image('cursor', `assets/icons/${this.imgFolder}/cursor.png`);
    // --- General Icons
    this.load.image('home', `assets/icons/${this.imgFolder}/iconfinder_House_2638333.png`);
    // --- Icons Apps
    // test icons from https://www.iconfinder.com/iconsets/circle-icons-1
    this.load.image('clock', `assets/icons/${this.imgFolder}/iconfinder_clock_1055090.png`);
    this.load.image('system', `assets/icons/${this.imgFolder}/iconfinder_gear_1055051.png`);
    this.load.image('gallery', `assets/icons/${this.imgFolder}/iconfinder_image_1055042.png`);
    this.load.image('calendar', `assets/icons/${this.imgFolder}/iconfinder_calendar_1055101.png`);
    this.load.image('audio', `assets/icons/${this.imgFolder}/iconfinder_music_1055020.png`);
    this.load.image('weather', `assets/icons/${this.imgFolder}/iconfinder_cloud_1055089.png`);
    this.load.image('mail', `assets/icons/${this.imgFolder}/iconfinder_mail_1055030.png`);
    this.load.image('todo', `assets/icons/${this.imgFolder}/iconfinder_check_1055094.png`);
    
  }

  
  // --- Mètodes privats
  updateLoad(progress){
    this.text_loading.text = `IOC Free Operating System... ${Math.round(progress * 100)}%`;
  }
}
