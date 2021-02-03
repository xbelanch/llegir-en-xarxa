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
  }

  listMails()
  {
    let t = this;
    new MailListObject(t, t.config);
  }
}
