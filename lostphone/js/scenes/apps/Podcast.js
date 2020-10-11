//--
//-- Podcast.js
//--
//-- @Note:
//-- @Todo:
//-- @From: this code belongs to https://codepen.io/samme/pen/NWPbQJY?editors=0010




class PodcastApp extends App
{
  constructor()
  {
    super();
    this.audio;
    this.progressBar;
    this.seekBar;
    this.loadingText;
    this.text;
    this.tracks;
    this.progressMap;
    this.playlist;
  }

  preload()
  {
    let t = this;
    let { width, height } = t.getPhoneDimensions();
    let x = width / 2;
    let y = height / 2;
    let scale = t.getImageScale('home-wallpaper');
    let wallpaper = t.add.image(x, y, 'home-wallpaper')
        .setOrigin(0.5, 0.5)
        .setScale(scale.w, scale.h);
    t.graphics = t.add.graphics();
    t.loadingText = t.add.text(x, y, 'Loading...')
      .setOrigin(0.5, 0.5)
      .setDepth(0);
    
    t.tracks = t.cache.json.get('tracks');

    t.progressMap = Object.fromEntries(t.tracks.map(t => [t.key, 0]));
    t.playlist = new Phaser.Structs.List();
    t.load.audio(t.tracks);    
  }
  
  init()
  {
    let t = this;
    t.registry.set('activeApp', 'podcastApp');    
  }

  create()
  {
    let t = this;
    let { width, height } = t.getPhoneDimensions();
    let x = width / 2;
    let y = height / 2;
    
    t.loadingText.destroy();

    // Mmmmmm...
    t.text = t.add.text(x, y, 'Tracks loaded!')
      .setOrigin(0.5, 0.5)
      .setDepth(0);
        
    // I dunno what am I doing!
    t.audio = t.sound;
    
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
    // display the buttons on screen
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
