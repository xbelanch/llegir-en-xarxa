// --- Set Config Phaser Game
import Phaser from 'phaser'
import PhaserSceneWatcherPlugin from 'phaser-plugin-scene-watcher'
import { Plugin as NineSlice } from 'phaser3-nineslice'
import Bootstrap from './scenes/Bootstrap.js'
import Preload from './scenes/Preload.js';
import TitleScene from './scenes/TitleScene.js'
import Phone from './scenes/Phone.js'
import Homescreen from './scenes/Homescreen.js'
import PhoneUI from './scenes/PhoneUI.js'

import ClockApp from './scenes/apps/Clock.js';
import SandboxApp from './scenes/apps/Sandbox.js';
import MailApp from './scenes/apps/Mail.js';

// import { Plugin as NineSlicePlugin } from './plugins/nineslice.min.js'
// import Bootstrap from './scenes/Bootstrap.js'
// import TitleScene from './scenes/TitleScene.js'
// --- Phone.js
//
//
// from: https://github.com/yandeu/phaser3-optimal-resolution
// cal definir un conjunt de resolucions @1 - @4
// i empaquetar i escalar a través d'un atlas amb un servei com el TexturePacker:
// https://www.codeandweb.com/texturepacker

/**
La resolució base del mòbil és 414x736 @3 (pixel ratio)
basat en la informació disponible a: https://viewportsizer.com/devices/
el que significa que s'han creat els assets gràfics en una resolució de 1242x2208
@1 -> 360 x 640
...
@3 -> 1080 x 1920
*/


// --- Set assetsDPR value
const roundHalf = num => Math.round(num * 2) / 2;
export const DPR = window.devicePixelRatio;
const { width, height } = viewport(DPR);
// Determinem els valors de les mides d'amplada i alçada del mòbil
const WIDTH = Math.round(360 * height / 640);
const HEIGHT = Math.round(height);
export const assetsDPR = roundHalf(Math.min(Math.max(HEIGHT / 640, 1), 4));

export default {
  type : Phaser.AUTO,
  backgroundColor : '#000',   // Purlple as a debug color
  dom : { createContainer : true },
  render: { // https://www.html5gamedevs.com/topic/36343-disable-antialias-in-phaser-3/
    antialias: false,
    clearBeforeRender: true
  },
  scale: {
    parent : 'phone',
    mode : Phaser.Scale.FIT,
    autoCenter : Phaser.Scale.CENTER_BOTH,
    width: WIDTH,
    height: HEIGHT
  },
  scene: [TitleScene, Bootstrap, Preload, Phone, ClockApp, SandboxApp, MailApp, Homescreen, PhoneUI],
  plugins: {
    global: [
      { key: 'SceneWatcher', plugin : PhaserSceneWatcherPlugin, start: true, mapping: 'sceneWatcher' },
      NineSlice.DefaultCfg

    ]
  },
  callbacks: {
    postBoot: function (game) {
      game.plugins.get('SceneWatcher').watchAll();
    }
  }
};

// Detecta la mida de pantalla i determina els valors d'ampla i alçada.
// Referències:
// https://viewportsizer.com/devices/
// https://andylangton.co.uk/blog/development/get-viewportwindow-size-width-and-height-javascript
// https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions

function viewport(DPR) {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  };
  return { width : Math.round(parseInt(e[ a+'Width' ]) * DPR) , height : Math.round(parseInt(e[ a+'Height' ]) * DPR) };
}
