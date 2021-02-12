//--
//-- Mail.js
//--
//-- @Note:
//-- @Todo:
//-- @From:
import PhoneApp from '/scenes/PhoneApp';
import MailListObject from '/prefabs/mail/MailList.js';

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
    super.getConfig('mail');

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
    // --- This need to refactor?
    let t = this;

    // --- Title
    t.add.text(
      t.width / 2,
      t.elements['title']['y'],
      "Correu",
      {
        fontFamily: 'Roboto',
        fontSize : t.elements['title']['fontSize'],
        color: '#ffffff',
        align: 'center'
      }
    ).setOrigin(0.5);

    // --- Display a list mails
    new MailListObject(t, t.config);
  }
}
