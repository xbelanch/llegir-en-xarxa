// Bootstrap
// 

const DPR = window.devicePixelRatio;

class Bootstrap extends Phaser.Scene
{
  preload()
  {
    // Carrega les fonts amb l'ajut de la llibreria adaptada
    // Typekit... una mica outdated, però sembla ser que funcional
    const fonts = new WebFontFile(this.load,[
      'Roboto',
      'Righteous'
    ]);
    this.load.addFile(fonts);
    
    // Emet un esdeveniment anomenat 'preload-finished' que,
    // en el moment que s'executi (només una vegada al preload),
    // executarà el mètode privat 'handlePreloadFinished'
    this.game.events.once(GameEvents.PreloadFinished, this.handlePreloadFinished, this);
  }

  create()
  {
    this.resize();

    this.scene.run(SceneKeys.Preload);

    const x = this.scale.width * 0.5;
    const y = this.scale.height * 0.5;

    this.add.text(x, y, 'IOC Operating System...', {
      fontFamily: 'Righteous',
      fontSize: 24 * DPR
    }).setOrigin(0.5, 0.5);
  }

  // --- Private methods
  
  handlePreloadFinished()
  {
    // Aturem l'escena preload...
    this.scene.stop(SceneKeys.Preload);
    console.log('Preload finished');
    // i iniciem el phone
    this.scene.start(SceneKeys.Phone);
  }
  
  resize()
  {
    const container = document.getElementById(ElementKeys.ContainerId);
    let w = container.clientWidth * window.devicePixelRatio;
    let h = container.clientHeight * window.devicePixelRatio;
    this.scale.resize(w, h);
  }
  
}
