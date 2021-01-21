//--
//-- Mail.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import LostPhoneScene from '../LostPhoneScene';
import MailListObject from '../../prefabs/mail/mailList.js';
import { assetsDPR } from '../../config';

export default class MailApp extends LostPhoneScene
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
    let { width, height } = t.cameras.main;

    // --- Title
    t.add.text(
      width / 2,
      Math.floor(80*assetsDPR),
      "Correu",
      {
        fontFamily: 'Roboto',
        fontSize : Math.floor(13 * assetsDPR),
        color: '#ffffff',
        align: 'center'
      }
    ).setOrigin(0.5);

    // --- Display a list mails
    t.listMails();
    t.addGoBackFunction();
  }

  listMails()
  {
    let t = this;
    new MailListObject(t, t.config);
  }

}
