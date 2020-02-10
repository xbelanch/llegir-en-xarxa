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
    let style = {
      fontFamily: 'roboto',
      fontSize: 20,
      color: '#ffffff',
      linespacing: -10 };
    this.text_loading = this.add.text(
      logo.x - logo.width / 2,
      logo.y + logo.height / 2,
      'Miniop iniciatlitzant-se...',
      style);

    // Carrega en memòria tots els arxius del miniop
    // --- Icons
    // test icons from https://www.iconfinder.com/iconsets/down_to_earth_PNG
    this.load.image('clock', 'assets/icons/iconfinder_G_Clock_87148_192.png');
    
  }

  
  // --- Mètodes privats
  updateLoad(progress){
    this.text_loading.text = `Miniop iniciatlitzant-se... ${Math.round(progress * 100)}%`;
  }
}
