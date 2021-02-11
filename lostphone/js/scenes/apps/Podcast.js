//--
//-- Podcast.js
//--
//-- @From: this code belongs to https://codepen.io/samme/pen/NWPbQJY?editors=0010
import PhoneApp from '/scenes/PhoneApp';

export default class PodcastApp extends PhoneApp
{
  constructor()
  {
    super({ key: 'PodcastApp'});
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
  }

  init() {
    let t = this;

    super.init();
    t.elements = {
      'buttons': {

      }
    };
  }

  preload()
  {
    let t = this;
    t.loadingText = t.add.text(t.x, t.y, 'Loading...')
      .setOrigin(0.5, 0.5)
      .setDepth(0);

    // Tracks were load at Preload.js
    t.tracks = t.cache.json.get('tracks');
    t.progressMap = Object.fromEntries(t.tracks.map(t => [t.key, 0]));
    t.playlist = new Phaser.Structs.List();
  }

  create()
  {
    let t = this;
    t.loadingText.destroy();

    t.text = t.add.text(t.x, t.y, 'Tracks loaded!')
      .setOrigin(0.5, 0.5)
      .setDepth(0);

    t.audio = t.sound;

    t.createButtons();

    // Afegim a la playlist els podcasts
    t.playlist.add(t.tracks.map(track => t.audio.add(track.key, track)));

    // Afegim la propietat a cada audio el fet que, si finalitza, continui
    t.playlist.each(function(sound){
      sound.on('complete', function()
        {
          let next = t.playlist.next || t.playlist.first;
          t.audio.stopAll();
          if (next) next.play();
        });
    });


  }

  createButtons() {
    let t = this;

    // Display tracks and buttons
    let buttons = [
      t.createButton.call(t, '⏯', function(){
        let current = t.playlist.current || t.playlist.first;
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
        if (t.progressBox !== undefined) {
          t.progressBox.destroy();
          t.progressBar.destroy();
          t.progressCursor.destroy();
        }
      }),
      t.createButton.call(t, '⏮', function(){
        let prev = t.playlist.previous || t.playlist.last;
        t.audio.stopAll();
        if (prev) prev.play();
      }),
      t.createButton.call(t, '⏭', function(){
        let next = t.playlist.next || t.playlist.first;
        t.audio.stopAll();
        if (next) next.play();
      })
    ];

    // Actualment no és possible centrar de manera fàcil
    // el grup de butons
    // display the buttons on screen
    Phaser.Actions.GridAlign(buttons, {
      x: t.x - 150,
      y: t.height - Math.round(120*t.assetsDPR),
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
    let t = this;

    t.text.setText(t.playlist.list.map(function(s, i){
      return [
        i === t.playlist.position ? `[${i + 1}]` : ` ${i + 1} `,
        (s.isPlaying && '>') || (s.isPaused && ':') || ' ',
        s.key,
        `${s.seek.toFixed(1)}/${s.duration.toFixed(1)}`
      ].join('  ');
    }));

    if (t.progressBar !== undefined) {
       t.progressBar.clear();
       t.progressBar.fillStyle(0xffff00, 1);
       t.progressCursor.clear();
       t.progressCursor.fillStyle(0xffffff, 1);
    }

    t.playlist.list.map(function(s, i){
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
    let t = this;
    return t.add
      .text(0, 0, text, { fontSize: 48 })
      .setInteractive()
      .on('pointerdown', callback);
  }

  createBar()
  {
    let t = this;

    t.progressBar = t.add.graphics();
    t.progressBox = t.add.graphics();
    t.progressCursor = t.add.graphics();
    t.progressBox.fillStyle(0x222222, 0.8);
    t.progressBox.fillRect(t.x - (t.width*0.4), t.height - 220, t.width *0.8, 20);
    t.progressCursor.fillStyle(0xffffff, 1);
    t.progressCursor.fillRect(t.x - (t.width*0.4), t.height - 225, 3, 30);

    let zone = t.add.zone(t.x - (t.width*0.4), t.height - 220, t.width *0.8, 20)
      .setOrigin(0)
      .setInteractive();

    let moveToSelection = function(pointer) {
      if (pointer.isDown) {
        let current = t.playlist.current || t.playlist.first;
        let seconds = Math.round(((pointer.worldX - t.width*0.1) / (t.width*0.8))*current.duration.toFixed(1));
        current.stop();
        current.play('',{seek: seconds});
      }
    };

    zone
      .on('pointermove', moveToSelection)
      .on('pointerdown', moveToSelection);
  }
}
