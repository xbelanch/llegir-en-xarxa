//--
//-- Podcast.js
//--
//-- @From: this code belongs to https://codepen.io/samme/pen/NWPbQJY?editors=0010
import PhoneApp from '/scenes/main/PhoneApp';

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
      'title': {
        'fontSize': t.calcDPR(24)
      },
      'playlist': {
        'fontSize': t.calcDPR(24)
      },
      'buttons': {
        'fontSize': 48,
        'padding': t.calcDPR(16)
      },
      'progressBar': {
        'x': t.width * 0.1,
        'padding': t.calcDPR(30),
        'height': t.calcDPR(30),
        'width': t.width * 0.8,
        'bgcolor': 0xffff00,
        'progressColor': 0x222222,
        'cursorColor': 0xffffff,
        'cursorHeight': t.calcDPR(40),
        'cursorWidth': t.calcDPR(3)
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

    let text = t.add.text(0, 0,
      'Podcasts',
      t.getTextProperties({fontSize : t.elements['title']['fontSize']})
    );

    t.addRow(text);

    t.text = t.add.text(t.x, t.y, 'Tracks loaded!', {
        fontFamily: 'Roboto',
        fontSize : t.elements['playlist']['fontSize'],
        color: '#ffffff',
        align: 'center'
    })
      .setOrigin(0.5, 0.5)
      .setDepth(0);

    t.text.setText(t.playlist.list.map(function(s, i){
      return [
        i === t.playlist.position ? `[${i + 1}]` : ` ${i + 1} `,
        (s.isPlaying && '>') || (s.isPaused && ':') || ' ',
        s.key,
        `${s.seek.toFixed(1)}/${s.duration.toFixed(1)}`
      ].join('  ');
    }));

    t.addRow(t.text, {y: 2});

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
    let buttons = t.add.group([
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
    ]);

    t.addRow(buttons.getChildren(),{'y': -1});
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
       t.progressBar.fillStyle(t.elements['progressBar']['bgcolor'], 1);
       t.progressCursor.clear();
       t.progressCursor.fillStyle(t.elements['progressBar']['cursorColor'], 1);
    }

    t.playlist.list.map(function(s, i){
      if (s.isPlaying || s.isPaused) {

        if (t.progressBar === undefined || !t.progressBar.active) {
          t.createBar();
        }

        t.progressBar.fillRect(
          t.elements['progressBar']['x'],
          t.text.getBottomCenter().y + t.elements['progressBar']['padding'],
          Math.round((t.elements['progressBar']['width']) * (s.seek.toFixed(1) / s.duration.toFixed(1))),
          t.elements['progressBar']['height']
        );

        t.progressCursor.fillRect(
          t.elements['progressBar']['x'] + Math.round((t.elements['progressBar']['width']) * (s.seek.toFixed(1) / s.duration.toFixed(1))),
          t.text.getBottomCenter().y + t.elements['progressBar']['padding'] - (t.elements['progressBar']['cursorHeight'] - t.elements['progressBar']['height'])/2,
          t.elements['progressBar']['cursorWidth'],
          t.elements['progressBar']['cursorHeight']
        );
      }
    });

  }

  createButton(text, callback)
  {
    let t = this;
    return t.add
      .text(0, 0, text, { fontSize: t.elements['buttons']['fontSize'] })
      .setInteractive()
      .on('pointerdown', callback)
      .setScale(t.assetsDPR)
      .setOrigin(0.5,0);
  }

  createBar()
  {
    let t = this;

    t.progressBar = t.add.graphics();
    t.progressBox = t.add.graphics();
    t.progressCursor = t.add.graphics();
    t.progressBox.fillStyle(t.elements['progressBar']['progressColor'], 0.8);
    t.progressBox.fillRect(
      t.elements['progressBar']['x'],
      t.text.getBottomCenter().y + t.elements['progressBar']['padding'],
      t.elements['progressBar']['width'],
      t.elements['progressBar']['height']
    );
    t.progressCursor.fillStyle(t.elements['progressBar']['cursorColor'], 1);
    t.progressCursor.fillRect(
      t.elements['progressBar']['x'],
      t.text.getBottomCenter().y + t.elements['progressBar']['padding'] - (t.elements['progressBar']['cursorHeight'] - t.elements['progressBar']['height'])/2,
      t.elements['progressBar']['cursorWidth'],
      t.elements['progressBar']['cursorHeight']
    );

    let zone = t.add.zone(
      t.elements['progressBar']['x'],
      t.text.getBottomCenter().y + t.elements['progressBar']['padding'],
      t.elements['progressBar']['width'],
      t.elements['progressBar']['height']
    )
      .setOrigin(0)
      .setInteractive();

    let moveToSelection = function(pointer) {
      if (pointer.isDown) {
        let current = t.playlist.current || t.playlist.first;
        let seconds = Math.round(
          (
            (pointer.worldX - t.elements['progressBar']['x']) / (t.elements['progressBar']['width'])
          )*current.duration.toFixed(1)
        );
        current.stop();
        current.play('',{seek: seconds});
      }
    };

    zone
      .on('pointermove', moveToSelection)
      .on('pointerdown', moveToSelection);
  }
}
