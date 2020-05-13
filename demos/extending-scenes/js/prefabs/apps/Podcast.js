//
// --- Podcast App
// --- Source: https://codepen.io/samme/pen/NWPbQJY?editors=0010
// --- 
Object.defineProperty(Phaser.Structs.List.prototype, 'current', {
  get() {
    return this.getAt(this.position);
  }
});

class Podcast extends App
{
  constructor()
  {
    // init() i preload() haurien de ser mètodes comunes a totes les apps
    super();
    this.audio;
    this.progressBar;
    this.seekBar;
    this.text;
    this.tracks;
    this.progressMap;
    this.playlist;
  }
  // @NOTE:
  // Recorda que el mètode init forma part de la class App
  // @TODO: Cal que aquesta informació s'inclogui posteriorment al json de configuració
  preload()
  {
    let t = this;
    let { width, height } = t.sys.game.canvas;
    let x = width / 2;
    let y = height / 2;
    
    t.tracks = [
      {
        key: 'Sample 1',
        url: 'assets/audio/podcast1.mp3',
        volume: 1
      },
      {
        key: 'Sample 2',
        url: 'assets/audio/podcast2.mp3',
        volume: 0.5
      }
    ];
    console.table(t.tracks);

    // Mmmmmm...
    t.text = t.add.text(x, y, 'Loading tracks...')
      .setOrigin(0.5, 0.5)
      .setDepth(0);
    
    t.progressMap = Object.fromEntries(t.tracks.map(t => [t.key, 0]));
    t.playlist = new Phaser.Structs.List();
    t.load.audio(t.tracks);
  }

  create()
  {
    let t = this;
    t.audio = t.sound;
    console.log(t.sound);
    let { width, height } = t.sys.game.canvas;
    let x = width / 2;
    let y = height / 2;
    let wallpaper = t.add.image(x, y, 'podcast-wallpaper')
        .setOrigin(0.5, 0.5)
        .setDepth(-1);
    
    // Esborrem tota la informació i alliberem memòria I guess
    // @TODO: Cal informar de la documentació sobre 'shutdown'
    // Es refereix a l'escena?
    t.events.once('shutdown', function(){
      t.playlist.removeAll();
      t.audio.remove();
    });

    // Afegim a la playlist els podcasts
    t.playlist.add(t.tracks.map(track => t.audio.add(track.key, track)));

    // Afegim la propietat a cada audio el fet que, si finalitza, continui
    t.playlist.each(function(sound){
      sound.on('complete', function()
               {
                 var next = t.playlist.next || t.playlist.first;
                 t.audio.stopAll();
                 if (next) next.play();
               });
    });
    
    // Display tracks and buttons
    let buttons = [
      t.createButton.call(t, '⏯', function(){
        var current = t.playlist.current || t.playlist.first;
        if (current.isPaused) {
          current.resume();
        } else if (current.isPlaying) {
          current.pause();
        } else {
          current.play();
        } 
      }),      
      t.createButton.call(t, '⏹', function(){
        t.audio.stopAll();
      }),
      t.createButton.call(t, '⏮', function(){
        var prev = t.playlist.previous || t.playlist.last;
        t.audio.stopAll();
        if (prev) prev.play();        
      }),
      t.createButton.call(t, '⏭', function(){
        var next = t.playlist.next || t.playlist.first;
        t.audio.stopAll();
        if (next) next.play();
      })
    ];
    
    // Actualment no és possible centrar de manera fàcil
    // el grup de butons
    Phaser.Actions.GridAlign(buttons, {
      x: x - 150, // @TODO: Recorda que aquest 552 és l'amplada de la pantalla i que cal modificar-la perquè aquesta s'adapti a les dimensions variables de les pantalles.
      y: height - 120,
      width: 20,
      height: 20,
      cellWidth: 500 / buttons.length,
      cellHeight: 40,
      position: Phaser.CENTER
    });
  }

  update()
  {
    let t = this;
    t.refresh();
  }

  // --- Private methods
  refresh()
  {
    let t = this;
    // pintem en pantalla els tracks disponibles
    t.text.setText(t.playlist.list.map(function(s, i){
      return [
        i === t.playlist.position ? `[${i + 1}]` : ` ${i + 1} `,
        (s.isPlaying && '>') || (s.isPaused && ':') || ' ',
        s.key,
        `${s.seek.toFixed(1)}/${s.duration.toFixed(1)}`
      ].join('  ');
    }));
  }
  
  createButton(text, callback)
  {
    return this.add
      .text(0, 0, text, { fontSize: 48 })
      .setInteractive()
      .on('pointerdown', callback);
  }  
}
