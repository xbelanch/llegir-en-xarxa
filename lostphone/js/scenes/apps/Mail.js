//--
//-- Mail.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import PhoneApp from '/scenes/PhoneApp';
import MailListObject from '/prefabs/mail/mailList.js';

export default class MailApp extends PhoneApp
{
  constructor()
  {
    super({ key: 'MailApp'});
    this.mailList;
  }

  init()
  {
    super.init();
    super.getConfig('mail');
  }

  create()
  {
    // --- This need to refactor?
    let t = this;

    // --- Title
    t.add.text(
      t.width / 2,
      Math.floor(80*t.assetsDPR),
      "Correu",
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * t.assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    ).setOrigin(0.5);

    // --- Display a list mails
    t.listMails();
    super.create();
  }

  listMails()
  {
    let t = this;
    t.mailList = new MailListObject(t, t.config);
  }

  setInputs()
  {
    let t = this;

    t.input.on('pointermove', function(pointer, gameobject) {
      switch(gameobject[0]) {
        case t.mailList.dragZone:
          if (pointer.isDown) {
            t.mailList.y += (pointer.velocity.y / 3);
            t.mailList.y = Phaser.Math.Clamp(
              t.mailList.y,
              -t.mailList.box_height * (t.mailList.visible_mails - 1),
              0
            );
          }
        }
    });
  }
}
