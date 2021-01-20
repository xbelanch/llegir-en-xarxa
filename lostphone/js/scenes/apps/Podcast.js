//--
//-- Podcast.js
//--
//-- @From: this code belongs to https://codepen.io/samme/pen/NWPbQJY?editors=0010
import LostPhoneScene from '../LostPhoneScene';

export default class PodcastApp extends LostPhoneScene
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
    this.width;
    this.height;
  }

  init()
  {
    this.width  = this.cameras.main.width;
    this.height  = this.cameras.main.width;
    this.x = this.width / 2;
    this.y = this.height / 2;
  }

  preload()
  {
    this.config = this.cache.json.get('config');
    this.colors = this.config.colors;

    this.loadingText = this.add.text(this.x, this.y, 'Loading...')
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

    this.text = this.add.text(this.x, this.y, 'Tracks loaded!')
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
    let t = this;
    var buttons = [
      this.createButton.call(this, '⏯', function(){
        var current = t.playlist.current || this.playlist.first;
        if (current.isPaused) {
          current.resume();
        } else if (current.isPlaying) {
          current.pause();
        } else {
          current.play();
        }

      }),
      this.createButton.call(this, '⏹', function(){
        t.audio.stopAll();
        if (t.progressBox !== undefined) {
          t.progressBox.destroy();
          t.progressBar.destroy();
          t.progressCursor.destroy();
        }
      }),
      this.createButton.call(this, '⏮', function(){
        var prev = t.playlist.previous || t.playlist.last;
        t.audio.stopAll();
        if (prev) prev.play();
      }),
      this.createButton.call(this, '⏭', function(){
        var next = t.playlist.next || t.playlist.first;
        t.audio.stopAll();
        if (next) next.play();
      })
    ];

    // Actualment no és possible centrar de manera fàcil
    // el grup de butons
    // display the buttons on screen
    Phaser.Actions.GridAlign(buttons, {
      x: this.x - 150,
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
    let t = this; // wtf? really?

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


        if (t.progressBar === undefined || !t.progressBar.active) {
          t.createBar();
        }

        t.progressBar.fillRect(
          t.x - (t.width*0.4),
          t.height - 220,
          Math.round((t.width*0.8) * (s.seek.toFixed(1) / s.duration.toFixed(1))),
          20
        );

        t.progressCursor.fillRect(
          t.x - (t.width*0.4) + Math.round((t.width*0.8) * (s.seek.toFixed(1) / s.duration.toFixed(1))),
          t.height - 225,
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
    let t = this;

    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressCursor = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(this.x - (this.width*0.4), this.height - 220, this.width *0.8, 20);
    this.progressCursor.fillStyle(0xffffff, 1);
    this.progressCursor.fillRect(this.x - (this.width*0.4), this.height - 225, 3, 30);

    var zone = this.add.zone(this.x - (this.width*0.4), this.height - 220, this.width *0.8, 20)
      .setOrigin(0)
      .setInteractive();

    zone.on('pointermove', function(pointer) {
      if (pointer.isDown) {
        var current = t.playlist.current || t.playlist.first;
        var seconds = Math.round(((pointer.worldX - t.width*0.1) / (t.width*0.8))*current.duration.toFixed(1));
        current.stop();
        current.play('',{seek: seconds});
      }
    });
  }
}
