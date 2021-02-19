//--
//-- Mail.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import PhoneApp from '/scenes/main/PhoneApp';
import MailListObject from '/prefabs/mail/MailList.js';
import MailObject from '/prefabs/mail/Mail';

export default class MailApp extends PhoneApp
{
  constructor()
  {
    super({ key: 'MailApp'});
  }

  init()
  {
    let t = this;

    super.init();
    t.getConfig('mail');

    t.elements = {
      'title': {
        'fontSize': t.calcDPR(26),
        'y': t.calcDPR(80)
      },
      'headings': {
        'fontSize': t.calcDPR(20),
        'padding': t.calcDPR(28)
      }
    }
  }

  create()
  {
    let t = this;

    // --- Display a list mails
    t.mails = new MailListObject(t, t.config);
    t.addRow(t.mails,{y:0, position: Phaser.Display.Align.LEFT_CENTER});

    t.input.on('pointerup', function(pointer, gameObjects) {
      if (gameObjects.length > 0) {
        for (let i=0; i<gameObjects.length;i++) {
          if (gameObjects[i].type == 'Container') {

            // Check if pointer moved
            if (pointer.getDistanceY() > 0) {
              return;
            }
            t.game.saveState('complete', gameObjects[i].name, true);
            new MailObject(t, t.config, t.config.mails.find(element => element.id == gameObjects[i].name));
            t.input.off('pointerup');
            t.input.off('drag');
            t.cameras.main.scrollY = 0;
          }
        }
      }
    });
  }
}
