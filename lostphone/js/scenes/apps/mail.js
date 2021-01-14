//--
//-- Mail.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import MailListObject from '../../prefabs/mail/mailList.js';

export default class MailApp extends Phaser.Scene
{
  constructor()
  {
    super({ key: 'MailApp'});
    this.config = null;
  }

  init()
  {

  }

  preload()
  {
    let t = this;
    t.colors = t.cache.json.get('config').colors;
    t.config = t.cache.json.get('mail');

  }
  
  create()
  {
    // --- This need to refactor?
    let t = this;

    // --- Display a list mails
    t.listMails();
  }

  listMails()
  {
    let t = this;
    new MailListObject(t, t.config);
  }

}
