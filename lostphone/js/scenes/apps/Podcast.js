//--
//-- Podcast.js
//--
//-- @From: this code belongs to https://codepen.io/samme/pen/NWPbQJY?editors=0010

export default class PodcastApp extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'PodcastApp'});
    this.config;
    this.colors;
    this.audio;
    this.progressBar;
    this.progressBox;
    this.progressCursor;
    this.seekBar;
    this.loadingText;
    this.text;
    this.tracks;
    this.progressMap;
    this.playlist;
    this.x;
    this.y;
  }

  init()
  {
    var { width, height } = this.cameras.main;
    this.x = width / 2;
  }

  preload()
  {
    this.config = this.cache.json.get('config');
    this.colors = this.config.colors;

    var { width, height } = this.cameras.main;
    var x = width / 2;
    var y = height / 2;

    this.loadingText = this.add.text(x, y, 'Loading...')
      .setOrigin(0.5, 0.5)
      .setDepth(0);

    // @ALERT: si les pistes d'àudio s'han carregat al preload,
    // cal un altre cop?
    this.tracks = this.cache.json.get('tracks');
    this.progressMap = Object.fromEntries(this.tracks.map(t => [t.key, 0]));
    this.playlist = new Phaser.Structs.List();
    this.load.audio(this.tracks);
  }

  create()
  {

    this.loadingText.destroy();

    var { width, height } = this.cameras.main;
    var x = width / 2;
    var y = height / 2;


    this.text = this.add.text(x, y, 'Tracks loaded!')
      .setOrigin(0.5, 0.5)
      .setDepth(0);

    this.audio = this.sound;

    // Afegim a la playlist els podcasts
    this.playlist.add(this.tracks.map(track => this.audio.add(track.key, track)));

    // Afegim la propietat a cada audio el fet que, si finalitza, continui
    this.playlist.each(function(sound){
      sound.on('complete', function()
               {
                 var next = this.playlist.next || this.playlist.first;
                 this.audio.stopAll();
                 if (next) next.play();
               });
    });

    // Display tracks and buttons
    let buttons = [
      this.createButton.call(this, '⏯', function(){
        var current = this.playlist.current || this.playlist.first;
        if (current.isPaused) {
          current.resume();
        } else if (current.isPlaying) {
          current.pause();
        } else {
          current.play();
        }

      }),
      this.createButton.call(this, '⏹', function(){
        this.audio.stopAll();
        if (this.progressBox !== undefined) {
          this.progressBox.destroy();
          this.progressBar.destroy();
          this.progressCursor.destroy();
        }
      }),
      this.createButton.call(this, '⏮', function(){
        var prev = this.playlist.previous || this.playlist.last;
        this.audio.stopAll();
        if (prev) prev.play();
      }),
      this.createButton.call(this, '⏭', function(){
        var next = this.playlist.next || this.playlist.first;
        this.audio.stopAll();
        if (next) next.play();
      })
    ];

    // Actualment no és possible centrar de manera fàcil
    // el grup de butons
    // display the buttons on screen
    Phaser.Actions.GridAlign(buttons, {
      x: this.x - 150, // @TODO: Recorda que aquest 552 és l'amplada de la pantalla i que cal modificar-la perquè aquesta s'adapti a les dimensions variables de les pantalles.
      y: this.height - 120,
      width: 20,
      height: 20,
      cellWidth: 500 / buttons.length,
      cellHeight: 40,
      position: Phaser.CENTER
    });
  }


  update(delta , time)
  {
    this.refresh();
  }

  refresh()
  {
    var { width, height } = this.cameras.main;
    var x = width / 2;
    var y = height / 2;

    // pintem en pantalla els tracks disponibles
    let t = this;
    this.text.setText(this.playlist.list.map(function(s, i){
      return [
        i === t.playlist.position ? `[${i + 1}]` : ` ${i + 1} `,
        (s.isPlaying && '>') || (s.isPaused && ':') || ' ',
        s.key,
        `${s.seek.toFixed(1)}/${s.duration.toFixed(1)}`
      ].join('  ');
    }));

    if (this.progressBar !== undefined) {
       this.progressBar.clear();
       this.progressBar.fillStyle(0xffff00, 1);
       this.progressCursor.clear();
       this.progressCursor.fillStyle(0xffffff, 1);
    }

    this.playlist.list.map(function(s, i){
      if (s.isPlaying || s.isPaused) {


        if (this.progressBar === undefined || !this.progressBar.active) {
          this.createBar();
        }

        this.progressBar.fillRect(
          x - (width*0.4),
          height - 220,
          Math.round((width*0.8) * (s.seek.toFixed(1) / s.duration.toFixed(1))),
          20
        );

        this.progressCursor.fillRect(
          x - (width*0.4) + Math.round((width*0.8) * (s.seek.toFixed(1) / s.duration.toFixed(1))),
          height - 225,
          3,
          30
        );
      }
    });

  }

  createButton(text, callback)
  {
    return this.add
      .text(0, 0, text, { fontSize: 48 })
      .setInteractive()
      .on('pointerdown', callback);
  }

  createBar()
  {
    var { width, height } = t.cameras.main;
    var x = width / 2;
    var y = height / 2;
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressCursor = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(x - (width*0.4), height - 220, width *0.8, 20);
    this.progressCursor.fillStyle(0xffffff, 1);
    this.progressCursor.fillRect(x - (width*0.4), height - 225, 3, 30);

    let zone = this.add.zone(x - (width*0.4), height - 220, width *0.8, 20)
      .setOrigin(0)
      .setInteractive();

    zone.on('pointerdown', function(event) {
      let current = this.playlist.current || this.playlist.first;
      let seconds = Math.round(((event.downX - width*0.1) / (width*0.8))*current.duration.toFixed(1));
      current.stop();
      current.play('',{seek: seconds})
    });
  }
}
